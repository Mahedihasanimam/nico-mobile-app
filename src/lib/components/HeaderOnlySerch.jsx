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
import avatar from '../../assets/Icons/avater.png';
import {backIcon, IconNotification, search} from '../../assets/Icons/icons';
import tw from '../tailwind';

const HeaderOnlySerch = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Force the status bar background color to white and icons to black
    StatusBar.setBarStyle('white-content'); // Black icons
    StatusBar.setBackgroundColor('red'); // White background
  }, []);

  return (
    <View style={styles.headerContainer}>
      {/* Top Section: Avatar, Welcome Text, and Notification Icon */}
      <View style={tw`flex flex-row items-center  gap-4 pb-4`}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <SvgXml xml={backIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          
          <Text style={styles.title}>Details</Text>
        </View>

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="search chats..."
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
    paddingVertical: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  
  },


  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 12,
    color: 'black',
  },
  searchIcon: {
    marginLeft: 8,
  },
});

export default HeaderOnlySerch;
