import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'
import { Agenda, AgendaList, CalendarListProps, AgendaEntry, AgendaProps, AgendaSchedule } from 'react-native-calendars'
import { useNavigation} from '@react-navigation/core'
import { auth, firebase } from '../firebase'
const db = firebase.firestore();
const emptyArr = [];

class AgendaScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentEmail: auth.currentUser?.email,
            events: {},
            todaystr: "",
            mark: {},
            currentEvents: {"2022-05-18": ""},
            newEventName: ""
         }
    }

    async showEvents(){
        let formattedDates = {};
        let marker = {};

        await db.collection('CalendarEvents').doc(this.state.currentEmail).get().then(doc => {
            if (doc.exists) {  
                let unformattedDates = doc.get("dates");
                let eventNames = doc.get("eventNames");
                const len = eventNames.length

                for(let i = 0; i < len; i++){
                    const d = unformattedDates[i].toDate().toISOString().substring(0,10);
                    formattedDates[d] = [{name: eventNames[i]}];
                    marker[d] = {
                        mark: true
                    };
                }
            }
        }).catch(err => {
            console.log(err)
        })

        let day = new Date()
        this.setState({ todaystr: day.toISOString().substring(0,10) })
        this.setState({ events: formattedDates })
        this.setState({ mark: marker })
    }

    async submitEvent(){
        const t = this.state.newEventTime;
        const d = this.state.newEventDay;
        const n = this.state.newEventName;

        const tValid = /^((1[012]|[1-9]):[0-5][0-9])?$/.test(t);
        const dValid = /^\d{4}-\d{2}-\d{2}$/.test(d)

        if (tValid && dValid) {
            Alert.alert(
                "Invalid entry",
                "Please make sure that you are entering a valid time and date.",
                [
                  { text: Const.ALERT_CANCEL, style: "cancel"}
                ]
            )
            return
        }

        const dstring = d + 'T' + t + ':00';
        const dobj = new Date(dstring);
        const timestamp = firebase.firestore.Timestamp.fromDate(dobj);
        let data = {};

        await db.collection('CalendarEvents').doc(this.state.currentEmail).get().then(doc => {
            let dates = []
            let names = []
            if (doc.exists) {   
                dates = doc.get("dates");
                names = doc.get("eventNames");
            }
            dates.push(timestamp);
            names.push(n);
            data = {
                dates: dates,
                eventNames: names
            };
        }).catch(err => {
            console.log(err)
        })

        await db.collection('CalendarEvents').doc(this.state.currentEmail).set(data);

        this.showEvents();
    }

    ListItems() {
        return (
        <View style={styles.row}>
            <Text>List Item</Text>
        </View>);}

    AddItem() {
        return (
        <View style={styles.rowCenter}>
            <Text>Enter task to add to list</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({ newEventName: text})}></TextInput>
            <Button title="Submit" onPress={()=>this.submitEvent()}></Button>
        </View>);}


        

    render() {
        return (
            <View style={styles.centeredView}>
                <Text style={styles.titleText}>Today's Events</Text>
                {/*
                <this.ListItems></this.ListItems>
                <this.AddItem></this.AddItem> */
                }
            </View>
        );
    }
}

export default AgendaScreen

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        position: 'relative',
        margin: 10,
        width: 300,
        height: 400,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    titleText: {
        fontSize: 20,
        color: "black",
        textAlign: "center"
    },
    textStyle: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center"
    },
    // stuff for input in Vivi modal
    inputContainer: {
        width: 250,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: 1,
        marginBottom: 1,
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        width: 100,
        height: 40,
        marginLeft: 5,
        marginRight: 5,
        borderWidth: 0.7,
        borderRadius: 2,
        borderColor: 'black', 
        textAlign: 'center',
    },
   row: {
        flexDirection: 'row',
        justifyContent: 'left',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        width: 150,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        width: 150,
    }
})