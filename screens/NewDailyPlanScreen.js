import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { auth } from '../firebase'
import { addDailyPlan, getDailyPlans, DailyPlan, init } from '../DAOs/DailyPlanDAOs'

const NewDailyPlanScreen = () => {
    //TODO: 
    //implement creating a checklist
    const navigation = useNavigation()

    const [checklistTasks, setChecklistTasks] = useState([]) // Array of user's current checklist tasks
    const [emails, setEmails] = useState([]) // Array containing student's email and coach's email
    const [date, setDate] = useState(Date) // New Daily Plan date
    var today = new Date(Date.now())

    function handleBackButtonClick() {
        navigation.navigate("Home");
        return true;
    }

    const handleCancel = () => {
        navigation.navigate("Training");
        return true;
    }

    const handleTest = async () => {
        var testPlan1 = new DailyPlan('student1@student.com','coach@coach.com',['task 1', 'task 2'], [false, true]);
        init(testPlan1)
    }

    return ( 
            <View style = {styles.container}>
            <Text>Date: {today.toDateString()}</Text>
            <TouchableOpacity 
            style = {styles.button}
            onPress = {() => {handleCancel()}} >
                <Text style = {styles.buttonText}>
                    Cancel 
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
            style = {styles.button}
            onPress = {() => {handleTest()}} >
                <Text style = {styles.buttonText}>
                    Test 
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

export default NewDailyPlanScreen