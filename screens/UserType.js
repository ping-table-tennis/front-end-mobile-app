
import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import LoginScreen from './LoginScreen';
import { NativeBaseProvider, HStack, VStack } from 'native-base'



class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.UserType}>
                    <VStack alignItems="center">
                        <View style={[styles.headerContainer, {marginTop: 15}]}>
                            <Text style={{fontSize: 20}}>Welcome Back!</Text>
                            {/* <Text>LOG IN AS</Text> */}
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={{fontSize: 20}}>LOG IN AS</Text>
                        </View>
                        <View style={[styles.UserTypeButtons, {marginTop: 30}]}>
                            <TouchableOpacity style={[styles.CoachStudentButtons, {backgroundColor: "rgba(39,38,67,0.5)"}]} onPress={() => this.props.navigation.navigate("Login", { name: "Coach" })}>
                                <Text style={{ fontSize: 20 }}  > COACH</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.CoachStudentButtons, {marginTop: 15}]} onPress={() => this.props.navigation.navigate("Login", { name: "Student" })} >
                                <Text style={{ fontSize: 20 }}  >STUDENT</Text>
                            </TouchableOpacity>
                        </View>
                    </VStack>
                    <View style={[styles.noAccount]}>
                        <Text style={{fontSize: 16}}>Don't have an account yet? </Text>
                        {/* Make sure it goes to register */}
                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Login", { name: "Student", toRegister: true })}>
                            <Text style={{ fontWeight: "bold", textDecorationLine: "underline", fontSize: 16 }}>Sign Up.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </NativeBaseProvider>

        )
    }
}

const styles = StyleSheet.create({

    UserType: {
        width: '100%',
        height: '100%',
        backgroundColor: "#E3F6F5",

        display: 'flex',
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerContainer: {
        height: 80,
        width: "100%",

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    UserTypeButtons: {
        // backgroundColor:"tomato",
        height: 150,
        width: '100%',
        fontSize: 30,

        display:'flex',
        justifyContent: "space-evenly",
        alignItems: 'center',
    },

    CoachStudentButtons:{
        backgroundColor: "white",
        width: 250,
        height: 50,
    

        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        borderRadius: 35

    },

    noAccount: {
        height: 200,
        display: "flex",
        flexDirection: "row",
    }
})

export default UserType;
