import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import { LogBox } from 'react-native';

// ignores an error that results from using firebase with Expo
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.firestore()

const LoginScreen = () => {
    // by default the form shows the fields for login, bool is a toggle to show register fields
    const [isRegistering, setRegistering] = useState(false) 
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')

    const navigation = useNavigation()

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsub
    }, [])
    
    // Creates a user in the firestore to collection 'Users'
    const createUser = async () => {
        await db.collection('Users').doc(email).set({
            email: email,
            name: name,
            rating: parseInt(rating),
            friends: []
        }).then(() => console.log("User (" + email + ") created successfully."))
    }

    // Makes sure all the info from the form is valid
    const isRegistrationValid = () => {
        return password === confirmPassword && email && name && Number.isInteger(parseInt(rating))
    }
    
    const handleRegister = () => {
        if (isRegistering) {
            console.log(Number.isInteger(parseInt(rating)))
            if (isRegistrationValid()) {
                auth.createUserWithEmailAndPassword(email, password)
                .then(() => createUser())
                .catch(error => 
                    Alert.alert("Registration Failed","Please check that your email is correct."))
            } else
                Alert.alert("Registration Failed","Please check that your information is valid.")
        } else {
            setRegistering(!isRegistering)
        }
    }

    const handleLogin = () => {
        if (!isRegistering) {
            auth.signInWithEmailAndPassword(email, password)
            .then(credentials => {
                const user = credentials.user
                console.log('Logged in as: ', user.email)
            }).catch(error => 
                Alert.alert("Login Failed","Please check that your email and password are correct."))  
        } else {
            setRegistering(!isRegistering)
        }
    }  

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior= {Platform.OS === "ios" ? "padding" : "height"} 
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder = "Email"
                    value = {email}
                    onChangeText = {text => setEmail(text)}
                    style = {styles.input}
                />
                { isRegistering && <TextInput
                    placeholder = "Full Name"
                    value = {name}
                    onChangeText = {text => setName(text)}
                    style = {styles.input}
                /> }
                <TextInput
                    placeholder = "Password"
                    value = {password}
                    onChangeText = {text => setPassword(text)}
                    style = {styles.input}
                    secureTextEntry
                />
                { isRegistering && <View>
                    <TextInput
                    placeholder = "Confirm Password"
                    value = {confirmPassword}
                    onChangeText = {text => setConfirmPassword(text)}
                    style = {styles.input}
                    secureTextEntry
                    />
                    <TextInput
                    placeholder = "Current Rating"
                    value = {rating}
                    onChangeText = {num => setRating(num)}
                    style = {styles.input}
                    />
                </View> }
            </View>
            
            <View style = {styles.buttonContainer}>
                 
                <TouchableOpacity
                        onPress = { () => {handleLogin()} }
                        style={styles.button} 
                    >
                    <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress = { () => {handleRegister()} }
                    style={[styles.button, styles.buttonOutline]} 
                >
                <Text style = {styles.buttonOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
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
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: 'blue',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'blue',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    buttonOutlineText: {
        color: 'blue',
        fontWeight: '700',
        fontSize: 16
    },
})