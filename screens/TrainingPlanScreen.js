
import React, { useState, Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'

class TrainingPlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={styles.TrainingPlanScreen}>
                <Text onPress={() => navigation.navigate('Friend')} style={{fontSize:26, fontWeight:'bold'}}>Training Plan Screen </Text>
            </View>
            
        );
    }
}

export default TrainingPlanScreen;






const styles = StyleSheet.create({
    TrainingPlanScreen: {
        flex: 1, 
        alignItems: 'center',
         justifyContent:'center',
        backgroundColor: 'tomato',
    }


})