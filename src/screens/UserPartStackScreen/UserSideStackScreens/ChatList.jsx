import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import HeaderOnlySerch from '../../../lib/components/HeaderOnlySerch';
import { useNavigation } from '@react-navigation/native';
import { NavigationIcon } from '../../../assets/Icons/icons';
import { SvgXml } from 'react-native-svg';

const ChatList = () => {
  const navigation = useNavigation();

  const chatesData = [
    {
      id: 1,
      name: "Organization",
      image: require('../../../assets/Icons/avater.png'),
      time: "10:00 AM",
      messageCount: 2
    },
    {
      id: 2,
      name: "Location employee",
      image: require('../../../assets/Icons/avater.png'),
      time: "10:00 AM",
      messageCount: 6
    },
    {
      id: 1,
      name: "Organization",
      image: require('../../../assets/Icons/avater.png'),
      time: "10:00 AM",
      messageCount: 7
    },
    {
      id: 2,
      name: "Location employee",
      image: require('../../../assets/Icons/avater.png'),
      time: "10:00 AM",
      messageCount: 8
    }
  ];

  return (
    <View style={{ flex: 1 , backgroundColor: 'white'}}>
      <HeaderOnlySerch />
      <View style={{ padding: 20 }}>

        
        <FlatList
          data={chatesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('ChatDetail', { id: item.id })}>
              <View style={styles.chatCard}>
                <Image source={item.image} style={styles.avatar} />

                <View style={{flex: 1}}>

                <View style={styles.flexitem}>
                  <Text style={styles.chatName}>{item.name}</Text>
                  <Text style={styles.chatTime}>{item.time}</Text>
                
                </View>
                <View style={styles.flexitem}>
                  <Text style={styles.messageCount}>{item.messageCount} new messages</Text>

              <Text>
                <SvgXml xml={NavigationIcon} />
              </Text>
                </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
          removeClippedSubviews={false}
        />
      </View>
    </View>
  );
};

export default ChatList;

const styles = StyleSheet.create({
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },

  flexitem:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
    flex: 1
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatInfo: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  chatTime: {
    fontSize: 12,
    color: '#A8A8A8',
  },
  messageCount: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
  },
});
