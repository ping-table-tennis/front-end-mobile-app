import { HStack, VStack } from 'native-base';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { Table, Row, Rows } from 'react-native-table-component';


class UpcomingEvents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ["Date", "Title", "Location"],
            tableData: [],


        };
    }
    render() {
        const state = this.state;
        return (
            <View style={styles.UpcomingEvents}>
                <Text> Upcoming Tournaments</Text>
                <VStack>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={state.tableData} textStyle={styles.text} />


                    </Table>

                </VStack>
            </View>
        );
    }
}

export default UpcomingEvents;

const styles = StyleSheet.create({
    UpcomingEvents: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff',

    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff'
    },

    text: { margin: 6 }


})