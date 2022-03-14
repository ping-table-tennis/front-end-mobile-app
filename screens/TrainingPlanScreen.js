import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import { NativeBaseProvider, HStack, VStack, Checkbox } from 'native-base'
import { Feather, Entypo } from "@expo/vector-icons"
import racket from "../assets/icons/racket.png"
import moment from "moment"

class TrainingPlanScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGeneral: false,
            generals: ["Work To Do/General", "Weaknesses", "Strenghts", "Physical Training"],
            daily: ["11/30/2021"]
        }
    }
    render() {
        const { isGeneral, generals, daily } = this.state
        const generalOrDaily = isGeneral ? generals : daily
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
                            {generalOrDaily.map((general) => (
                                isGeneral ?
                                    <VStack background={"white"} width="100%" height='180' marginTop={"15px"} paddingBottom="20px" borderRadius={'20px'}>
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
                                            <Text style={[styles.textContainer, { fontSize: 18, fontWeight: '400' }]}>{moment().format("MMM Do YYYY")}</Text>
                                            <TouchableOpacity>
                                                <Feather name="more-horizontal" size={24} color="black" style={{ width: 22, height: 28, position: 'relative', right: 10, bottom: 5 }} />
                                            </TouchableOpacity>
                                        </HStack>
                                        <HStack justifyContent='center' padding={'15px'} height="50px" >
                                            <Text style={[styles.textContainer, { fontSize: 18, fontWeight: '600' }]}>Goals For Today</Text>
                                        </HStack>
                                        <HStack paddingX={"10px"} >
                                            <TextInput multiline style={[styles.textContainer, { fontSize: 12, fontWeight: 'normal' }]} value={"Improve topspin consistency when balls are going randomli."}/>
                                        </HStack>
                                        <VStack space={2} paddingX={"5px"} marginTop={"20px"}>
                                            {[0,2,3, 4,5,3,4,5,6,7,7,8,8,].map(() => (
                                                <HStack alignItems={"center"}>
                                                    <Checkbox defaultIsChecked={true} value="" style={{borderRadius: 100, width: 30, height: 30, marginRight: 10}}/>
                                                    <Text>20 topspins in random forehand side </Text>
                                                </HStack>
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