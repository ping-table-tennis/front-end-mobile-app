import React, { useState, Component } from 'react'
import {View, Text} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { firebase, auth } from '../firebase'

class TrainingScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {  }
    }

    /*
    isUserLogedIn = async ()  => {
        console.log("i am in this screen\n")
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
        auth.signOut().then(() => {
            navigation.replace("Registration")
        }).catch(error => alert(error.message))
    } 

    componentDidMount() {
        //this.handleSignOut()
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight:'bold'}}> Training Screen </Text>
            </View>
            
        )
    }
}

export default TrainingScreen;