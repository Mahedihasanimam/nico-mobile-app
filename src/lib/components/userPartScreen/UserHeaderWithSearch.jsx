import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import { backIcon, restoreIcon, search } from '../../../assets/Icons/icons';
import tw from '../../tailwind';


const UserHeaderWithSearch = () => {
  const Navigation = useNavigation();

  useEffect(() => {
    // Force the status bar background color to white and icons to black
    StatusBar.setBarStyle('white-content'); // Black icons
    StatusBar.setBackgroundColor('red'); // White background
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* Top Section: Avatar, Welcome Text, and Notification Icon */}
   
      <View style={tw`flex flex-row justify-between pb-6 pt-2 max-w-[74%]`}>
        <View>
          <TouchableOpacity onPress={()=>Navigation.goBack()} >
            <SvgXml xml={backIcon}/>
          </TouchableOpacity>
        </View>
        <View style={tw`flex flex-row items-center gap-2`}>
          <SvgXml xml={restoreIcon}/>
          <Text style={tw`text-[16px] text-[#FFFFFF] `}>
          PRIVIOUS HISTORY
          </Text>
        </View>
      </View>
      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search history..."
          placeholderTextColor="gray"
        />
        <SvgXml xml={search} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 20 ,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,   
     
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  welcomeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '400',
  },
  userName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom:5
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default UserHeaderWithSearch;
