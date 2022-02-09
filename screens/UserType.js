
import React, { useState, Component } from 'react'
import {StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native' 
import LoginScreen from './LoginScreen';



class UserType extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }



    render() {
        return (
            <View>
                <Button title='Coach' onPress={()=> this.props.navigation.navigate("Login", {name: "Coach"})}/>
                <Button title='Student' onPress={()=> this.props.navigation.navigate("Login", {name: "Student"})}/>

                <View style={styles.noAccount}>
                    <Text>Don't have an account yet? </Text>
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login", {name: "Student"})}>
                        <Text style={{fontWeight: "bold", textDecorationLine: "underline"}}>Sign up.</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
} 

const styles = StyleSheet.create({
    noAccount: {
        // width: "100%",
        height: 20,
        display: "flex",
        flexDirection: "row",
        // alignItems: "center"
    }
})

export default UserType;
