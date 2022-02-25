import React from "react"

// Screens 
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import Started from "./screens/Started"
import UserType from "./screens/UserType"
import TrainingScreen from "./screens/TrainingScreen"
import EventScreen from "./screens/EventScreen"
import FriendScreen from "./screens/FriendScreen"



// TabNavigation Screens 
import TrainingPlanScreen from "./screens/TrainingPlanScreen"


import MainStackNavigator from "./navigation/StackNavigator"
import TabNavigator from "./navigation/TabNavigator"

const isLogin = false

export default function App() {
	return (
		

		isLogin ? <TabNavigator/> : <MainStackNavigator/>
		// <FriendScreen/>
		// <TabNavigator/>
		// <MainStackNavigator/>
	)
}


