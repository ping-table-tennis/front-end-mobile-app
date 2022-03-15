import React, { Component } from 'react'
import {StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import startedImage from "../assets/images/get-started-group.png"

class Started extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onPressUserType = () => {
        this.props.navigation.navigate("UserType")
    }

    goToRegistration = () => {
        this.props.navigation.navigate("Registration")
    }

    render() {
        return (
            <View style={styles.Started}>
                <Image style={styles.ImageStarted} resizeMode="cover" source={startedImage}/>
                <View style={styles.ActionButtons}>
                    <TouchableOpacity style={[styles.StartedButton, {backgroundColor: "rgba(39,38,67,0.5)"}]} onPress={this.goToRegistration} >
                        <Text style={{fontWeight:"bold", fontSize: 18}}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Started: {
        height: "100%", 
        backgroundColor: "#E3F6F5"
    },
    ImageStarted: {
        width: "100%",
        position: "relative",
        top: -5
    },
    ActionButtons: {

        
        height: 150,
        marginTop: 100,
        fontSize: 50,

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    StartedButton: {
        backgroundColor: "white",
        width: 250,
        height: 55,

        display: "flex",
        justifyContent: "center",
        alignItems: "center", 
        borderRadius: 35
    
    }
})

export default Started;