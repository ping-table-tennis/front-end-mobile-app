import React from "react"

// Screens 
import LoginScreen from './screens/LoginScreen'
import HomeScreen from './screens/HomeScreen'
import Started from "./screens/Started"
import UserType from "./screens/UserType"
import TrainingScreen from "./screens/TrainingScreen"
import EventScreen from "./screens/EventScreen"

import MainStackNavigator from "./navigation/StackNavigator"
import TabNavigator from "./navigation/TabNavigator"

const isLogin = false

export default function App() {
	return (
		isLogin ? <TabNavigator/> :  <MainStackNavigator/>
	)
}


