/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@/screens/Main';
import LoadingScreen from '@/screens/Loading';
import SettingScreen from '@/screens/Setting';

import { isDarkMode } from '@/composables/color';
import { container } from '@/styles/global';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle={isDarkMode() ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode() ? '#000' : '#fff'}
      />
      <SafeAreaView style={container.default}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Setting" component={SettingScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

export default App;
