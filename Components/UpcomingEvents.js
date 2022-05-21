import { HStack, VStack } from 'native-base';
import React, { Component } from 'react';
import { Text, StyleSheet, Linking, TextInput, ScrollView } from 'react-native'
import moment from "moment"
import { AntDesign } from '@expo/vector-icons';
import { firebase, auth } from '../firebase'
const db = firebase.firestore()



class UpcomingEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: "",
            tableHead: ["Date", "Title", "Location"],
            tableData: []
        }
    }

    fetchUpcoming = async () => {
        if (firebase.auth().currentUser !== null) {
            const userGeneralPlan = await db.collection('UpcomingEvents').get();
            // return userGeneralPlan.query.where('emails', '==', [coachEmail, studentEmail]).limit(1).get()
            userGeneralPlan.query.get().then((res) => {
                this.setState({
                    tableData: res.docs.map(doc => doc.data())
                })
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
    }

    render() {
        const { tableData, tableHead } = this.state
        const filterTableData = tableData.filter((data) => {
            return data.title.includes(this.state.searchValue) == true
        })

        return (
            <VStack style={styles.UpcomingEvents} marginTop={"10px"}>
                <HStack space={2} alignItems={"center"} style={[styles.TableRow, { borderTopRightRadius: 25, borderTopLeftRadius: 25 }]} paddingX={"20px"}>
                    <AntDesign name="search1" size={18} color="rgba(000,000,000,0.15)" />
                    <TextInput onChangeText={(value) => this.handleOnChangeText(value)} style={styles.Search} placeholder="Search" />
                </HStack>
                <HStack paddingX={"20px"} space={15} alignItems="center" justifyContent="space-between" style={[styles.TableRow]}>
                    <Text style={[styles.TableTR, { fontWeight: "bold" }]}>Date</Text>
                    <Text style={[styles.TableTR, { fontWeight: "bold" }]}>Title</Text>
                    <Text style={[styles.TableTR, { fontWeight: "bold" }]}>Location</Text>
                </HStack>
                <ScrollView>
                    {filterTableData.map((data, key) => (
                        <HStack key={key} paddingX={"20px"} alignItems="center" justifyContent="space-between"
                            style={[styles.TableRow, key + 1 === filterTableData.length ? styles.TableRowLast : {}]
                            }>
                            <Text style={[styles.TableTR]}>{moment(data.date).format("ll")}</Text>
                            <Text onPress={() => Linking.openURL(data.url)} style={[styles.TableTR, { color: "blue", textDecorationLine: "underline" }]}>{data.title}</Text>
                            <Text style={[styles.TableTR]}>{data.location}</Text>
                        </HStack>
                    ))}
                </ScrollView>

            </VStack>
        );
    }
}

const styles = StyleSheet.create({
    Search: {
        height: 40
    },
    TableRow: {
        height: 50,

        borderWidth: 0.5,
        borderColor: "rgba(000,000,000,0.15)"
    },
    TableTR: {
        width: "30%",
    },
    UpcomingEvents: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    head: {
        height: 40,
    },
    text: {
        margin: 6,
        fontWeight: "bold",
        fontSize: 16,
    }
})

export default UpcomingEvents;
