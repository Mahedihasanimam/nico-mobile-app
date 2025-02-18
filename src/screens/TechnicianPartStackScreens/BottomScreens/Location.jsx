// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';

// const Location = () => {
//   const origin = { latitude: 23.76587432130932, longitude: 90.42686418490443 }; // Start Point
//   // const destination = { latitude: 23.777542, longitude: 90.409277 }; // End Point
//   const GOOGLE_MAPS_APIKEY = 'AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY';

//   const [startPointer, setStartPointer] = useState({
//     latitude: 0,
//     longitude: 0
//   });
//   const [destination, setdestination] = useState({
//     latitude: 0,
//     longitude: 0
//   });

//   const [route, setRoute] = useState([]);

//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) {
//       mapRef.current.animateCamera({
//         center: {
//           latitude: 23.76587432130932,   // Starting point latitude
//           longitude: 90.42686418490443, // Starting point longitude
//         },
//         pitch: 60,       // Tilt for driving view
//         heading: 90,     // Driving direction (East)
//         zoom: 18,        // Close zoom for driver's perspective
//         altitude: 1000,  // Optional: Elevation for a more dynamic view
//       }, { duration: 2000 });  // Smooth animation duration
//     }
//   }, []);


//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         showsUserLocation={true}
//         showsPointsOfInterest
//         showsMyLocationButton
//         showsTraffic
//         showsIndoors
//         zoomEnabled
//         ref={mapRef}
//         // mapType='satellite'
//         style={{ flex: 1 }}
//         initialRegion={{
//           latitude: origin.latitude,
//           longitude: origin.longitude,
//           latitudeDelta: 5,
//           longitudeDelta: 5,
//         }}

//         onMarkerDrag={(Event) => {
//           setStartPointer(Event.nativeEvent.coordinate);
//         }}

//         onPress={e => {
//           if (startPointer.latitude === 0 && startPointer.longitude === 0) {
//             setStartPointer(e.nativeEvent?.coordinate);

//           } else {
//             setdestination(e.nativeEvent?.coordinate);
//           }

//           // console.log(e.nativeEvent);
//         }}
//         // toolbarEnabled

//         showsCompass
//         scrollEnabled
//       // cacheEnabled
//       // scrollEnabled={true}



//       >
//         {/* <Marker coordinate={origin} title="Start" pinColor="green" /> */}
//         {
//           startPointer?.latitude !== 0 && startPointer?.longitude !== 0 && (
//             <Marker
//               coordinate={{ latitude: 23.76587432130932, longitude: 90.42686418490443 }}
//               title="Start Point"
//               description="Your starting location"
//             />

//           )
//         }
//         {
//           destination?.latitude !== 0 && destination?.longitude !== 0 && (
//             <Marker coordinate={destination} title="Destination" pinColor="red" />
//           )
//         }
//         {/* <Marker coordinate={destination} title="End" pinColor="red" /> */}

//         <MapViewDirections
//           origin={startPointer}
//           destination={destination}
//           apikey={GOOGLE_MAPS_APIKEY}
//           strokeWidth={8}
//           strokeColor="blue"
//           onReady={result => {
//             setRoute(result.coordinates);
//           }}
//         />

//         <Polyline
//           coordinates={route}
//           strokeWidth={8}
//           strokeColor="blue"
//         />
//       </MapView>
//     </View>
//   );
// };

// export default Location;


import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Modal,
  ScrollView,
  ActivityIndicator,
  PermissionsAndroid,
  Platform
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';

const GOOGLE_MAPS_APIKEY = 'AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY';

const LocationScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [searchModal, setSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [loading, setLoading] = useState(false);

  const mapRef = useRef(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      getCurrentLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "This app needs access to your location.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setUserLocation(currentLocation);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const searchPlaces = async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      setSearchResults(data.predictions);
    } catch (error) {
      console.error(error);
      alert('Error searching for places');
    }
    setLoading(false);
  };

  const handlePlaceSelect = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      const location = data.result.geometry.location;
      
      const newDestination = {
        latitude: location.lat,
        longitude: location.lng,
      };
      setDestination(newDestination);
      setSearchModal(false);
      
      // Fit map to show both markers
      if (mapRef.current && userLocation) {
        mapRef.current.fitToCoordinates([userLocation, newDestination], {
          edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
          animated: true,
        });
      }
    } catch (error) {
      console.error(error);
      alert('Error getting place details');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.searchBar}
        onPress={() => setSearchModal(true)}
      >
        <Icon name="search" size={24} color="#666" />
        <Text style={styles.searchText}>Where to?</Text>
      </TouchableOpacity>

      {userLocation && (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...userLocation,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation
          showsMyLocationButton
          showsCompass
        >
          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Your Location"
              description="You are here"
            />
          )}
          
          {destination && (
            <>
              <Marker
                coordinate={destination}
                title="Destination"
                description="Your destination"
                pinColor="red"
              />
              <MapViewDirections
                origin={userLocation}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={4}
                strokeColor="#2E7D32"
                onReady={(result) => {
                  setEstimatedTime(`${Math.floor(result.duration)} mins`);
                }}
              />
            </>
          )}
        </MapView>
      )}

      {destination && estimatedTime && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            Estimated Time: {estimatedTime}
          </Text>
          <Text style={styles.subText}>Head to your destination</Text>
        </View>
      )}

      <Modal
        visible={searchModal}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSearchModal(false)}>
              <Icon name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <TextInput
              style={styles.modalInput}
              placeholder="Search destination"
              value={searchQuery}
              onChangeText={(text) => {
                setSearchQuery(text);
                searchPlaces(text);
              }}
              autoFocus
            />
          </View>
          
          {loading ? (
            <ActivityIndicator style={styles.loader} size="large" color="#2E7D32" />
          ) : (
            <ScrollView style={styles.searchResults}>
              {searchResults.map((result) => (
                <TouchableOpacity
                  key={result.place_id}
                  style={styles.resultItem}
                  onPress={() => handlePlaceSelect(result.place_id)}
                >
                  <Icon name="location" size={24} color="#666" />
                  <View style={styles.resultTextContainer}>
                    <Text style={styles.resultMainText}>{result.structured_formatting.main_text}</Text>
                    <Text style={styles.resultSecondaryText}>{result.structured_formatting.secondary_text}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#666',
  },
  banner: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 100,
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  bannerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 50,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalInput: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
  },
  searchResults: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  resultMainText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultSecondaryText: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  loader: {
    marginTop: 20,
  },
});

export default LocationScreen;