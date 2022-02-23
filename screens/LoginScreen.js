import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView } from 'react-native'
import { firebase, auth } from '../firebase'
import { LogBox } from 'react-native'
import { NativeBaseProvider, HStack, VStack } from 'native-base'

// ignores an error that results from using firebase with Expo
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.firestore()
class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            isRegistering: false,
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            rating: "",
            param: ""
        }
    }

    isRegistrationValid = () => {
        const {email, password, confirmPassword, name, rating} = this.state
        return password === confirmPassword && email && name && Number.isInteger(parseInt(rating))
    }

    createUser = async () => {
        const {email, name, rating} = this.state

        await db.collection('Users').doc(email).set({
            email: email,
            name: name,
            rating: parseInt(rating),
            friends: []
        }).then(() => console.log("User (" + email + ") created successfully."))
    }

    handleRegister = () => {
        const {email, password, rating} = this.state

        if (this.state.isRegistering) {
            console.log(Number.isInteger(parseInt(rating)))
            if (this.isRegistrationValid()) {
                auth.createUserWithEmailAndPassword(email, password )
                    .then(() => this.createUser())
                    .catch(error =>
                        Alert.alert("Registration Failed", "Please check that your email is correct."))
            } else
                Alert.alert("Registration Failed", "Please check that your information is valid.")
        } else {
            this.setState({
                isRegistering: !this.state.isRegistering
            })
        }
    }

    handleLogin = () => {
        const {email} = this.state

        if (!this.state.isRegistering) {
            auth.signInWithEmailAndPassword(email, this.state.password)
                .then(credentials => {
                    const user = credentials.user
                    console.log('Logged in as: ', user.email)
                }).catch(error =>
                    Alert.alert("Login Failed", "Please check that your email and password are correct."))
        } else {
            this.setState({
                isRegistering: !this.state.isRegistering
            })
        }
    }


    unsub = auth.onAuthStateChanged(user => {
        if (user) {
            navigation.replace("Home")
        }
    })

    handleOnChange = () => {

    }
    
    componentDidMount() {
        this.unsub()
        console.log(this.props.route.params.toRegister);
        if (this.props.route.params.toRegister) {
            this.setState({
                isRegistering: true
            })
        }
    }
    
    render() {
        const {email, password, confirmPassword, name, param, rating} = this.state
        return (
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <View style={styles.headerContainer}> 
                        <Text style={{fontSize: 20}}>Hi {param} {"Coach!"} </Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Email"  onChangeText={text => this.handleOnChange(text)} style={styles.input} />
                        {this.state.isRegistering && <TextInput placeholder="Full Name" onChangeText={text => this.handleOnChange(text)} style={styles.input} />}
                        <TextInput placeholder="Password" onChangeText={text => this.handleOnChange(text)} style={styles.input} secureTextEntry />
                        {this.state.isRegistering && <View>
                            <TextInput placeholder="Confirm Password"  onChangeText={text => this.handleOnChange(text)} style={styles.input} secureTextEntry />
                            <TextInput placeholder="Current Rating"  onChangeText={num => this.handleOnChange(num)} style={styles.input} />
                        </View>}
                        <Text style={{width: "100%", textAlign: "center", marginTop: 15, fontSize: 13, fontWeight: "600"}}>Forgot your password?</Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => { this.handleLogin() }} style={styles.button} >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => { this.handleRegister() }} style={[styles.button, styles.buttonOutline]}>
                            <Text style={styles.buttonOutlineText}>Register</Text>
                        </TouchableOpacity> */}
                    </View>
                    <NativeBaseProvider>
                        <HStack marginTop={20}>
                            <Text style={{fontSize: 16}}>Don't have an account yet? </Text>
                            <TouchableOpacity onPress={() => this.handleRegister()}>
                                <Text style={{ fontWeight: "bold", textDecorationLine: "underline", fontSize: 16 }}>Sign Up.</Text>
                            </TouchableOpacity>            
                        </HStack>
                    </NativeBaseProvider>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#E3F6F5',
    },
    headerContainer:{
        width:'100%',
        height: 150,
        display: 'flex',
        justifyContent:'space-evenly',
        alignItems: 'center', 
    },
    inputContainer: {
        width: '100%',
        height: 200,
        padding: 20,

        justifyContent: "center"
    },
    input: {
        height: 45,
        backgroundColor: 'rgba(216,216,216, 0.51)',
        paddingHorizontal: 15,
        borderRadius: 25, 
        marginTop: 25,
        borderWidth: 0.5,
        borderColor: "rgba(151,151,151, 0.51)",
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 85,
    },
    button: {
        width: 200,
        height: 45,
        backgroundColor: 'rgba(39,38,67, 0.5)',
        borderRadius: 30,
        
        alignItems: 'center',
        justifyContent: "center"
    },
    buttonOutline: {
        backgroundColor: 'blue',
        marginTop: 5,
        borderColor: '#272643',
        borderWidth: 2,
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16,
        
    },
    buttonOutlineText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
  
    headerMessage:{
        backgroundColor: 'green',

    }
})

export default LoginScreen
