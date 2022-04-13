
import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { NativeBaseProvider, HStack, VStack, Checkbox } from 'native-base'
import { Feather, Entypo } from "@expo/vector-icons"
import racket from "../assets/icons/racket.png"
import moment from "moment"
import firebase from 'firebase'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import Upcoming from "../Components/UpcomingEvents"

class EventScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpcoming: "Upcoming",
            matches: [],
            results: [],
            upcoming: [],

        }
    }

    handleSwitch = (tab) => {
        switch (tab) {
            case "Upcoming":
                this.setState({
                    isUpcoming: "Upcoming",
                })

                break;
            case "Matches":
                this.setState({
                    isUpcoming: "Matches",
                })

                break;
            case "Results":
                this.setState({
                    isUpcoming: "Results",
                })

                break;
        }
    }


    render() {
        const { isUpcoming, matches, upcoming, results } = this.state
        // sub-branching the second clause
        const generalOrDaily = isUpcoming ? upcoming : upcoming ? matches : results

        return (
            <NativeBaseProvider>
                <View style={styles.EventScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <Feather name="menu" size={30} color="black" />
                        <Feather name="more-vertical" size={30} color="black" />
                    </HStack>
                    <HStack justifyContent='center' marginTop="10px">
                        <Text style={styles.textContainer}>Tournaments</Text>
                        <Image resizeMode='contain' style={{ width: 22, height: 28 }} source={racket} />
                    </HStack>

                    <HStack justifyContent='space-evenly' >
                        <TouchableOpacity onPress={() => this.handleSwitch("Upcoming")} style={[styles.barContainer, { borderColor: isUpcoming == "Upcoming" ? '#0D0BAA' : "#979797" }]}>
                            <Text style={[styles.textContainer, { fontSize: 24, fontWeight: 'normal', color: isUpcoming == "Upcoming" ? '#0D0BAA' : "black" }]}>Upcoming</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleSwitch("Matches")} style={[styles.barContainer, { borderColor: isUpcoming == "Matches"  ? '#0D0BAA' : "#979797" }]}>
                            <Text style={[styles.textContainer, { fontSize: 24, fontWeight: 'normal', color: isUpcoming == "Matches" ? '#0D0BAA' : "black" }]}>Matches</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleSwitch("Results")} style={[styles.barContainer, { borderColor: isUpcoming == "Results" ? '#0D0BAA' : "#979797" }]}>
                            <Text style={[styles.textContainer, { fontSize: 24, fontWeight: 'normal', color: isUpcoming == "Results" ? '#0D0BAA' : "black" }]}>Results</Text>
                        </TouchableOpacity>
                    </HStack>
                    <Upcoming/>
                </View>

            

            </NativeBaseProvider>
        )
    }
}

export default EventScreen;


const styles = StyleSheet.create({
    EventScreen: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E3F6F5",
        
    },
    textContainer: {
        paddingRight: 6,
        fontSize: 24,
        fontWeight: "bold",

    },
    barContainer: {
        width: "35%",
        height: 85,
        paddingBottom: 10,
        
        

        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: 4,
    },
    listContainer: {

    }

})