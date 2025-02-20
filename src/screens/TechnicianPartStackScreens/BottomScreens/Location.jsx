

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
  Platform,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const GOOGLE_MAPS_APIKEY = 'AIzaSyARXa6r8AXKRaoeWqyesQNBI8Y3EUEWSnY';
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LocationScreen = () => {
  const [userLocation, setUserLocation] = useState({
    latitude: 37.78825,  // Default location (San Francisco)
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
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
    try {
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          getCurrentLocation();
        }
      } else {
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
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        setUserLocation(currentLocation);
      },
      (error) => {
        console.log(error.code, error.message);
        Alert.alert('Error', 'Unable to get location');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const searchPlaces = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${GOOGLE_MAPS_APIKEY}&components=country:us`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        setSearchResults(data.predictions);
      } else {
        console.error('Places API Error:', data.status);
        Alert.alert('Error', 'Failed to search places');
      }
    } catch (error) {
      console.error('Error searching places:', error);
      Alert.alert('Error', 'Failed to search places');
    } finally {
      setLoading(false);
    }
  };

  const handlePlaceSelect = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      
      if (data.status === 'OK') {
        const location = data.result.geometry.location;
        const newDestination = {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        };
        
        setDestination(newDestination);
        setSearchModal(false);
        setSearchQuery('');
        
        // Fit map to show both markers
        if (mapRef.current && userLocation) {
          mapRef.current.fitToCoordinates(
            [
              { latitude: userLocation.latitude, longitude: userLocation.longitude },
              { latitude: newDestination.latitude, longitude: newDestination.longitude }
            ],
            {
              edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
              animated: true,
            }
          );
        }
      } else {
        console.error('Place Details API Error:', data.status);
        Alert.alert('Error', 'Failed to get place details');
      }
    } catch (error) {
      console.error('Error getting place details:', error);
      Alert.alert('Error', 'Failed to get place details');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
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
          initialRegion={userLocation}
          showsUserLocation
          showsMyLocationButton
          showsCompass
        >
          {destination && (
            <>
              <Marker
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude
                }}
                title="Destination"
                description="Your destination"
                pinColor="red"
              />
              <MapViewDirections
                origin={{
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude
                }}
                destination={{
                  latitude: destination.latitude,
                  longitude: destination.longitude
                }}
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
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity 
              onPress={() => {
                setSearchModal(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
            >
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
              clearButtonMode="while-editing"
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
                    <Text style={styles.resultMainText}>
                      {result.structured_formatting.main_text}
                    </Text>
                    <Text style={styles.resultSecondaryText}>
                      {result.structured_formatting.secondary_text}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  searchBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 20,
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
    top: Platform.OS === 'ios' ? 140 : 100,
    left: 20,
    right: 100,
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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