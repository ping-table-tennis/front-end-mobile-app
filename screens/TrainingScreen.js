import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'

const TrainingScreen = () => {
    const navigation = useNavigation()

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