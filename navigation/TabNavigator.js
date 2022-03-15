import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Text, View, Image } from 'react-native'


// Icons
import Event from "../assets/icons/events"
import PingPong from "../assets/icons/pingPong"
import Notification from "../assets/icons/notification"
import Schedule from "../assets/icons/schedule"


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()


// Screens
import HomeScreen from "../screens/HomeScreen"
import EventScreen from "../screens/EventScreen"
import NotificationScreen from "../screens/NotificationScreen"
import ScheduleScreen from "../screens/ScheduleScreen"
import TrainingPlanScreen from "../screens/TrainingPlanScreen"
import MoreToDo from "../screens/MoreToDo"
import FriendScreen from "../screens/FriendScreen"

import LoginScreen from '../screens/LoginScreen'
import Started from "../screens/Started"
import UserType from "../screens/UserType"
import RegistrationScreen from "../screens/RegistrationScreen"
// import TrainingScreen from "../screens/TrainingScreen"

import MatchesScreen from "../screens/MatchScreen"
import InputMatchScreen from "../screens/InputMatchScreen"

import MainStackNavigator from "./StackNavigator"
import ProfileScreen from "../screens/ProfileScreen"

// Bar Icons
const tabBarIcon = ({ route }) => ({
	tabBarIcon: ({ focused }) => {
		switch (route.name) {
			case "Training":
				return  focused ? <PingPong fill="#0D0BAA"/> : <PingPong fill="#666666" /> 
			case "Events":
				return  focused ? <Event fill="#0D0BAA"/> : <Event fill="#666666"/> 
			case "Notifications":
				return  focused ? <Notification fill="#0D0BAA"/> : <Notification fill="#666666"/> 
			case "Schedule":
				return  focused ? <Schedule fill="#0D0BAA"/> : <Schedule fill="#666666"/> 
		}
	}
})

// Tab Options
const tabBarOptions = {
	activeTintColor: "#0D0BAA",
	inactiveTintColor:"#666666" 
}


const TrainingStack = () => {
	return (
		<Stack.Navigator >
			<Stack.Screen name="Home" options={{ headerShown: true }} component={HomeScreen} />
			<Stack.Screen name="TrainingPlan" options={{ headerShown: true }} component={TrainingPlanScreen} />
			<Stack.Screen name="ToDo" options={{ headerShown: true }} component={MoreToDo} />
			
			<Stack.Screen name="Registration" options={{ headerShown: false }} component={RegistrationScreen} />
			<Stack.Screen name="Start" options={{ headerShown: false }} component={Started} />
            <Stack.Screen name="UserType" options={{ headerShown: false }} component={UserType} />
            {/*<Stack.Screen name="Login"   options={{ headerShown: false }} component={LoginScreen} />*/}
            <Stack.Screen name="Event"  options={{ headerShown: false }} component={EventScreen} />
			<Stack.Screen name="InputMatch" component={InputMatchScreen} />
			<Stack.Screen name="Profile" component={ProfileScreen} />
		</Stack.Navigator>
	)
}


const BottomTabNavigator = () => {
	return (
		<Tab.Navigator screenOptions={tabBarIcon} tabBarOptions={tabBarOptions} >
			<Tab.Screen name="Training" options={{ headerShown: false }} component={TrainingStack} />
			{/* <Tab.Screen name="Start" options={{ headerShown: false, tabBarStyle: {display: "none"} }} component={MainStackNavigator} /> */}
			<Tab.Screen name="Events" component={EventScreen} />
			<Tab.Screen name="Notifications" component={NotificationScreen} />
			<Tab.Screen name="Schedule" component={ScheduleScreen} />
			<Tab.Screen name="Friend" component={FriendScreen} />
			<Tab.Screen name="Match" component={MatchesScreen} />
		</Tab.Navigator>
	)
}



export default BottomTabNavigator