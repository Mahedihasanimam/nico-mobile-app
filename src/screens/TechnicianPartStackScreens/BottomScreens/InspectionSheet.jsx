import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SvgXml} from 'react-native-svg';

import tw from '../../../lib/tailwind';
import { listNavigationIcon } from '../../../assets/Icons/icons';
import HeaderWithSearch from '../../../lib/components/HeaderWithSearch';

const InspectionSheet = () => {
  const navigation = useNavigation();

  const runningsheets = [
    {id: '1', title: 'ViewSonic', code: 'JF2656NCDS8', date: '17/12/2024'},
  ];
  const pastsheets = [
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

  const renderRunningTicket = ({item}) => (
    <TouchableOpacity
    style={tw`shadow-lg bg-white p-4 rounded-lg flex-row items-center justify-between mb-4 mx-2`}
      onPress={() => navigation.navigate('inspactionDetails', {ticket: item})}>
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

  const renderPastTicket = ({item}) => (
    <TouchableOpacity
     style={tw`shadow-lg bg-white p-4 rounded-lg flex-row items-center justify-between mb-4 mx-2`}
      onPress={() => navigation.navigate('TicketDetails', {ticket: item})}>
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
 
    <ScrollView style={styles.container}>
      <HeaderWithSearch/>
      <View>
        <Text style={styles.sectionTitle}>New sheets</Text>
        <FlatList
          data={runningsheets}
          renderItem={renderRunningTicket}
          keyExtractor={item => item.id}
        />
      </View>
      <View >
        <Text  style={styles.sectionTitle}>Past sheets</Text>
        <FlatList
          data={pastsheets}
          renderItem={renderPastTicket}
          keyExtractor={item => item.id}
          ListFooterComponent={<View style={{marginBottom: '60%'}} />} // Extra bottom space
        />
      </View>
    </ScrollView>

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

export default InspectionSheet;
