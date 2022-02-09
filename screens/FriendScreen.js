import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { BackHandler, Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'

const db = firebase.firestore()

const FriendScreen = () => {
    const navigation = useNavigation()

    const [requests, setRequests] = useState([])
    const [friend, setFriend] = useState('')
    const currentEmail = auth.currentUser?.email

    function handleBackButtonClick() {
        navigation.replace("Home");
        return true;
    }
    
    useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    }, []);

    const sendFriendRequest = async () => {
        let reference = db.collection('Users').doc(friend)
        let data
        await reference.get().then(doc => {
            if (doc.exists)
                data = doc.data()
            else {
                Alert.alert("User not found","Please check that the email exists")
                return
            }
        })
        let updatedRequests = data.requests
        updatedRequests.push(currentEmail)
        await reference.update({requests: updatedRequests})
        Alert.alert("","Friend Request Sent")
    }

    // Set the user's friend requests from database to variable 'requests'
    const setFriendRequests = (() => {
        db.collection('Users').doc(currentEmail).get().then(doc => {
            if (doc.exists) {
                let requests = doc.data().requests
                setRequests(requests)
            }
        })
    })()

    const displayFriendRequests = async () => {
        //let reqs = await getFriendRequests()
        //console.log("Friend Requests:", reqs)
        console.log(requests)
    }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior= {Platform.OS === "ios" ? "padding" : "height"} 
        >
            <View style={styles.container}>
                <Text style = {styles.title}> Requests </Text>
                <Text> {requests[0]}</Text>
                <TextInput
                    placeholder = "Enter the user's email"
                    value = {friend}
                    onChangeText = {text => setFriend(text)}
                    style = {styles.input}
                />
                    
                <TouchableOpacity style={styles.button}
                onPress = { () => {sendFriendRequest()} }>
                    <Text style = {styles.buttonText}> Add </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default FriendScreen

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
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    title: {
        color: 'blue',
        fontWeight: '700',
        fontSize: 16
    }
})
