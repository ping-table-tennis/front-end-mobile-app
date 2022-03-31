import { useNavigation } from '@react-navigation/core'
import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack, Popover, VStack, Divider, Button } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"

import { MenuProvider } from 'react-native-popup-menu';

// import {
//     Menu,
//     MenuOptions,
//     MenuOption,
//     MenuTrigger,
// } from 'react-native-popup-menu';


import AsyncStorage from '@react-native-async-storage/async-storage';
const db = firebase.firestore()

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            currentEmail: auth.currentUser?.email,
            editOptions: [
                "Add",
                "Edit",
                "Remove",
            ]
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

    handleSignOut = () => {
    /*
    handleSignOut =  () => {
        // props.navigation.navigate("Training")
        auth.signOut().then(async (res) => {
            await AsyncStorage.removeItem("user")
            this.props.navigation.navigate("Start")
        }).catch(error => console.log(error))
    }

    isUserLogedIn = async () => {
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

    PopOver = () => {
        return (
            <VStack>
                <Popover placement='left' trigger={triggerProps => (
                    <TouchableOpacity {...triggerProps}>
                        <Feather name="more-vertical" size={30} color="black" />
                    </TouchableOpacity>
                )}>
                    <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                        <Popover.Arrow />
                        <Popover.Header>{""}</Popover.Header>
                        <Popover.CloseButton style={{ height: 50, paddingTop: 20, position: "relative", top: -5 }} />
                        <Popover.Body>
                            <VStack>
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Add Student</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Edit Student</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Delete Student</Text>
                                </TouchableOpacity>
                                {/* <Divider/> */}
                            </VStack>
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </VStack>
        )
    }


    handleSignOut = () => {
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
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Feather name="menu" size={30} color="black" />
                        </TouchableOpacity>
                        <HStack>
                            <TouchableOpacity>
                                <AntDesign name="pluscircleo" size={30} color="black" />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    <Text style={styles.studentTitle}>Students</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {[0, 2].map(() => (
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate("TrainingPlan")}>
                                <HStack marginTop="15px" style={styles.studentBox} alignItems="center">
                                    <VStack width={"100%"} space={5}>
                                        <HStack justifyContent={"flex-end"}>
                                            <Popover placement='left' trigger={triggerProps => (
                                                <TouchableOpacity {...triggerProps}>
                                                    <Feather name="more-vertical" size={25} color="black" />
                                                </TouchableOpacity>
                                            )}>
                                                <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                                                    <Popover.Arrow />
                                                    <Popover.Header>{""}</Popover.Header>
                                                    <Popover.CloseButton style={{ height: 50, paddingTop: 20, position: "relative", top: -5 }} />
                                                    <Popover.Body>
                                                        <VStack>
                                                            <Divider />
                                                            <TouchableOpacity style={styles.EditOption}>
                                                                <Text>Edit Student</Text>
                                                            </TouchableOpacity>
                                                            <Divider />
                                                            <TouchableOpacity style={styles.EditOption}>
                                                                <Text>Delete Student</Text>
                                                            </TouchableOpacity>
                                                            {/* <Divider/> */}
                                                        </VStack>
                                                    </Popover.Body>
                                                </Popover.Content>
                                            </Popover>
                                        </HStack>
                                        <HStack style={{position: "relative", top: -20}} >
                                            <AntDesign name="user" size={30} color="black" />
                                            <Text style={{ paddingLeft: 20, fontSize: 18, fontWeight: "400" }}>Leonardo Diaz</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={this.handleSignOut}>
                        <Text style={{color: "blue"}}>LOGOUT</Text>
                    </TouchableOpacity>
                    
                </View>
            </NativeBaseProvider>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    EditOption: {
        height: 50,

        display: "flex",
        justifyContent: "center"
    },
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
        height: 130,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25
    },

    input: {
        height: 45,
        // backgroundColor: "rgba(216,216,216, 0.51)",
        paddingHorizontal: 15,
        borderRadius: 25,
        marginTop: 25,
        borderWidth: 0.5,
        borderColor: "rgba(151,151,151, 0.51)",
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
})
