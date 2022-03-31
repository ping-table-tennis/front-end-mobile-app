import { useNavigation } from '@react-navigation/core'
import React, {useState, useEffect} from 'react'
import { Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import { LogBox } from 'react-native';
import * as Const from '../util/Constants';

// ignores an error that results from using firebase with Expo
LogBox.ignoreLogs(['Setting a timer for a long period of time'])

const db = firebase.firestore()

const RegistrationScreen = () => {
    // by default the form shows the fields for login, bool is a toggle to show register fields
    const [isRegistering, setRegistering] = useState(false) 
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [name, setName] = useState('')
    const [rating, setRating] = useState('')
    const [role, setRole] = useState(null)

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
            friends: [],
            requests: [],
            isStudent: role
        }).then(() => console.log("User (" + email + ") created successfully."))
        .catch(err => {
            console.log(err)
        })

        db.collection('Matches').doc(email).set({      
        }).then(() =>  console.log("Document successfully written for Matches collection!"))
        .catch((err) =>  console.error("Error writing document for Tasks collection!: ", err))

        db.collection('General Plans').doc(email).set({      
        }).then(() =>  console.log("Document successfully written for General Plans collection!"))
        .catch((err) =>  console.error("Error writing document for Tasks collection!: ", err))

        db.collection('Daily Plans').doc(email).set({      
        }).then(() =>  console.log("Document successfully written for Daily Plans collection!"))
        .catch((err) =>  console.error("Error writing document for Tasks collection!: ", err))
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
                    Alert.alert(Const.REG_FAILED_TITLE, Const.REG_FAILED_EMAIL))
            } else
                Alert.alert(Const.REG_FAILED_TITLE, Const.REG_FAILED_INFO)
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
                Alert.alert(Const.LOG_FAILED_TITLE, Const.LOG_FAILED_EMAIL))  
        } else {
            setRegistering(!isRegistering)
        }
    }  

    const setResultTextStyle = (mode) => {
        return {
            color: role === mode ? "white" : "blue",
            fontWeight: '700',
            fontSize: 14
        }
    }

    const setResultButtonStyle = (mode) => {
        return {
            backgroundColor: role === mode ? 'blue' : "white",
            borderColor: "blue",
            borderWidth:1,
            width: '50%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5
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


                    <View style = {styles.resultsRow}>
                        {/* WIN */}
                        <TouchableOpacity style={setResultButtonStyle(true)} 
                            onPress = { () => {setRole(true)} }>
                            <Text style={setResultTextStyle(true)}> STUDENT </Text>
                        </TouchableOpacity>

                        {/* LOSE */}
                        <TouchableOpacity style={setResultButtonStyle(false)} 
                            onPress = { () => {setRole(false)} }>
                            <Text 
                                style={setResultTextStyle(false)}> COACH </Text>
                        </TouchableOpacity>
                    </View>
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

export default RegistrationScreen

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
    resultsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
})