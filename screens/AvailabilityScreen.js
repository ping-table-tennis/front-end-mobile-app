import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { Image, Alert, TextInput, StyleSheet, Text, ScrollView, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import * as Const from '../util/Constants'
import { Center } from 'native-base';


const db = firebase.firestore()

const AvailabilityScreen = () => {

    let navigate = useNavigation()
    const email = auth.currentUser?.email
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']


    // AM = false, PM = true
    const [values, setValues] = useState({
        mondayStart: '',
        mondayEnd: '',
        mondayToggleStart: false,
        mondayToggleEnd: false,
        tuesdayStart: '',
        tuesdayEnd: '',
        tuesdayToggleStart: false,
        tuesdayToggleEnd: false,
        wednesdayStart: '',
        wednesdayEnd: '',
        wednesdayToggleStart: false,
        wednesdayToggleEnd: false,
        thursdayStart: '',
        thursdayEnd: '',
        thursdayToggleStart: false,
        thursdayToggleEnd: false,
        fridayStart: '',
        fridayEnd: '',
        fridayToggleStart: false,
        fridayToggleEnd: false,
    });

    const handleChange = (key, value) => {
        setValues({
        ...values,
        [key]: value,
        });
    };

    useEffect(() => {
        loadAvailability()
    }, [])

    const parseAvailability = (key, data) => {
        let start = key + "Start", end = key + "End"
        let startData = data[start], endData = data[end]
        
        if (data[start] === 'N/A') {
            return {
                [start]: '',
                [key+"ToggleStart"]: false,
                [end]: '',
                [key+"ToggleEnd"]: false
            }
        } else {
            let startTime = startData.slice(0, startData.length - 2)
            let endTime = endData.slice(0, endData.length - 2)
            let toggleStart = startData.charAt(startData.length-2) === 'A' ? false : true
            let toggleEnd = endData.charAt(endData.length-2) === 'A' ? false : true

            return {
                [start]: startTime,
                [key+"ToggleStart"]: toggleStart,
                [end]: endTime,
                [key+"ToggleEnd"]: toggleEnd
            }
        }
    }

    const concatObjects = (...sources) => {
        const target = {}
        sources.forEach(el => {
           Object.keys(el).forEach(key => {
              target[key] = el[key]
           })
        })
        return target;
     }

    const loadAvailability = async () => {
            await db.collection('Availability').doc(email).get().then(doc => {
                if (doc.exists) {
                    let data = doc.data()
                    let obj1 = parseAvailability(days[0],data), obj2 = parseAvailability(days[1],data),
                        obj3 = parseAvailability(days[2],data), obj4 = parseAvailability(days[3],data), obj5 = parseAvailability(days[4],data)
                    setValues(concatObjects(obj1, obj2, obj3, obj4, obj5))
                } else {
                    return
                }
            })
    }

    const parseToggle = (mode) => {
        return mode === false ? 'AM' : 'PM'
    }

    const checkValidTime = (time) => {
        return /^((1[012]|[1-9]):[0-5][0-9])?$/.test(time) || time === '';
    }

    const checkValidEntry = () => {
        for (let property in values) {
            if (Object.prototype.hasOwnProperty.call(values, property)) {
                let value = values[property]
                if (typeof value === 'string' && !checkValidTime(value)) {
                    return false
                }
            }
        }
        return true
    }

    const submitForm = () => {
        if (!checkValidEntry()) {
            Alert.alert(
                "Invalid entry",
                "Please make sure that you are entering a valid time.",
                [
                  { text: Const.ALERT_CANCEL, style: "cancel"}
                ]
            )
            return
        } else {
            createEntry()
            navigate.goBack(null)
            console.log("valid submission")
        }
    }

    const handleToggle = (key) => {
        let mode = values[key]
        handleChange(key, !mode)
    }

    const createEntry = async () => {
        let dataArr = []
        for (let i = 0; i < days.length; i++) {
            values[days[i] + 'Start'] === '' ? dataArr.push('N/A') : 
                dataArr.push(values[days[i] + 'Start'] + parseToggle(values[days[i] + 'ToggleStart']))
            
            values[days[i] + 'End'] === '' ? dataArr.push('N/A') : 
                dataArr.push(values[days[i] + 'End'] + parseToggle(values[days[i] + 'ToggleEnd']))
        }

        let data = {
            mondayStart: dataArr[0],
            mondayEnd: dataArr[1],
            tuesdayStart: dataArr[2],
            tuesdayEnd: dataArr[3],
            wednesdayStart: dataArr[4],
            wednesdayEnd: dataArr[5],
            thursdayStart: dataArr[6],
            thursdayEnd: dataArr[7],
            fridayStart: dataArr[8],
            fridayEnd: dataArr[9],
        }
        const res = await db.collection('Availability').doc(email).set(data)
    }


    const renderInput = (key) => {
        let title = key.charAt(0).toUpperCase() + key.slice(1)
        return (<View style={styles.inputContainer}>
                        <Text style={styles.text}> {title} </Text>
                        <View style={styles.row}>
                            <Text> Start </Text>
                            <TextInput
                                placeholder = "HH:MM"
                                value = {values[key+"Start"]}
                                onChangeText = {text => handleChange(key + 'Start', text)}
                                style = {styles.input}
                            />
                            <TouchableOpacity onPress = {() => handleToggle(key+"ToggleStart")} style = {styles.toggle}> 
                                <Text style={styles.toggleText}>{values[key+"ToggleStart"] ? "PM" : "AM"}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.row}>
                            <Text> End </Text>
                            <TextInput
                                placeholder = "HH:MM"
                                value = {values[key+"End"]}
                                onChangeText = {text => handleChange(key + 'End', text)}
                                style = {styles.input}
                            />
                            <TouchableOpacity onPress = {() => handleToggle(key+"ToggleEnd")} style = {styles.toggle}> 
                                <Text style={styles.toggleText}>{values[key+"ToggleEnd"] ? "PM" : "AM"}</Text>
                            </TouchableOpacity>
                        </View>
                </View>)
    }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior= {Platform.OS === "ios" ? "padding" : "height"} 
        >       
                <Text> Leave a Day Blank if You are Not Available</Text>
                <ScrollView showsVerticalScrollIndicator = {false} style = {styles.scrollview}>
                    {renderInput("monday")}
                    {renderInput("tuesday")}
                    {renderInput("wednesday")}
                    {renderInput("thursday")} 
                    {renderInput("friday")}                   
                    <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style = {styles.confirm} onPress={() => {submitForm()}}> 
                            <Text style = {styles.confirmText}> Confirm </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default AvailabilityScreen

const styles = StyleSheet.create({
    confirm: {
        alignItems: 'center',
        backgroundColor: 'blue',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    confirmText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    inputContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 5,
        marginBottom: 5,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
    },
    text: {
        textAlign:'center', 
        fontSize: 16,
        marginBottom: 10
    },
    container: {
        width: '100%',
        marginTop: 20,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollview: {
        width: '80%',
    },
    cardContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 5,
        width: 320,
        height: 460,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardOutline: {
        backgroundColor: "black",
        width: 320,
        height: 30,
        position: 'absolute',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    input: {
        width: 75,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.7,
        borderRadius: 2,
        borderColor: 'black', 
        textAlign: 'center',
    },
    toggleText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'blue'
    },
    toggle: {
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'white',
        width: 40,
        height: 25,
    },
})