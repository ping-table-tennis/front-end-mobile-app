import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'

const db = firebase.firestore()

const HomeScreen = () => {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const currentEmail = auth.currentUser?.email

    // gets the document by the user's current email and sets name
    const getUserData = async () => {
        await db.collection('Users').doc(currentEmail).get().then(doc => {
            try {
                if (doc.exists) {
                    let data = doc.data()
                    setName(data.name)
                }
            } catch {
                console.log("User could not be created.")
            }
        })
    }
    getUserData()

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    } 

    return (
        <View style = {styles.container}>
            <Text>Welcome, {name}!</Text>



            
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

export default HomeScreen

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
