import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

 
import LoginScreen from '../screens/LoginScreen'
import Started from "../screens/Started"
import UserType from "../screens/UserType"
import TrainingScreen from "../screens/TrainingScreen"
import EventScreen from "../screens/EventScreen"

const Stack = createNativeStackNavigator()

const MainStackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Start" options={{ headerShown: false }} component={Started} />
                <Stack.Screen name="UserType" component={UserType} />
                <Stack.Screen name="Login"  component={LoginScreen} />
                {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
                <Stack.Screen name="Training"  component={TrainingScreen} />
                <Stack.Screen name="Event"  component={EventScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



export default MainStackNavigator