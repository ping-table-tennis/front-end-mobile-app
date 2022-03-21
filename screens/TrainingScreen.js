import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import { addDailyPlan, getDailyPlans } from '../DAOs/DailyPlanDAOs'

const TrainingScreen = () => {
    const navigation = useNavigation()
    const currentEmail = auth.currentUser?.email

    //addDailyPlan();

    const [dailyPlans, setDailyPlans] = useState([]) // Array of user's current Daily Plans
    const [generalPlans, setGeneralPlans] = useState([]) // Array of user's current General Plans

    function handleBackButtonClick() {
        navigation.navigate("Home");
        return true;
    }
    
    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    } 

    //TODO:
    //create input screen for making new plan
    //option to make daily or general plan
    //fields to fill in for daily or general plan
    //read data from database
    //coach needs drop down menu of students
    //when coach selects a students it shows the history of plans

    const updateTrainingPlans = () => {
        setDailyPlans(getDailyPlans());

    }

    const handleNewDailyPlan = () => {
        navigation.navigate("Test Training Plans");
        return true;
    }

    return (
        <View style = {styles.container}>
            <Text>Email: {auth.currentUser?.email}</Text>
            <TouchableOpacity 
            style = {styles.button}
            onPress = {() => {handleSignOut()}} >
                <Text style = {styles.buttonText}>
                    Sign Out 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style = {styles.button}
            onPress = {() => {handleNewDailyPlan()}} >
                <Text style = {styles.buttonText}>
                    New Daily Plan 
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})

export default TrainingScreen;