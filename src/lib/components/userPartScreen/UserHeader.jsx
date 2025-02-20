import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { IconNotification, message, qrscan } from '../../../assets/Icons/icons';
import avater from '../../../assets/Icons/avater.png';
import { useNavigation } from '@react-navigation/native';

const UserHeader = () => {


  const Navigation = useNavigation();
  return (
    <>
      <View style={styles.header}>

        <TouchableOpacity onPress={() => Navigation.navigate('Myaccount')}>

        <View style={styles.profileInfo}>
          <Image source={avater} style={styles.profileImage} />
          <View>
            <Text style={styles.greeting}>Good afternoon,</Text>
            <Text style={styles.userName}>Md. Mehedi Hasan</Text>
          </View>
        </View>
        </TouchableOpacity>
        <View style={styles.buttons}>
          <TouchableOpacity  onPress={() => Navigation.navigate('Chats')}>
            <SvgXml xml={message} />
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => Navigation.navigate('Notification')}>
            <SvgXml xml={IconNotification} />
          </TouchableOpacity>
        </View>
      </View>
   
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#E50914',
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  greeting: { color: 'white', fontSize: 14 },
  userName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  qrSection: { alignItems: 'center', paddingHorizontal: 20 },
  qrBox: { borderRadius: 10, padding: 30, marginBottom: 10 },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },
});

export default UserHeader;
