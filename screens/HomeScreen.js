import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"


const db = firebase.firestore()

const HomeScreen = (props) => {
    const navigation = useNavigation()

    const [name, setName] = useState('')
    const currentEmail = auth.currentUser?.email

    // gets the document by the user's current email and sets name
    const getUserData = async () => {
        await db.collection('Users').doc(currentEmail).get().then(doc => {
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
    getUserData()

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    }

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
                        <TouchableOpacity onPress={() => props.navigation.navigate("TrainingPlan")}>
                            <HStack marginTop="15px" style={styles.studentBox} alignItems="center">
                                <AntDesign name="user" size={30} color="black" />
                                <Text style={{paddingLeft: 20, fontSize: 18, fontWeight: "400"}}>Leonardo Diaz</Text>
                            </HStack>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </NativeBaseProvider>
    )
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
