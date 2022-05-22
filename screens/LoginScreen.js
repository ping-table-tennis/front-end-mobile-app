import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect, Component } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

import SelectDropdown from 'react-native-select-dropdown'


import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { firebase, auth } from "../firebase";
import { LogBox } from "react-native";
import { NativeBaseProvider, HStack, VStack } from "native-base";

// ignores an error that results from using firebase with Expo
LogBox.ignoreLogs(["Setting a timer for a long period of time"]);

const db = firebase.firestore();
class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRegistering: false,
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            rating: "",
            param: "",
            type: "",
            usertype: [
                "Coach",
                "Student",
            ]

        };
    }

    handleOnChange = (input, value) => {
        this.setState({
            [input]: value
        })
    }

    handleLogin = () => {
        const { email, password } = this.state
        if (!this.state.isRegistering) {
            auth.signInWithEmailAndPassword(email.toLowerCase(), password)
                .then(async credentials => {
                    this.props.navigation.navigate("Training")
                    const user = credentials.user
                    console.log('Logged in as: ', user.uid)
                    // await AsyncStorage.setItem("user", user.uid)
                }).catch(error =>
                    Alert.alert("Login Failed", "Please check that your email and password are correct.", error))
        } else {
            this.setState({
                isRegistering: !this.state.isRegistering
            })
        }
    }

    isRegistrationValid = () => {
        const { email, password, confirmPassword, name, rating } = this.state;
        return (
            password === confirmPassword &&
            email &&
            name &&
            Number.isInteger(parseInt(rating))
        );
    };

    createUser = async () => {
        const { email, name, rating, password, type } = this.state;
        auth.createUserWithEmailAndPassword(email, password).then(async (credentials) => {
            console.log("User (" + email + ") created successfully.")
            await db.collection("Users").doc(email).set({
                email: email,
                name: name,
                rating: parseInt(rating),
                friends: [],
                requests: [],
                notifications: [],
                homeClub: "",
                style: "",
                image: "",
                isStudent: type === 0 ? false : true
            }).then(async (res) => {
                const { email, password } = this.state
                const { user } = credentials
                console.log('Logged in as: ', user.uid)

                auth.signInWithEmailAndPassword(email.toLowerCase(), password).then(async () => {
                    await AsyncStorage.setItem("user", user.uid)

                }).catch(error => {
                    Alert.alert("Login Failed", "Please check that your email and password are correct.", error)
                })
                this.props.navigation.navigate("Training")
            })
        }).catch(error => {
            console.log(error.toString());
            // Alert.alert("Login Failed", "Please check that your email and password are correct.", error)
        })
    }

    handleRegister = () => {
        const { email, password, rating, name, type } = this.state;
        console.log(this.state)

        if (this.state.isRegistering) {
            //     console.log(Number.isInteger(parseInt(rating)));
            if (this.isRegistrationValid()) {
                auth.createUserWithEmailAndPassword(email, password).then(async (credentials) => {
                    let data = {}
                    data['email'] = email
                    data['full_name'] = name
                    data['rating'] = rating
                    auth.collection('Users').doc(credentials.user.id).set(data).then(() => {
                        auth.signInWithEmailAndPassword(email.toLowerCase(), password).then(async credentials => {
                            const user = credentials.user
                            console.log('Logged in as: ', user.uid)
                            await AsyncStorage.setItem("Users", user.uid).then(async () => {
                                this.props.navigation.navigate("Training")
                            })
                        }).catch(error => {
                            Alert.alert("Login Failed", "Please check that your email and password are correct.", error)
                        })
                    })
                }).catch((error) =>
                    Alert.alert(
                        "Registration Failed",
                        "Please check that your email is correct."
                    )
                );
            } else
                Alert.alert(
                    "Registration Failed",
                    "Please check that your information is valid."
                );
        } else {
            this.setState({
                isRegistering: !this.state.isRegistering,
            });
        }
    };


    backendConnection = () => {

    }


    unsub = auth.onAuthStateChanged((user) => {
        if (user) {
            navigation.replace("Home");
        }
    });

    componentDidMount() {
        this.unsub();
        console.log(this.props.route.params.toRegister);
        if (this.props.route.params.toRegister) {
            this.setState({
                isRegistering: true,
            });
        }
    }

    render() {

        const { email, password, confirmPassword, name, param, rating } =
            this.state;
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={styles.headerContainer}>
                    <Text style={{ fontSize: 24 }}>Hi {param} {"Coach!"}{" "}
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Email"
                        onChangeText={(text) => this.handleOnChange("email", text)}
                        style={styles.input}
                    />
                    {this.state.isRegistering && (
                        <TextInput
                            placeholder="Full Name"
                            onChangeText={(text) => this.handleOnChange("name", text)}
                            style={styles.input}
                        />
                    )}
                    <TextInput
                        placeholder="Password"
                        onChangeText={(text) => this.handleOnChange("password", text)}
                        style={styles.input}
                        secureTextEntry
                    />
                    {this.state.isRegistering && (
                        <View>
                            <TextInput
                                placeholder="Confirm Password"
                                onChangeText={(text) => this.handleOnChange("confirmPassword", text)}
                                style={styles.input}
                                secureTextEntry
                            />
                            <TextInput
                                placeholder="Current Rating"
                                onChangeText={(num) => this.handleOnChange("rating", num)}
                                style={styles.input}
                            />
                            <SelectDropdown
                                buttonTextStyle={{ color: "rgba(000,000,000,0.5)" }}
                                buttonStyle={[styles.input]}
                                defaultButtonText="Select User Type"
                                data={this.state.usertype}
                                onSelect={(selectedItem, index) => {
                                    this.setState({
                                        type: index
                                    })
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            />

                        </View>
                    )}
                    {!this.state.isRegistering ? <Text
                        style={{
                            width: "100%",
                            textAlign: "center",
                            marginTop: 15,
                            fontSize: 13,
                            fontWeight: "600",
                        }}
                    >
                        Forgot your password?
                    </Text> : null}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this.state.isRegistering ? this.createUser : this.handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>{this.state.isRegistering ? "Sign Up" : "Login"}</Text>
                    </TouchableOpacity>
                </View>
                <NativeBaseProvider>
                    <HStack marginTop={20}>
                        <Text style={{ fontSize: 16 }}>{this.state.isRegistering ? "Already have an account? " : "Don't have an account yet? "}</Text>
                        <TouchableOpacity onPress={() => this.setState({ isRegistering: !this.state.isRegistering })}>
                            <Text style={styles.SignUpText}>{this.state.isRegistering ? "Login" : "Sign Up."}</Text>
                        </TouchableOpacity>
                    </HStack>
                </NativeBaseProvider>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    SignUpText: {
        fontWeight: "bold",
        textDecorationLine: "underline",
        fontSize: 16,
    },
    container: {
        // justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        backgroundColor: "#E3F6F5",
    },
    headerContainer: {
        width: "100%",
        height: 250,
        paddingTop: 10,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    inputContainer: {
        width: "100%",
        height: 200,
        padding: 20,
        justifyContent: "center",
    },
    input: {
        height: 45,
        backgroundColor: "rgba(216,216,216, 0.51)",
        paddingHorizontal: 15,
        borderRadius: 25,
        marginTop: 25,
        borderWidth: 0.5,
        borderColor: "rgba(151,151,151, 0.51)",
    },
    buttonContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 150,
    },
    button: {
        width: 200,
        height: 45,
        backgroundColor: "rgba(39,38,67, 0.5)",
        borderRadius: 30,

        alignItems: "center",
        justifyContent: "center",
    },
    buttonOutline: {
        backgroundColor: "blue",
        marginTop: 5,
        borderColor: "#272643",
        borderWidth: 2,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutlineText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },

    headerMessage: {
        backgroundColor: "green",
    },
});

export default LoginScreen;
