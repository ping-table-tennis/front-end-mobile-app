import React from "react"
import { NavigationContainer } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'

// Screens 
// import LoginScreen from './screens/LoginScreen'
// import HomeScreen from './screens/HomeScreen'
// import Started from "./screens/Started"
// import UserType from "./screens/UserType"
// import TrainingScreen from "./screens/TrainingScreen"
// import EventScreen from "./screens/EventScreen"
// import FriendScreen from "./screens/FriendScreen"

// TabNavigation Screens 
// import TrainingPlanScreen from "./screens/TrainingPlanScreen"


import TabNavigator from "./navigation/TabNavigator"





export default function App(props) {
	return (
		<NavigationContainer>
			<TabNavigator/> 
		</NavigationContainer>
	)
}


