
import React from 'react';
import { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View, PermissionsAndroid, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../../../lib/tailwind';
import { listNavigationIcon, qrscan } from '../../../assets/Icons/icons';
import UserHeader from '../../../lib/components/userPartScreen/UserHeader';
import QRCodeScanner from "./QRScanner";
const InitialScreenUser = () => {
  const navigation = useNavigation();

  const runningTickets = [
    { id: '1', title: 'ViewSonic', code: 'JF2656NCDS8', date: '17/12/2024' },
  ];
  const pastTickets = [
    {
      id: '1', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
    {
      id: '2', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
    {
      id: '3', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
    {
      id: '4', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
    {
      id: '5', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
    {
      id: '6', // Changed ID to make it unique
      title: 'ViewSonic',
      code: 'JF2656NCDS8',
      address: 'Road no. 14, Block-D, Banasree, Dhaka.',
      date: '10/12/2024',
    },
  ];



  const [scannedData, setScannedData] = useState("");
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // To control scanning state

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission to scan QR codes",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } catch (err) {
        console.warn(err);
        setHasPermission(false);
      }
    } else {
      setHasPermission(true);
    }
  };

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const onSuccess = (e) => {
    setScannedData(e.data);
    setIsScanning(false); // Stop scanning after successful scan
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.centerText}>Camera permission is required</Text>
        <Button title="Request Permission" onPress={requestCameraPermission} />
      </View>
    );
  }


  const renderRunningTicket = ({ item }) => (
    <TouchableOpacity
      style={tw`shadow-lg bg-white p-4 rounded-lg flex-row items-center justify-between mb-4 mx-2`}
      onPress={() => navigation.navigate('Details', { ticket: item })}>
      <View style={styles.leftSection}>
        <Text style={[styles.text, styles.title]}>{item.title}</Text>
        <Text style={styles.text}>{item.code}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
      <TouchableOpacity
        style={[styles.checkoutButton, styles.checinButton]}>
        <Text style={styles.checkoutText}>Check-in</Text>
      </TouchableOpacity>

      <SvgXml xml={listNavigationIcon} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  const renderPastTicket = ({ item }) => (
    <TouchableOpacity
      style={tw`shadow-lg bg-white p-4 rounded-lg flex-row items-center justify-between mb-4 mx-2`}
      onPress={() => navigation.navigate('Details', { ticket: item })}>
      <View style={styles.leftSection}>
        <Text style={[styles.text, styles.title]}>{item.title}</Text>
        <Text style={styles.text}>{item.code}</Text>
        <Text style={styles.addres}>{item.address}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Check-out</Text>
      </TouchableOpacity>
      <SvgXml xml={listNavigationIcon} style={styles.arrowIcon} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <UserHeader />
      <View >
        <TouchableOpacity onPress={() => navigation.navigate('qrCamera')} style={tw`border border-dashed rounded-lg flex items-center justify-center p-4 mx-2 my-6 `}>

          <SvgXml xml={qrscan} />
          <Text>

            Scan the QR code of your device
          </Text>
        </TouchableOpacity>
        {/* <Button
      
        title={isScanning ? "Stop Scanning" : "Start Scanning"} 
        onPress={() => setIsScanning(prevState => !prevState)} 
      /> */}
        {isScanning && <QRCodeScanner onSuccess={onSuccess} />}
        {scannedData ? <Text style={styles.scannedText}>Scanned: {scannedData}</Text> : null}
      </View>


      <View>
        <Text style={styles.sectionTitle}>Open calls</Text>
        <FlatList
          data={runningTickets}
          renderItem={renderRunningTicket}
          keyExtractor={item => item.id}
          removeClippedSubviews={false}

        />
      </View>
      <View >
        <View style={tw`flex flex-row items-center justify-between mb-2`}>
          <Text style={styles.sectionTitle}>Closed calls</Text>
          <TouchableOpacity onPress={() => navigation.navigate('viewallclosed')} style={tw`bg-transparent border border-[#FF6769] mr-2 px-4 py-1 rounded-md `}>
            <Text style={tw` text-[#000000]`}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={pastTickets}
          renderItem={renderPastTicket}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{ marginBottom: '60%' }} />} // Extra bottom space
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    paddingLeft: 10,
  },
  centerText: {
    fontSize: 18,
    color: "#777",
    marginBottom: 10,
  },
  scannedText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  // card: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: '#FFFFFF',
  //   padding: 10,
  //   borderRadius: 8,
  //   marginVertical: 5,
  //   position: 'relative',
  //   shadowColor: '#00000040',
  //   shadowOpacity: 0.5,
  //   shadowRadius: 5,
  //   elevation: 3,
  // },
  leftSection: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    paddingTop: 5,
  },
  addres: {
    fontSize: 14,
    color: '#878787',
    fontWeight: '500',
    paddingTop: 5,
  },

  title: {
    fontWeight: 'bold',
    color: '#FF0205',
    fontSize: 16,
  },
  date: {
    position: 'absolute',
    top: 10,
    right: '45%',
    fontSize: 10,
    fontWeight: 'bold',
    color: '#878787',
  },
  checkoutButton: {
    backgroundColor: '#00950A',
    marginTop: '8%',
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 100,
  },
  checinButton: {
    backgroundColor: '#FF8383',
    marginTop: '5%',
    marginRight: "15%",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 100,
  },
  checkoutText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  arrowIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default InitialScreenUser;
