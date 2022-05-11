import { HStack, VStack } from 'native-base';
import React, { Component } from 'react';
import {Text, StyleSheet, Linking, TextInput } from 'react-native'
import moment from "moment"
import { AntDesign } from '@expo/vector-icons';
import { firebase, auth } from '../firebase'
const db = firebase.firestore()



class ResultsEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            totalWin: 0,
            totalLoss: 0,
            matches: [],
        }
    }

    getResults = async () => {
        let currentEmail = auth.currentUser?.email
        await db.collection('Matches').doc(currentEmail).get().then(doc => {
            if (doc.exists) {
                let matches = doc.data().matches
                let wins = 0, losses = 0
                for (let i = 0; i < matches.length; i++) 
                    (matches[i].result === "WIN") ? wins++ : losses++

                console.log("WINS:", wins, "LOSSES:",losses)
                this.setState({totalWin: wins})
                this.setState({totalLoss: losses})
                this.setState({matches: doc.data().name})   
            }
        }).catch(e => {
            console.log(e)
        })
    }

    getName = async () => {
        let currentEmail = auth.currentUser?.email
        await db.collection('Users').doc(currentEmail).get().then(doc => {
            if (doc.exists) {
                console.log(doc.data())
                this.setState({name: doc.data().name})       
            }
        }).catch(e => {
            console.log(e)
        })
    }

    fetchUpcoming = async () => { 
        if (firebase.auth().currentUser !== null) {
            const userGeneralPlan = await db.collection('Results').get();
            
            userGeneralPlan.query.get().then((res) => {
               //console.log(res.docs.map(doc => doc.data()), 'ok') 
                // this.setState({
                    // totalWin: res.docs.map(doc => doc.data())
                    
                // })
            })
        }
    }

 

    handleOnChangeText = (value) => { 
        this.setState({
            searchValue: value
        })
    }
    
    componentDidMount() {
        this.fetchUpcoming()
        this.getResults()
        this.getName()
    }
    

    render() {
        const {totalWin, totalLoss} = this.state
    
        return (
            <VStack style={styles.ResultsEvents} marginTop={"10px"}>
                <Text style={[styles.TitleName]}>Player: {this.state.name}</Text>
                <Text style={[styles.TitleName]}>Total Games Won: {totalWin}</Text>
                <Text style={[styles.TitleName]}>Total Game Lost: {totalLoss}</Text>
            </VStack>
        );
    }
}

export default ResultsEvents;

const styles = StyleSheet.create({
    
    TitleName: {
        height: 50,
        fontWeight: "bold",
        fontSize:18,
       
    },
    ResultsEvents: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 25,
        
    },
    head: {
        height: 40,
        // backgroundColor: '#f1f8ff'
    },

    text: { 
        margin: 6,
        fontWeight:"bold",
        fontSize: 16,
     }
})