import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Agenda, AgendaList, CalendarListProps, AgendaEntry, AgendaProps, AgendaSchedule } from 'react-native-calendars'
import { useNavigation} from '@react-navigation/core'
import { auth, firebase } from '../firebase'
const db = firebase.firestore()

class AgendaScreen extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            currentEmail: auth.currentUser?.email,
            events: {},
            todaystr: "",
            mark: {}
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



    render() {
        return (
            <View style={{height: 600}}>
                <Agenda
                    // The list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key has to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={this.state.events}
                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={month => {
                        this.showEvents();
                    }}
                    showOnlySelectedDayItems={true}
                    // Callback that fires when the calendar is opened or closed
                    onCalendarToggled={calendarOpened => {
                        console.log(calendarOpened);
                    }}
                    // Callback that gets called on day press
                    onDayPress={day => {
                        console.log('day pressed');
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={day => {
                        console.log('day changed');
                    }}
                    // Initially selected day
                    selected={this.state.todaystr}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2022-01-01'}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={12}
                    // Specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {
                        return <View />;
                    }}
                    // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                    renderDay={(day, item) => {
                        return (
                            <View style={styles.centeredView}>
                                <Text style={styles.textStyle} >{day.getDate()} {item.name}</Text>
                            </View>
                        );
                    }}
                    // Specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {
                        return (
                        <View style={styles.emptyDate}>
                            <Text>This is empty date!</Text>
                        </View>
                        );
                    }}
                    // Specify how agenda knob should look like
                    renderKnob={() => {
                        return <View />;
                    }}
                    // Specify what should be rendered instead of ActivityIndicator
                    renderEmptyData={() => {
                        return <View />;
                    }}
                    // Specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {
                        return r1.text !== r2.text;
                    }}
                    // Hide knob button. Default = false
                    hideKnob={false}
                    // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                    showClosingKnob={true}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={this.state.markmark}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                    onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
                    refreshControl={null}
                    // Agenda theme
                    theme={{
                        calendarBackground: "black", //agenda background
                        agendaKnobColor: "blue", // knob color
                        backgroundColor: "white", // background color below agenda
                        agendaDayTextColor: "red", // day name
                        agendaDayNumColor: "red", // day number
                        agendaTodayColor: "pink", // today in list
                        monthTextColor: "red", // name in calendar
                        textDefaultColor: "black",
                        todayBackgroundColor: "grey",
                        textSectionTitleColor: "white",
                        selectedDayBackgroundColor: "grey", // calendar sel date
                        dayTextColor: "white", // calendar day
                        dotColor: "white", // dots
                        textDisabledColor: "red"
                    }}
                    // Agenda container style
                    style={{}}

                    AgendaList={[]}
                />
            </View>
        );
    }
}

export default AgendaScreen

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
      },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
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
        width: 75,
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
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
      }
})