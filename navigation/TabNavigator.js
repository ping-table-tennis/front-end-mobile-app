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
import FriendScreen from "../screens/FriendScreen"


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
			<Stack.Screen name="Training" options={{ headerShown: true }} component={HomeScreen} />
			<Stack.Screen name="TrainingPlan" options={{ headerShown: true }} component={TrainingPlanScreen} />
			{/* <Stack.Screen name="Friend" options={{ headerShown: true }} component={FriendScreen} /> */}
		</Stack.Navigator>
	)
}


const BottomTabNavigator = () => {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={tabBarIcon} tabBarOptions={tabBarOptions} >
				<Tab.Screen name="Training" options={{ headerShown: false }} component={TrainingStack} />
				<Tab.Screen name="Events" component={EventScreen} />
				<Tab.Screen name="Notifications" component={NotificationScreen} />
				{/* <Tab.Screen name="Schedule" component={ScheduleScreen} /> */}
				<Tab.Screen name="Schedule" component={FriendScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	)
}



export default BottomTabNavigator