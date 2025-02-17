import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../tailwind';
import { backIcon, NavigationIcon } from '../../assets/Icons/icons';


const TicketDetailsHeader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Force the status bar background color to white and icons to black
    StatusBar.setBarStyle('white-content'); // Black icons
    StatusBar.setBackgroundColor('red'); // White background
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* Top Section: Avatar, Welcome Text, and Notification Icon */}

      <View style={tw`flex flex-row justify-between max-w-[70%] `}>

        <View style={tw`flex flex-row items-center justify-center gap-4`}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgXml xml={backIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Details</Text>
        </View>
      <View style={tw`pt-4`}>
      <Text style={styles.code}>#64365</Text>
      
      <TouchableOpacity style={styles.checinButton}>
        <Text style={styles.checkoutText}>Check-out</Text>
      </TouchableOpacity>
      </View>
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    
  },
  code: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    paddingTop: 5
    
  },
  checinButton: {
    backgroundColor: '#FF8383',

    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 100,
    marginTop: 5 
  },
  checkoutText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TicketDetailsHeader;
