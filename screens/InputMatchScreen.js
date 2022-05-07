import React, { useState, useEffect } from 'react'
import { Image, BackHandler, Alert, StyleSheet, Text, TextInput, View, KeyboardAvoidingView, useWindowDimensions, TouchableOpacity } from 'react-native'
import { firebase, auth } from '../firebase'
import Divider from 'react-native-divider';

const db = firebase.firestore()

const InputMatchScreen = ({route, navigation}) => {
    // const {index} = route.params
    const currentEmail = auth.currentUser?.email
    const [matches, setMatches] = useState([])
    const [result, setResult] = useState("")
    const [values, setValues] = useState({
            tournament: '',
            opponent: '',
            notes: '',
            playerScore1: '',
            opponentScore1: '',
            playerScore2: '',
            opponentScore2: '',
            playerScore3: '',
            opponentScore3: '',
        });

    const setEditValues = () => {
        db.collection('Matches').doc(currentEmail).get().then(doc => {
            if (doc.exists) {
                setMatches(doc.data().matches)
                let match = doc.data().matches[index]
                setValues({
                    tournament: match.tournament,
                    opponent: match.opponent,
                    notes: match.notes,
                    playerScore1: match.score.round1[0].toString(),
                    opponentScore1: match.score.round1[1].toString(),
                    playerScore2: match.score.round2[0].toString(),
                    opponentScore2: match.score.round2[1].toString(),
                    playerScore3: match.score.round3[0].toString(),
                    opponentScore3: match.score.round3[1].toString(), 
                })       
                setResult(match.result)
            }
        }).catch(e => {
            console.log(e)
        })

    }

    const handleChange = (key, value) => {
        setValues({
        ...values,
        [key]: value,
        });
    };

    function handleBackButtonClick() {
        navigation.navigate("Match");
        return true;
    }

    useEffect(() => {
        setEditValues()
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick)
        }
    }, [])

    const setResultTextStyle = (mode) => {
        return {
            color: result === mode ? "white" : "blue",
            fontWeight: '700',
            fontSize: 14
        }
    }

    const setResultButtonStyle = (mode) => {
        return {
            backgroundColor: result === mode ? 'blue' : "white",
            borderColor: "blue",
            borderWidth:1,
            width: '50%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5
        }
    }

    const getDataMap = () => {
        return {
            score: {
                round1: [parseInt(values.playerScore1), parseInt(values.opponentScore1)],
                round2: [parseInt(values.playerScore2), parseInt(values.opponentScore2)],
                round3: [parseInt(values.playerScore3), parseInt(values.opponentScore3)]
            },
            tournament: values.tournament,
            opponent: values.opponent,
            result: result,
            notes: values.notes
        }
    }

    const submitInputs = async () => {    
        let reference = db.collection('Matches').doc(currentEmail)

        if (index == -1) {
            await reference.update({
                matches: firebase.firestore.FieldValue.arrayUnion(getDataMap())
            }).then(() => {
                console.log("Match input success.")
                navigation.navigate("Match")  
            })
            .catch(err => {
                console.log(err)
            })
        } else {
            matches[index] = getDataMap()
            await reference.update({
                matches: matches
            }).then(() => {
                console.log("Match edit success.")
                navigation.navigate("Match")  
            })
            .catch(err => {
                console.log(err)
            })
        }
    }

    return (
        <KeyboardAvoidingView
            style = {styles.container}
            behavior= {Platform.OS === "ios" ? "padding" : "height"} 
        >
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder = "Tournament Title"
                    value = {values.tournament}
                    onChangeText = {text => handleChange('tournament', text)}
                    style = {styles.input}
                />
                <TextInput
                    placeholder = "Opponent Name"
                    value = {values.opponent}
                    onChangeText = {text => handleChange('opponent', text)}
                    style = {styles.input}
                />

                <Divider borderColor="#000" color="#000" orientation="center">SCORE</Divider>
                {/* Score Input Area */}
                <Text style = {styles.inputLabel}>Player Score</Text>

                <View style = {styles.row}>
                    <View style = {styles.inputWrap}>
                        <TextInput
                            value = {values.playerScore1}
                            onChangeText = {score => {handleChange('playerScore1', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>

                    <View style = {styles.inputWrap}>
                        <TextInput
                            value = {values.playerScore2}
                            onChangeText = {score => {handleChange('playerScore2', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>

                    <View style = {styles.inputWrap}>
                        <TextInput
                            value = {values.playerScore3}
                            onChangeText = {score => {handleChange('playerScore3', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>
                </View>

                <Text style = {styles.inputLabel}>Opponent Score</Text>
                <View style = {styles.row}>
                    <View style = {styles.inputWrap}>
                        <TextInput
                        value = {values.opponentScore1}
                        onChangeText = {score => {handleChange('opponentScore1', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>
                    <View style = {styles.inputWrap}>
                        <TextInput
                        value = {values.opponentScore2}
                        onChangeText = {score => {handleChange('opponentScore2', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>
                    <View style = {styles.inputWrap}>
                        <TextInput
                        value = {values.opponentScore3}
                        onChangeText = {score => {handleChange('opponentScore3', score)}}
                            style = {styles.scoreInput}
                        />
                    </View>
                </View>

                {/* Result Input Area */}
                <Divider borderColor="blue" color="blue" orientation="center"> RESULT </Divider>
                <View style = {styles.resultsRow}>
                    {/* WIN */}
                    <TouchableOpacity style={setResultButtonStyle("WIN")} 
                        onPress = { () => {setResult("WIN")} }>
                        <Text style={setResultTextStyle("WIN")}> WIN </Text>
                    </TouchableOpacity>

                    {/* LOSE */}
                    <TouchableOpacity style={setResultButtonStyle("LOSE")} 
                        onPress = { () => {setResult("LOSE")} }>
                        <Text 
                            style={setResultTextStyle("LOSE")}> LOSE </Text>
                    </TouchableOpacity>
                </View>

                {/* Notes Input Area */}
                <Divider borderColor="blue" color="blue" orientation="center"> NOTES </Divider>
                <View style = {styles.bottom}>
                    <TextInput multiline={true} 
                    style = {styles.noteInput}
                    value = {values.notes}
                    onChangeText = {text => handleChange("notes", text)} /> 
                    <TouchableOpacity style={styles.button} onPress = { () => {submitInputs()} }>
                    <Text style={styles.buttonText}> Confirm </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default InputMatchScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'blue',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    resultButton: {
        backgroundColor: 'white',
        borderColor: "blue",
        borderWidth:1,
        width: '50%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    resultButtonText: {
        color: 'blue',
        fontWeight: '700',
        fontSize: 14
    },
    inputContainer: {
        height: '100%',
        width: '85%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height:60
    },
    inputWrap: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems:'center',
    },
    inputLabel: {
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
    },
    scoreInput: {
        backgroundColor: 'white',
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        width: 100,
        borderWidth: 1
    },
    noteInput: {
        width: 270,
        height: 100,
        backgroundColor: 'white',
        padding: 10,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: 'blue', 
    },
    resultsRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    }
})
