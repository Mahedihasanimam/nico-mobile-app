import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from './src/Context/ThemeContext';
import AppNavigation from './src/Navigation/AppNavigation';

const App = () => {
  return (
    <>
      <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}} >
          <AppNavigation />
          </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
};

export default App;
