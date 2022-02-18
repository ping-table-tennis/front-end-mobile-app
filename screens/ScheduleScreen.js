
import React, { useState, Component } from 'react'
import {View, Text} from 'react-native'

class ScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight:'bold'}}> Schedule Screen </Text>
            </View>
            
        );
    }
}

export default ScheduleScreen;