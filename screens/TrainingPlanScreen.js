import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { NativeBaseProvider, HStack, VStack, Checkbox, Heading } from 'native-base'
import { Feather, Entypo } from "@expo/vector-icons"
import racket from "../assets/icons/racket.png"
import moment from "moment"
import firebase from 'firebase'
import GeneralPlans from "../DAOs/GeneralPlanDAOs"
import DailyPlans from "../DAOs/DailyPlanDAOs"
import { AntDesign } from '@expo/vector-icons'
const db = firebase.database().ref()

class TrainingPlanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGeneral: true,
            generals: ["Work To Do/General", "Weaknesses", "Strenghts", "Physical Training"],
            generalPlans: [],
            dailyPlans: [],
            daily: ["11/30/2021"]
        }
        this.general = new GeneralPlans()
        this.daily = new DailyPlans()
    }


    fetGeneralPlans = async () => {
        const {email, coach} = this.props.route.params.student
        if (firebase.auth().currentUser !== null) {
            const userGeneralPlan = await db.collection('Students').get();
            userGeneralPlan.query.where('emails', '==', [coach, email]).get().then((res) => {
                // this.setState({
                //     students: res.docs.map(doc => doc.data())
                // })
                console.log(res.docs.map(doc => doc.data()), "OK")
            }).catch(err => {
                console.log(err)
            })
        }
    }


    fetDailyPlans = () => {
        if (firebase.auth().currentUser !== null) {
            const studentEmail = null
            const coachEmail = firebase.auth().currentUser.email
            this.daily.get(coachEmail, "student1@student.com").then((res) => {
                this.setState({
                    dailyPlans: res.docs.map(doc => doc.data())
                })
                console.log(result = res.docs.map(doc => doc.data()))
            })
            console.log("user id: " + firebase.auth().currentUser)
        }
    }

    groupByKey = (list, key) => list.reduce((hash, obj) => ({ ...hash, [obj[key]]: (hash[obj[key]] || []).concat(obj) }), {})


    componentDidMount() {
        this.fetGeneralPlans()
        this.fetDailyPlans()
        console.log(this.props.route.params.student)
    }

    render() {
        const { isGeneral, generals, daily, generalPlans, dailyPlans } = this.state
        const generalOrDaily = isGeneral ? generalPlans : dailyPlans
        return (
            <NativeBaseProvider>
                <View style={styles.TrainingPlanScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <Feather name="menu" size={30} color="black" />
                        <Feather name="more-vertical" size={30} color="black" />
                    </HStack>
                    <HStack justifyContent='center' marginTop="10px">
                        <Text style={styles.textContainer}>Leonador Diaz</Text>
                        <Image resizeMode='contain' style={{ width: 22, height: 28 }} source={racket} />
                    </HStack>
                    <HStack justifyContent='center' marginTop="10px">
                        <Text style={[styles.textContainer, { fontSize: 18, fontWeight: "600" }]}>Training Plan</Text>
                    </HStack>
                    <HStack justifyContent='space-between' marginTop="10px">
                        <TouchableOpacity onPress={() => this.setState({ isGeneral: !this.state.isGeneral })} style={[styles.barContainer, { borderColor: isGeneral ? '#0D0BAA' : "#979797" }]}>
                            <Text style={[styles.textContainer, { fontSize: 24, fontWeight: 'normal', color: isGeneral ? '#0D0BAA' : "black" }]}>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.setState({ isGeneral: !this.state.isGeneral })} style={[styles.barContainer, { borderColor: !isGeneral ? '#0D0BAA' : "#979797" }]}>
                            <Text style={[styles.textContainer, { fontSize: 24, fontWeight: 'normal', color: !isGeneral ? '#0D0BAA' : "black" }]}>Daily</Text>
                        </TouchableOpacity>
                    </HStack>

                    <VStack>
                        <ScrollView contentContainerStyle={{ paddingBottom: 200 }} showsVerticalScrollIndicator={false}>
                            {generalOrDaily.map((general, key) => (
                                isGeneral ?
                                    <VStack key={key + 10} background={"white"} width="100%" height='180' marginTop={"15px"} paddingBottom="20px" borderRadius={'20px'}>
                                        <HStack justifyContent='space-between' marginTop="10px" padding={'15px'} height="50px" >
                                            <Text style={[styles.textContainer, { fontSize: 18, fontWeight: '600' }]}>{general}</Text>
                                            <TouchableOpacity>
                                                <Feather name="more-horizontal" size={24} color="black" style={{ width: 22, height: 28, position: 'relative', right: 10, bottom: 5 }} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <View style={{ paddingBottom: 10 }} showsVerticalScrollIndicator={false}>
                                            {[0, 1, 2].map(() => (
                                                <HStack alignItems={"center"} marginLeft="20px">
                                                    <Entypo name="dot-single" size={20} color="black" />
                                                    <Text style={styles.listContainer}>Leonador Diaz</Text>
                                                </HStack>
                                            ))}
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate("ToDo")} style={{ marginTop: 10, paddingLeft: 35 }}>
                                                <Text style={{ color: "blue" }}>View more</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </VStack> :
                                    <VStack background={"white"} width="100%" minHeight={"250px"} marginTop={"15px"} paddingBottom="20px" paddingX={"15px"} borderRadius={'20px'}>
                                        <HStack justifyContent='space-between' marginTop="10px" padding={'15px'} height="50px" >
                                            <Heading size={"sm"}>{moment().format("MMM Do YYYY")}</Heading>
                                            {/* <Text style={[styles.textContainer, { fontSize: 18, fontWeight: '400' }]}>{moment().format("MMM Do YYYY")}</Text> */}
                                            <TouchableOpacity>
                                                <Feather name="more-horizontal" size={24} color="black" style={{ width: 22, height: 28, position: 'relative', right: 10, bottom: 5 }} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <HStack justifyContent='center' padding={'15px'} height="50px" >
                                            <Heading height={"30px"} size={"md"}>Goals For Today</Heading>
                                        </HStack>
                                        <HStack paddingX={"10px"} >
                                            <Heading size={"sm"}>Improve top spin consistency when balls are going randomli.</Heading>
                                            {/* <TextInput multiline style={[styles.textContainer, { fontSize: 12, fontWeight: 'normal' }]} value={"Improve topspin consistency when balls are going randomli."} /> */}
                                        </HStack>
                                        <VStack space={2} paddingX={"5px"} marginTop={"20px"}>
                                            {generalOrDaily.map((dailyPlan, key) => (
                                                <View key={key + 40}>
                                                    {dailyPlan.checklist_tasks.map((task, key) => (
                                                        <HStack key={key + 20} paddingBottom={"10px"} alignItems={"center"}>
                                                            <Checkbox alignItems={"center"} defaultIsChecked={true} value="" style={{ borderRadius: 100, width: 30, height: 30, marginRight: 10 }} >
                                                                <Heading size={"xs"}>{task}.</Heading>
                                                            </Checkbox>
                                                        </HStack>
                                                    ))}
                                                </View>
                                            ))}
                                        </VStack>
                                    </VStack>
                            ))}
                        </ScrollView>
                    </VStack>
                </View>
            </NativeBaseProvider>
        )
    }
}

export default TrainingPlanScreen


const styles = StyleSheet.create({
    TrainingPlanScreen: {
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
        width: "50%",
        height: 85,
        paddingBottom: 10,

        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomWidth: 4,
    },
    listContainer: {

    }

})