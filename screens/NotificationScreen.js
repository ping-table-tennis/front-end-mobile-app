import { useFocusEffect } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, FlatList, View, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
const db = firebase.firestore()

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([])
    let currentEmail = auth.currentUser?.email
    
    const updateNotifications = async () => {
        db.collection('Users').doc(currentEmail).get().then(doc => {
            if (doc.exists) {
                setNotifications(doc.data().notifications)  
            }
        }).catch(e => {
            console.log(e)
        })
    }

    const getNoficationsData = () => {
        let data = []
        for (let i = 0; i < notifications.length; i++) {
            let entry = {
                key: i,
                content: notifications[i]
            }
            data.push(entry)
        }
        return data
    }

    useFocusEffect(
        React.useCallback(() => {
            currentEmail = auth.currentUser?.email
            updateNotifications()
            return () => {}
        }, [])
    );

    const renderItem = ({ item }) => (
        <View style={styles.itemBackground}>
            <View style={styles.center}>
                <Text style={styles.title}>{item.content}</Text>
            </View>
        </View>
    );

    return (
        <View>
            <FlatList 
                data={getNoficationsData()}
                renderItem={renderItem}
                keyExtractor={item => item.key}
            />
        </View>
    )
}

export default NotificationScreen;

const styles = StyleSheet.create({
    itemBackground: {
        width: 350,
        height: 80,
        padding: 17,  
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
    },
})