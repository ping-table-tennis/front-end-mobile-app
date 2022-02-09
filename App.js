import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AsyncStorage } from "react-native";

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import Started from "./screens/Started";
import UserType from "./screens/UserType";


const Stack = createNativeStackNavigator();

export default function App(props) {
  console.log(props)
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen name="Start" options={{ headerShown: false }} component={Started} />
        <Stack.Screen name="UserType" component={UserType} />
        <Stack.Screen name="Login"  component={LoginScreen} />
        {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



