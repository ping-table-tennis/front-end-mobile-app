import { useNavigation } from '@react-navigation/core'
import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"

import AsyncStorage from '@react-native-async-storage/async-storage';
const db = firebase.firestore()

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            currentEmail: auth.currentUser?.email
        }
    }

    /*
    getUserData = async () => {
        await db.collection('Users').doc(this.state.currentEmail).get().then(doc => {
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

    /*
    handleSignOut =  () => {
        // props.navigation.navigate("Training")
        auth.signOut().then( async (res) => {
            await AsyncStorage.removeItem("user")
            this.props.navigation.navigate("Start")
        }).catch(error => console.log(error))
    }

    isUserLogedIn = async ()  => {
        await AsyncStorage.getItem("user").then((res) => {
            if (res == null) {
                console.log(res === null, res)
                this.props.navigation.navigate("Registration", { name: "Student", toRegister: false })
            } else {
                this.props.navigation.navigate("Training")
            }
        })
    }
    */

    handleSignOut = () => {
        console.log("Signing out of", auth.currentUser?.email)
        auth.signOut().then(() => {
            this.props.navigation.navigate("Registration")
        }).catch(error => alert(error.message))
    } 
    
    componentDidMount() {
        //this.isUserLogedIn()
        //this.getUserData()
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.HomeScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <Feather name="menu" size={30} color="black" />
                        <Feather name="more-vertical" size={30} color="black" />
                    </HStack>
                    <Text style={styles.studentTitle}>Students</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {[0,2].map(() => (
                            <TouchableOpacity onPress={() => this.props.navigation.navigate("TrainingPlan")}>
                                <HStack marginTop="15px" style={styles.studentBox} alignItems="center">
                                    <AntDesign name="user" size={30} color="black" />
                                    <Text style={{paddingLeft: 20, fontSize: 18, fontWeight: "400"}}>Leonardo Diaz</Text>
                                </HStack>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Button title="LOGOUT" onPress={this.handleSignOut}/>
                </View>
            </NativeBaseProvider>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    HomeScreen: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E3F6F5",
    },
    studentTitle: {
        fontSize: 32, 
        textAlign: "center", 
        paddingTop: 15, 
        fontWeight: "bold"
    },
    studentBox: {
        width: "100%", 
        height: 100, 
        backgroundColor:"white",
        borderRadius: 20,
        padding: 25    },
})
