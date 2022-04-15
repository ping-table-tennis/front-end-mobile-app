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

    const removeNotification = async (key) => {
        notifications.splice(key, 1)

        await db.collection('Users').doc(currentEmail).update({notifications: notifications})
        .catch(err => {
            console.log(err)
        })
        updateNotifications()
    }

    useFocusEffect(
        React.useCallback(() => {
            currentEmail = auth.currentUser?.email
            updateNotifications()
            return () => {}
        }, [])
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => removeNotification(item.key)} style={styles.itemBackground}>
            <View>
                <Text style={styles.content}>{item.content}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            { notifications.length != 0 ? <View></View> :
            <View style={styles.textContainer}>
                  <Text style = {styles.text}> No Notifications</Text>
            </View>
            }
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
    textContainer: {
        alignItems: 'center',
        marginTop: '80%'
    },
    container: {
        alignItems: 'center',
    },
    itemBackground: {
        width: 350,
        height: 80,
        padding: 17,  
        marginVertical: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
    },
    content: {
        fontSize: 15,
        textAlign: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: 'bold'
    },
})