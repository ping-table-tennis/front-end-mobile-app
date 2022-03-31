
import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { FlatList, BackHandler, Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import * as Const from '../util/Constants'

const db = firebase.firestore()

const ProfileScreen = ({route, navigation}) => {
    const {email} = route.params // get email from previous screen
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)

    function handleBackButtonClick() {
        navigation.goBack();
        return true;
    }

    const updateUserData = () => {
        db.collection('Users').doc(email).get().then(doc => {
            if (doc.exists) {   
                let data = doc.data()
                setName(data.name)
                setRating(data.rating)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        updateUserData() 
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }, [])

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior= {Platform.OS === "ios" ? "padding" : "height"} 
        >
            <View style = {styles.container}>
                <Text>{email}</Text>
                <Text>{name}</Text>
                <Text>{rating}</Text>
                
            </View>
        </KeyboardAvoidingView>
    )
}

export default ProfileScreen

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
