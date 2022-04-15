
import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { Image, BackHandler, Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import pfp from '../assets/images/default_pfp.jpg'
import * as Const from '../util/Constants'

const db = firebase.firestore()

const ProfileScreen = ({route, navigation}) => {
    const {email} = route.params // get email from previous screen
    const [name, setName] = useState('')
    const [rating, setRating] = useState(0)
    const [role, setRole] = useState(false)

    function handleBackButtonClick() {
        navigation.navigate("Friend");
        return true;
    }

    const updateUserData = () => {
        db.collection('Users').doc(email).get().then(doc => {
            if (doc.exists) {   
                let data = doc.data()
                setName(data.name)
                setRating(data.rating)
                setRole(data.isStudent)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    const parseRole = () => {
        return (role ? "Student" : "Coach")
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
                <View style = {styles.cardContainer}>
                    <View style = {styles.cardOutline}> 
                        <Text style = {styles.roleText}> {parseRole()} </Text>
                    </View>
                    <Text style = {styles.nameText}>{name}</Text>
                    <Text>{email}</Text>
                    <Image source = {pfp} style = {styles.pfp}/>
                    <Text style = {styles.ratingText}>{rating}</Text>
                    <Text style = {styles.ratingSubtext}>RATING</Text>
                </View>
                {/*
                <View style = {styles.buttonContainer}>
                    <TouchableOpacity>
                       <Text> H </Text>
                    </TouchableOpacity>
                </View>
                */}
        </KeyboardAvoidingView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 50,
    },
    nameText: {
        fontSize: 36,
        padding: 5, 
    },
    ratingText: {
        marginTop: 40,
        textAlign: 'center',
        alignItems: "flex-start",
        fontSize: 30,
    },
    ratingSubtext: {
        fontSize: 15,
    },
    pfp: {
        marginTop: 40,
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    cardContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 5,
        width: 320,
        height: 460,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardOutline: {
        backgroundColor: "black",
        width: 320,
        height: 30,
        position: 'absolute',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    roleText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
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
