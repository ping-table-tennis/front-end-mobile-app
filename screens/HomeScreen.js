import { useNavigation } from '@react-navigation/core'
import React, { useState, Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack, Popover, VStack, Divider, Button } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"
import Student from "../DAOs/StudentDAOs"
const db = firebase.firestore()

import FriendScreen from "./FriendScreen"

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            name: "",
            currentEmail: auth.currentUser?.email,
            editOptions: [
                "Add",
                "Edit",
                "Remove",
            ]
        }
        this.student = new Student()
    }

    fetchUpcoming = async () => { 
        if (firebase.auth().currentUser !== null) {
            const userGeneralPlan = await db.collection('UpcomingEvents').get();
            // return userGeneralPlan.query.where('emails', '==', [coachEmail, studentEmail]).limit(1).get()
            userGeneralPlan.query.get().then((res) => {
                console.log(res.docs.map(doc => doc.data()))
            //     this.setState({
            //         tableData: res.docs.map(doc => doc.data())
            //     })
            })
        }
        console.log("error: " + firebase.auth().currentUser)
    }

    PopOver = () => {
        return (
            <VStack>
                <Popover placement='left' trigger={triggerProps => (
                    <TouchableOpacity {...triggerProps}>
                        <Feather name="more-vertical" size={30} color="black" />
                    </TouchableOpacity>
                )}>
                    <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                        <Popover.Arrow />
                        <Popover.Header>{""}</Popover.Header>
                        <Popover.CloseButton style={{ height: 50, paddingTop: 20, position: "relative", top: -5 }} />
                        <Popover.Body>
                            <VStack>
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Add Student</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Edit Student</Text>
                                </TouchableOpacity>
                                <Divider />
                                <TouchableOpacity style={styles.EditOption}>
                                    <Text>Delete Student</Text>
                                </TouchableOpacity>
                                {/* <Divider/> */}
                            </VStack>
                        </Popover.Body>
                    </Popover.Content>
                </Popover>
            </VStack>
        )
    }

    handleSignOut = () => {
        console.log("Signing out of", auth.currentUser?.email)
        auth.signOut().then(() => {
            this.props.navigation.navigate("Registration", { toRegister: false })
        }).catch(error => alert(error.message))
    }

    fetchStudents = async () => {
        if (firebase.auth().currentUser !== null) {
            const userGeneralPlan = await db.collection('Students').get();
            userGeneralPlan.query.where('coach', '==', firebase.auth().currentUser.email).get().then((res) => {
                this.setState({
                    students: res.docs.map(doc => doc.data())
                })
            })
        }
    }

    componentDidMount() {
        this.fetchStudents()
    }

    handleOnPressStudent = (student) => {
        this.props.navigation.navigate("TrainingPlan", { student: student })
    }

    handleNewStudentForm = () => {
       this.props.navigation.navigate("Friend")
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={styles.HomeScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Feather name="menu" size={30} color="black" />
                        </TouchableOpacity>
                        <HStack>
                            <TouchableOpacity onPress={this.handleNewStudentForm}>
                                <AntDesign name="pluscircleo" size={30} color="black" />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    <Text style={styles.studentTitle}>Students</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.students.map((student, key) => (
                            <TouchableOpacity key={key} onPress={() => this.handleOnPressStudent(student)}>
                                <HStack marginTop="15px" style={styles.studentBox} alignItems="center">
                                    <VStack width={"100%"} space={5}>
                                        <HStack justifyContent={"flex-end"}>
                                            <Popover placement='left' trigger={triggerProps => (
                                                <TouchableOpacity {...triggerProps}>
                                                    <Feather name="more-vertical" size={25} color="black" />
                                                </TouchableOpacity>
                                            )}>
                                                <Popover.Content accessibilityLabel="Delete Customerd" w="56">
                                                    <Popover.Arrow />
                                                    <Popover.Header>{""}</Popover.Header>
                                                    <Popover.CloseButton style={{ height: 50, paddingTop: 20, position: "relative", top: -5 }} />
                                                    <Popover.Body>
                                                        <VStack>
                                                            <Divider />
                                                            <TouchableOpacity style={styles.EditOption}>
                                                                <Text>Edit Student</Text>
                                                            </TouchableOpacity>
                                                            <Divider />
                                                            <TouchableOpacity style={styles.EditOption}>
                                                                <Text>Delete Student</Text>
                                                            </TouchableOpacity>
                                                            {/* <Divider/> */}
                                                        </VStack>
                                                    </Popover.Body>
                                                </Popover.Content>
                                            </Popover>
                                        </HStack>
                                        <HStack style={{ position: "relative", top: -20 }} >
                                            <AntDesign name="user" size={30} color="black" />
                                            <Text style={{ paddingLeft: 20, fontSize: 18, fontWeight: "400" }}>{student.name}</Text>
                                        </HStack>
                                    </VStack>
                                </HStack>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={this.handleSignOut}>
                        <Text style={{ color: "blue" }}>LOGOUT</Text>
                    </TouchableOpacity>
                </View>
            </NativeBaseProvider>
        )
    }
}

export default HomeScreen

const styles = StyleSheet.create({
    EditOption: {
        height: 50,

        display: "flex",
        justifyContent: "center"
    },
    HomeScreen: {
        flex: 1,
        padding: 20,
        backgroundColor: "#E3F6F5",
    },
    studentTitle: {
        fontSize: 32,
        textAlign: "center",
        paddingTop: 15,
        fontWeight: "bold"
    },
    studentBox: {
        width: "100%",
        height: 130,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25
    },

    input: {
        height: 45,
        // backgroundColor: "rgba(216,216,216, 0.51)",
        paddingHorizontal: 15,
        borderRadius: 25,
        marginTop: 25,
        borderWidth: 0.5,
        borderColor: "rgba(151,151,151, 0.51)",
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
})
class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editing: false
      };
      this.newbirthYear = "";
      this.newHomeWorld = "";
    }
  
    render() {
      const { imgSrc, cardName, birthYear, homeWorld, onEdit } = this.props;
      return (
        <div className="card">
          <div className="card-content">
            <div className="card-name">{cardName}</div>
            <img src={`http://localhost:3008/${imgSrc}`} alt="profile" />
            <p>
              <span>Birthday:</span>
              {this.state.editing ? (
                <span className="birth-year">{birthYear}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={birthYear}
                  ref={node => {
                    this.newbirthYear = node;
                  }}
                />
              )}
            </p>
            <p>
              <span>Homeworld:</span>
              {this.state.editing ? (
                <span className="home-world">{homeWorld}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={homeWorld}
                  ref={node => {
                    this.newHomeWorld = node;
                  }}
                />
              )}
            </p>
            <div align="center">
              <button
                onClick={() => {
                  this.setState({ editing: true });
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      );
    }
  }