import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import FriendScreen from './screens/FriendScreen';
import TrainingScreen from './screens/TrainingScreen';
import NewDailyPlanScreen from "./screens/NewDailyPlanScreen";
import Started from "./Views/Started";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
	  	{/* <Stack.Screen name="Start" options={{headerShown: false}} component={Started} /> */}
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Friend" component={FriendScreen} />
        <Stack.Screen name="Training" component={TrainingScreen} />
        <Stack.Screen name="New Daily Plan" component={NewDailyPlanScreen} />
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



