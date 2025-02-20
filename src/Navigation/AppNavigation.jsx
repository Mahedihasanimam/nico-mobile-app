import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import InitialScreen from '../screens/InitialScreen';
import SplashScreen from '../screens/SplashScreen';

// User side authentication screens start
import ForgotPasswordAsUser from '../screens/UserPartStackScreen/UserAuthenticationScreens/ForgotPassword';
import LoginAsUser from '../screens/UserPartStackScreen/UserAuthenticationScreens/Login';
import ResetPasswordAsUser from '../screens/UserPartStackScreen/UserAuthenticationScreens/ResetPassword';
import SignupAsUser from '../screens/UserPartStackScreen/UserAuthenticationScreens/Signup';
import VerificationAsUser from '../screens/UserPartStackScreen/UserAuthenticationScreens/Verification';
// User side authentication screens end

// User side Main screens start

import UserInitialScreen from '../screens/UserPartStackScreen/UserSideStackScreens/InitialScreen';

// User side Main screens end

// Technician side authentication screens start
import ForgotPassword from '../screens/TechnicianPartStackScreens/ForgotPassword';
import LoginScreen from '../screens/TechnicianPartStackScreens/LoginScreen';
import SetNewPassword from '../screens/TechnicianPartStackScreens/SetNewPassword';
import Verification from '../screens/TechnicianPartStackScreens/Verification';
// Technician side authentication screens start End

// Technician side Profile screens start Start
import TechnicianProfile from '../screens/TechnicianPartStackScreens/TechnicianProfile/TechnicianProfile';
// Technician side Profile screens start End

import TechnicianBottomTab from './TechnicianBottomTab';
import ChatDetails from '../screens/TechnicianPartStackScreens/BottomScreens/ChatDetails';
import Notification from '../screens/notification/Notification';
import EditProfile from '../screens/TechnicianPartStackScreens/TechnicianProfile/EditProfile';
import ChnagePassword from '../screens/TechnicianPartStackScreens/TechnicianProfile/ChnagePassword';
import AboutUs from '../screens/TechnicianPartStackScreens/TechnicianProfile/AboutUs';
import PrivacyPolocy from '../screens/TechnicianPartStackScreens/TechnicianProfile/PrivacyPolocy';
import FAQ from '../screens/TechnicianPartStackScreens/TechnicianProfile/FAQ';
import TicketDetails from '../screens/TechnicianPartStackScreens/BottomScreens/Tickets/TicketDetails';
import InspactionDetails from '../screens/TechnicianPartStackScreens/BottomScreens/InspactionDetails';
import JobcardDetails from '../screens/TechnicianPartStackScreens/BottomScreens/JobcardDetails';
import QrcodeCameraScreen from '../screens/UserPartStackScreen/UserSideStackScreens/QrcodeCameraScreen';
import YourProblem from '../screens/UserPartStackScreen/UserSideStackScreens/YourProblem';
import ViewAllClosed from '../screens/UserPartStackScreen/UserSideStackScreens/ViewAllClosed';
import UserCallsDetails from '../screens/UserPartStackScreen/UserSideStackScreens/UserCallsDetails';
import ChatList from '../screens/UserPartStackScreen/UserSideStackScreens/ChatList';
// import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InitialScreen"
          component={InitialScreen}
          options={{
            headerShown: false,
            animation: 'none',
            presentation: 'transparentModal', // Fade transition effect
          }}
        />

        {/* User side authentication screens start */}

        <Stack.Screen
          name="SignupAsUser"
          component={SignupAsUser}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />



        <Stack.Screen
          name="LoginAsUser"
          component={LoginAsUser}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />

        <Stack.Screen
          name="ForgotPasswordAsUser"
          component={ForgotPasswordAsUser}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        <Stack.Screen
          name="VerificationAsUser"
          component={VerificationAsUser}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        <Stack.Screen
          name="ResetPasswordAsUser"
          component={ResetPasswordAsUser}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        {/* User side authentication screens End */}

        {/* User side Main screens Start*/}

        <Stack.Screen
          name="UserInitialScreen"
          component={UserInitialScreen}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Stack.Screen
          name="qrCamera"
          component={QrcodeCameraScreen}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Stack.Screen
          name="Your Problem"
          component={YourProblem}
          options={{
            headerStyle: {
              backgroundColor: 'red',

              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,

              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="viewallclosed"
          component={ViewAllClosed}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />
        <Stack.Screen
          name="Details"
          component={UserCallsDetails}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />

        {/* User side Main screens End*/}

        {/* Technician side authentication screens start */}

        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
            animation: 'none',
          }}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        <Stack.Screen
          name="Verification"
          component={Verification}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        <Stack.Screen
          name="SetNewPassword"
          component={SetNewPassword}
          options={{
            headerShown: true,
            animation: 'none',
            headerTitle: '', // Hide title
            headerShadowVisible: false, // Removes the bottom shadow (for native stack)
            headerStyle: {
              elevation: 0, // Removes shadow on Android
              shadowOpacity: 0, // Removes shadow on iOS
            },
          }}
        />

        {/* Technician side authentication screens End */}

        {/* // Technician side Profile screens start Start */}
        <Stack.Screen
          name="Myaccount"
          component={TechnicianProfile}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Edit Profile"
          component={EditProfile}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="Change password"
          component={ChnagePassword}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="About us"
          component={AboutUs}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />


        <Stack.Screen
          name="Privacy policy"
          component={PrivacyPolocy}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />

        <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />
        <Stack.Screen
          name="TicketDetails"
          component={TicketDetails}
          options={{


            headerShown: false,
          }}
        />
        <Stack.Screen
          name="inspactionDetails"
          component={InspactionDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="jobcarddetails"
          component={JobcardDetails}
          options={{
            headerShown: false,
          }}
        />




        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerStyle: {
              backgroundColor: 'red',
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTintColor: 'white',
          }}
        />

        {/* // Technician side Profile screens start End */}

        {/* // Technician side Bottom Navigator  screen start  */}

        <Stack.Screen
          name="TechnicianBottomTab"
          component={TechnicianBottomTab}
          options={{
            headerShown: false,
            // animation: 'none',
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name='Chats'
          component={ChatList}
          options={{
            headerShown: false,

          }}
        />
        <Stack.Screen
          name='ChatDetail'
          component={ChatDetails}
          options={{
            headerShown: false,

          }}
        />

      </Stack.Navigator>


      {/* // Technician side Bottom Navigator  screen End  */}
    </NavigationContainer>
  );
};

export default AppNavigation;
