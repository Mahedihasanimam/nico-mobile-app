import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from '../../../lib/tailwind';
import Svg, { SvgXml } from 'react-native-svg';
import { aboutIcon, changepaswordIcon, faqIcon, LocationIcon, logoutIcon, privacyIcon, rightIcon, userIcon } from '../../../assets/Icons/icons';



const TechnicianProfile = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: 1,
      icon: userIcon,
      title: 'Edit profile',
      route: 'Edit Profile',
    },
    {
      id: 2,
      icon: changepaswordIcon,
      title: 'Change password',
      route: 'Change password',
    },
    {
      id: 3,
      icon: aboutIcon,
      title: 'About us',
      route: 'About us',
    },
    {
      id: 4,
      icon: privacyIcon,
      title: 'Privacy policy',
      route: 'Privacy policy',
    },
    {
      id: 5,
      icon: faqIcon,
      title: 'FAQ',
      route: 'FAQ',
    },
    {
      id: 6,
      icon: logoutIcon,
      title: 'Logout',
    },
  ];const handleMenuPress = (item) => {
    if (item.title === 'Logout') {
      // Clear any stored user data (if needed)
      // Example: AsyncStorage.clear();
      
      // Redirect to LoginPage
      navigation.reset({
        index: 0,
        routes: [{ name: 'SplashScreen' }],
      });
      return;
    }
  
    if (item.route) {
      try {
        navigation.navigate(item.route);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    }
  };
  

  const renderHeader = () => (
    <View style={tw`px-4 py-6 bg-white flex-row items-center`}>
      <Image
        source={require('../../../assets/Icons/avater.png')}
        style={tw`w-[50px] h-[50px] rounded-full mr-2`}
      />
      <View style={tw`flex-1  flex-row justify-between`}>

        <View>
          <Text style={tw`text-[16px] font-semibold text-[#000000] `}>
            Md. Mehedi Hasan
          </Text>
          <Text style={tw`text-sm text-gray-500 `}>
            example@gmail.com
          </Text>
        </View>

        <View style={tw`flex flex-row items-center gap-2`}>




          <View  >
            <Text style={tw`text-sm text-gray-500`}>
              Banasree, Rampura
            </Text>
            <Text style={tw`text-[12px] font-medium text-[#000000] text-center`}>
              Dhaka, Bangladesh
            </Text>

          </View>
          <View >
            <SvgXml xml={LocationIcon} />

          </View>
        </View>


      </View>
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity
      style={tw`mx-4 mb-3 bg-red-50 rounded-xl flex-row items-center justify-between p-4`}
      onPress={() => handleMenuPress(item)}
      activeOpacity={0.7}
    >
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-xl mr-4 w-6`}>
          <SvgXml xml={item.icon} />
        </Text>
        <Text style={tw`text-base text-gray-800`}>{item.title}</Text>
      </View>
      <Text style={tw`text-lg text-red-400`}>
        <SvgXml xml={rightIcon} />
      </Text>
    </TouchableOpacity>
  );

  return (
<SafeAreaView style={tw`flex-1 bg-white`}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pt-2 pb-6`}
        removeClippedSubviews={false}  
      />
    </SafeAreaView>
  );
};

export default TechnicianProfile;


// import { View, Text } from 'react-native'
// import React from 'react'

// const TechnicianProfile = () => {
//   return (
//     <View>
//       <Text>TechnicianProfile</Text>
//     </View>
//   )
// }

// export default TechnicianProfile