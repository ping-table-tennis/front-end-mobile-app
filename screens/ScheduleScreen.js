
import React, { useState, Component } from 'react'
import {View, Text} from 'react-native'
import { Calendar, CalendarList, Agenda} from 'react-native-calendars'
//calendar documentation and such below:
//https://www.educba.com/react-native-calendar/
//https://github.com/wix/react-native-calendars#readme

class ScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight:'bold'}}> Schedule Screen </Text>
                <Calendar
                    // Initially visible month. Default = Date()
                    //current={'2022-03-28'}
                    minDate={'2020-01-01'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={day => {
                        console.log('selected day', day);
                    }}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => {
                        console.log('month changed', month);
                    }}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                />
            </View>
            
        );
    }

    
}

export default ScheduleScreen;