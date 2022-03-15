import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { Image, BackHandler, Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, useWindowDimensions, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import fab from '../assets/images/fab.png'

const db = firebase.firestore()


const MatchesScreen = () => {

    const navigation = useNavigation()

    function handleBackButtonClick() {
        navigation.navigate("Training");
        return true;
    }

    useEffect(() => {
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
        
        <View>
            <Text> Matches Screen </Text>
        </View>
            <TouchableOpacity 
                style = {styles.touchableOpacityStyle} 
                onPress = {() => {navigation.navigate("InputMatch")}}>
                <Image source={fab} style = {styles.floatingButtonStyle}/>
                </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

export default MatchesScreen

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
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
    }
})
