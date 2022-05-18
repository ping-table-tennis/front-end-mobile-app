import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, FlatList, Alert, TouchableOpacity, Image, Modal, Pressable } from 'react-native'
import { useNavigation} from '@react-navigation/core'
import { auth, firebase } from '../firebase'
import deleteImg from '../assets/icons/delete.png'
import fab from '../assets/images/fab.png'
import * as Const from '../util/Constants'
const db = firebase.firestore();
const emptyArr = [];

class AgendaScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentEmail: auth.currentUser?.email,
            events: [],
            eventModal: false,
            newEventName: "",
            newEventDay: "",
            newEventTime: ""
         }
    }

    componentDidMount(){
        this.getEvents();
    }

    currentDayStr(){
        const dstring = this.props.route.params.dayPressed + 'T' + '00:00';
        const dobj = new Date(dstring);
        return dobj.toString().substring(0,16)
    }

    async getEvents(){
        await db.collection('CalendarEvents').doc(this.state.currentEmail).get().then(doc => {
            if (doc.exists) {  
                this.setState({events: doc.data().dates})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    showEventModal = (visible) => {
        this.setState({ eventModal: visible });
    }

    displayEventModalContent = () => {
        return (
          <View style={styles.inputContainer}>
                <View style={styles.row}>
                  <Text> Time </Text>
                    <TextInput
                        placeholder = "HH:MM"
                        style = {styles.input}
                        placeholderTextColor={'grey'}
                        onChangeText={text => this.setState({newEventTime : text})}
                    />
                </View>
                <View style={styles.row}>
                    <Text>Event Name</Text>
                    <TextInput 
                        placeholder='Event Name' 
                        style={styles.input}
                        placeholderTextColor={'grey'}
                        onChangeText={text => this.setState({newEventName : text})}
                    />
                </View>
                <View style={styles.row}>
                    
                </View>
          </View>
        );
    }

    eventArr(){
        let arr = [];
        let keyval = 0;
        let eventsmap = this.state.events
        if(eventsmap !== undefined){
            eventsmap.forEach((item) => {
                if(item.date == this.props.route.params.dayPressed){
                    arr.push({
                        time: item.time,
                        name: item.name,
                        key: keyval
                    })
                    keyval++;
                }
            })
        }
        return arr;
    }

    async submitEvent(){
        const t = this.state.newEventTime;
        const d = this.props.route.params.dayPressed;
        const n = this.state.newEventName;

        const tValid =  /^((1[012]|[1-9]):[0-5][0-9])?$/.test(t);
        if (tValid) {
            Alert.alert(
                "Invalid entry",
                "Please make sure that you are entering a valid time.",
                [{ text: Const.ALERT_CANCEL, style: "cancel"} ]
            )
            return
        }

        let data = {};
        let newEvent = {
            date: d,
            name: n,
            time: t
        }
        await db.collection('CalendarEvents').doc(this.state.currentEmail).get().then(doc => {
            let dates = []
            if (doc.exists) {   
                dates = doc.get("dates");
            }
            dates.push(newEvent);
            data = {
                dates: dates,
            };
        }).catch(err => {
            console.log(err)
        })

        await db.collection('CalendarEvents').doc(this.state.currentEmail).set(data);
        this.showEventModal(!this.state.eventModal)
        this.getEvents();
    }


    //TODO: this doesnt have anything
    deleteEvent(){
        
    }

    //TODO: this doesnt work
    showDeleteAlert(index){
        return(
            Alert.alert(
            "Delete Event",
            "Are you sure that you want to delete this event? This cannot be undone.",
            [
              { text: Const.ALERT_CANCEL, style: "cancel"},
              { text: Const.ALERT_YES, onPress: () => this.deleteEvent(index) }
            ]
            )
        );
    }

    renderItem({item}){
        return(
        <View style={styles.row}>
            <Text style={styles.text}>{item.time}</Text>
            <Text Style={styles.text}>{item.name}</Text>
            <TouchableOpacity
                style={styles.deleteButtonBackground}
                onPress={() => this.showDeleteAlert(item.key)}>
                <Image alt='' source = {deleteImg} style = {styles.deleteButtonImage}></Image>
            </TouchableOpacity>
        </View>
        );
    }

    flatListItemSeparator(){
        return (
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "black",
            }}
          />
        );
    }


        

    render() {
        return (
            <View style={styles.centeredView}>
                <FlatList 
                    ListHeaderComponent={<Text style={styles.titleText}>{this.currentDayStr()}</Text>}
                    data={this.eventArr()}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent = {this.flatListItemSeparator}
                />
                <View>
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.eventModal}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.eventModal);
                    }}>
                        <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.titleText}> Add Event</Text>
                                    {this.displayEventModalContent()}
                                    <Pressable
                                        style={[styles.button, styles.buttonBack]}
                                        onPress={() => this.showEventModal(!this.state.eventModal)}>
                                        <Text style={styles.textStyle}>Close</Text>
                                    </Pressable>
                                    <Pressable
                                        style={[styles.submitButton, styles.buttonBack]}
                                        onPress={() => this.submitEvent()}>
                                        <Text style={styles.textStyle}>Submit</Text>
                                    </Pressable>
                                </View>
                            </View>
                    </Modal>
                </View>
                <TouchableOpacity 
                    style = {styles.touchableOpacityStyle} 
                    onPress = {() => this.showEventModal(true)} >
                    <Image source={fab} style = {styles.floatingButtonStyle}/>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AgendaScreen

const styles = StyleSheet.create({
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 70,
        height: 70,
    },
    deleteButtonBackground: {
        width: 35,
        height: 35,
    },
    deleteButtonImage: {
        width: 30,
        height: 30,
    },
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
    button: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginRight: 20,
        marginBottom: 20,
        padding: 10,
        elevation: 2
    },
    buttonBack: {
        backgroundColor: "#2196F3",
    },
    submitButton: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        marginBottom: 20,
        marginLeft: 20,
        padding: 10,
        elevation: 2
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
    inputContainer: {
        width: 250,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 5,
        marginTop: 1,
        marginBottom: 1,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        width: 250,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        height: 50,
        width: 250,
    },
    text: { 
        marginBottom: 2,
        marginLeft: 10,
        marginRight: 10,
        textAlign: "left"
    },
    modalView: {
        position: 'relative',
        margin: 10,
        width: 300,
        height: 250,
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
})