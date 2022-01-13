import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

/*
import * as firebase from 'firebase';

// firebase setup
const firebaseConfig = {
  apiKey: "AIzaSyDtW3e_WVrh80YjG87_-w6T2GJJyhpTC-Y",
  authDomain: "pingtt-584c4.firebaseapp.com",
  projectId: "pingtt-584c4",
  storageBucket: "pingtt-584c4.appspot.com",
  messagingSenderId: "408950196090",
  appId: "1:408950196090:web:e05ec7d9fc49af0c8cf8c3",
  measurementId: "G-SRLPWK25W5"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

*/
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
