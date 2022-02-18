import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect, Component } from 'react'
import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, SafeAreaView } from 'react-native'
import { firebase, auth } from '../firebase'
import { LogBox } from 'react-native'

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
                <Text>Hi {param}! {} </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" value={email} onChangeText={text => this.handleOnChange(text)} style={styles.input} />
                    {this.state.isRegistering && <TextInput placeholder="Full Name" value={name} onChangeText={text => this.handleOnChange(text)} style={styles.input} />}
                    <TextInput placeholder="Password" value={password} onChangeText={text => this.handleOnChange(text)} style={styles.input} secureTextEntry />
                    {this.state.isRegistering && <View>
                        <TextInput placeholder="Confirm Password" value={confirmPassword} onChangeText={text => this.handleOnChange(text)} style={styles.input} secureTextEntry />
                        <TextInput placeholder="Current Rating" value={rating} onChangeText={num => this.handleOnChange(num)} style={styles.input} />
                    </View>}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => { this.handleLogin() }} style={styles.button} >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { this.handleRegister() }} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#E3F6F5',
    },
    headerContainer:{
        width:'100%',
        height:"20%",

        backgroundColor: 'tomato',
        marginBottom: '20%',
        
        display: 'flex',
        justifyContent:'space-evenly',
        alignItems: 'center', 
    },
    inputContainer: {
        width: '80%',
        marginTop:'-10%', //maybe i need to change this
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'blue',
        opacity: 0.5,
        width: '100%',
        padding: 15,
        borderRadius: 30,
        borderColor: '#272643',
        borderWidth: 2,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'blue',
        marginTop: 5,
        borderColor: '#272643',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
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
