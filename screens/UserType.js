
import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import LoginScreen from './LoginScreen';



class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }



    render() {
        return (

            <View style={styles.UserType}>
                <View style={styles.headerContainer}>

                    <Text>Welcome Back!</Text>
                    <Text>LOG IN AS</Text>
                </View>


                {/* <View style={styles.buttonsContainer}> */}
                {/* <Button style={{fontWeight:"bold"}} title='Coach' onPress={() => this.props.navigation.navigate("Login", { name: "Coach" })} /> */}
                {/* <Button style={{fontWeight:"bold"}} title='Student' onPress={() => this.props.navigation.navigate("Login", { name: "Student" })} /> */}
                {/* </View> */}

                <View style={styles.UserTypeButtons}>

                    <TouchableOpacity style={[styles.CoachStudentButtons, {backgroundColor: "rgba(39,38,67,0.5)"}]} onPress={() => this.props.navigation.navigate("Login", { name: "Coach" })}>
                        <Text style={{ fontWeight: "bold" }}  > COACH</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.CoachStudentButtons} onPress={() => this.props.navigation.navigate("Login", { name: "Student" })} >
                        <Text style={{ fontWeight: "bold" }}  >STUDENT</Text>
                    </TouchableOpacity>


                </View>




                <View style={styles.noAccount}>
                    <Text>Don't have an account yet? </Text>
                    {/* Make sure it goes to register */}
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login", { name: "Student" })}>
                        <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>Sign up.</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    UserType: {
        width: '100%',
        height: '100%',
        backgroundColor: "#E3F6F5",

        display: 'flex',
        justifyContent: "space-evenly",
        alignItems: "center",
    },

    headerContainer: {
        height: 50,
        width: "100%",
        backgroundColor: 'tomato',



        // display: 'flex',
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
        // width: "100%",
        height: 20,


        display: "flex",
        flexDirection: "row",
        // alignItems: "center"
    }
})

export default UserType;
