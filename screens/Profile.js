import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import { NativeBaseProvider, HStack, VStack } from 'native-base'
import moment from "moment"
import { Entypo, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <NativeBaseProvider>
                <VStack style={styles.Profile}>
                    <View style={styles.userPhoto}>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                        />
                    </View>
                    <HStack style={styles.textContainer}>

                        <AntDesign name="user" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Name</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialCommunityIcons name="email-edit-outline" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Email</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <AntDesign name="staro" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Rating</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialIcons name="sports-tennis" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Style</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>

                        <MaterialCommunityIcons name="home-roof" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Home Club</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialIcons name="attach-money" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Lesson Rate</Text>
                    </HStack>






                </VStack>
            </NativeBaseProvider>
        );
    }
}

export default Profile;



const styles = StyleSheet.create({
    Profile: {
        flex: 1,
        width: "100%",
        height: "100%",

        // backgroundColor: "tomato",
        paddingTop: 50,

        display: "flex",
        alignItems: "center",

    },
    userPhoto: {
        width: "50%",
        height: 200,
        borderRadius: 40,
        backgroundColor: "white",
    },

    textContainer: {
        paddingTop: 40,
    },
    tinyLogo: {
        width: 50,
        height: 50,
      },

})