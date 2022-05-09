
import React, { useState, Component } from 'react'
import {View, Text} from 'react-native'
import { Calendar } from 'react-native-calendars'
import { firebase, auth } from '../firebase'
import { useNavigation } from '@react-navigation/core'
import _isEmpty from 'lodash/isEmpty'
const currentEmail = auth.currentUser?.email
const navigation = useNavigation()
const db = firebase.firestore()
//calendar documentation and such below:
//https://www.educba.com/react-native-calendar/
//https://github.com/wix/react-native-calendars#readme

class ScheduleScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: {},
            end: {},
            period: {}
         };
    }

    userIsStudent(){
        return db.collection('Users').doc(currentEmail).get().getString('isStudent')
    }

    getAvailability(coachEmail){
        snapshot = db.collection('Availability').where('coachEmail','==',coachEmail)
        startDates = []
        endDates = []
        snapshot.forEach(doc => {
            startDates.push(doc.getDate('startDate'))
            endDates.push(doc.getDate('endDate'))
          })
          return [startDates, endDates]
    }

    getMarkedDates(){
        if(!this.userIsStudent()){
            [startDates, endDates] = this.getAvailability(currentEmail)

        //     startDates.forEach((date, i) => {
        //         startDates[i] = date.toISOString()
        //       })

        //     endDates.forEach((date, i) => {
        //         endDates[i] = date.toISOString()
        //     })
        }

    }

// https://github.com/wix/react-native-calendars/issues/610
    getDateString(timestamp) {
        const date = new Date(timestamp)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
    
        let dateString = `${year}-`
        if (month < 10) {
          dateString += `0${month}-`
        } else {
          dateString += `${month}-`
        }
        if (day < 10) {
          dateString += `0${day}`
        } else {
          dateString += day
        }
    
        return dateString
      }
    
      getPeriod(startTimestamp, endTimestamp) {
        const period = {}
        let currentTimestamp = startTimestamp
        while (currentTimestamp < endTimestamp) {
          const dateString = this.getDateString(currentTimestamp)
          period[dateString] = {
            color: 'green',
            startingDay: currentTimestamp === startTimestamp,
          }
          currentTimestamp += 24 * 60 * 60 * 1000
        }
        const dateString = this.getDateString(endTimestamp)
        period[dateString] = {
          color: 'green',
          endingDay: true,
        }
        return period
      }
    
      setDay(dayObj) {
        const { start, end } = this.state
        const {
          dateString, day, month, year,
        } = dayObj
        // timestamp returned by dayObj is in 12:00AM UTC 0, want local 12:00AM
        const timestamp = new Date(year, month - 1, day).getTime()
        const newDayObj = { ...dayObj, timestamp }
        // if there is no start day, add start. or if there is already a end and start date, restart
        const startIsEmpty = _isEmpty(start)
        if (startIsEmpty || !startIsEmpty && !_isEmpty(end)) {
          const period = {
            [dateString]: {
              color: 'green',
              endingDay: true,
              startingDay: true,
            },
          }
          this.setState({ start: newDayObj, period, end: {} })
        } else {
          // if end date is older than start date switch
          const { timestamp: savedTimestamp } = start
          if (savedTimestamp > timestamp) {
            const period = this.getPeriod(timestamp, savedTimestamp)
            this.setState({ start: newDayObj, end: start, period })
          } else {
            const period = this.getPeriod(savedTimestamp, timestamp)
            this.setState({ end: newDayObj, start, period })
          }
        }
      }

    render() {
        const { period } = this.state
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
                <Text onPress={() => navigation.navigate('Home')} style={{fontSize:26, fontWeight:'bold'}}> Schedule Screen </Text>
                <Calendar
                    minDate={'2020-01-01'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={day => {
                        console.log('selected day', day);
                        navigation.navigate("Agenda")
                    }}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={this.setDay.bind(this)}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'MMMM yyyy'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={month => { }}
                    markingType='period'
                    markedDates={period}
                />
            </View>
            
        );
    }

    
}

export default ScheduleScreen;