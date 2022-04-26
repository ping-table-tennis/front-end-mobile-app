import { useNavigation } from '@react-navigation/core'
import React, { useState, Component } from 'react'
import { Pressable, Alert, Modal, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack, Popover, VStack, Divider, Image } from 'native-base'
import { Feather, AntDesign } from "@expo/vector-icons"
import deleteImg from '../assets/icons/delete.png'
import Student from "../DAOs/StudentDAOs"
import * as Const from '../util/Constants'

const db = firebase.firestore()

class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isStudent: false,
            students: [],
            friends: [],
            availableUsers: [], // coach/students (full names) that the current user can add based on friends list
            name: "",
            currentEmail: auth.currentUser?.email,
            editOptions: [
                "Add",
                "Edit",
                "Remove",
            ],
            modalVisible: false
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

    getParsedRole = () => {
        return this.state.isStudent ? "Coach" : "Student"
    }

    setAvailableUsers = async () => {
        let arr = []
        for (let i = 0; i < this.state.friends.length; i++) {
            await db.collection('Users').doc(this.state.friends[i]).get().then((doc) => {
                let data = doc.data()
                if (data.isStudent === !this.state.isStudent)
                    arr.push(data.name)
            })
        }
        this.setState({availableUsers: arr})
    }

    setUserData = async () => {
        let email = auth.currentUser?.email
        await db.collection('Users').doc(email).get().then(doc => {
            if (doc.exists) {
                let data = doc.data()
                this.setState({friends: data.friends})
                this.setState({isStudent: data.isStudent})
            }
        })
        this.setAvailableUsers()
    }

    showModal = (visible) => {
        this.setState({ modalVisible: visible });
    }

        
    displayModalContent = () => {
        let arr = []
        for (let i = 0; i < this.state.availableUsers.length; i++) {
            let element = this.state.availableUsers[i]
            arr.push(
                <View key = {i}>
                    <TouchableOpacity 
                        style = {styles.item}
                        onPress = { () => this.addNewUser(element) } >
                            <Text style={styles.itemText}> {element} </Text>
                        </TouchableOpacity>
                </View>)
        }
        return arr
    }

    addNewUser = async (name) => {
        await db.collection('Students').add({
            name: name,
            coach: auth.currentUser?.email
        });
        this.fetchStudents()
        this.showModal(false)
        Alert.alert("", name + " has been added to your account.")
    }

    showDeleteAlert = (index) => {
        Alert.alert(
            "Delete User",
            "Are you sure that you want to delete this user? This cannot be undone.",
            [
              { text: Const.ALERT_CANCEL, style: "cancel"},
              { text: Const.ALERT_YES, onPress: () => this.deleteUser(index) }
            ]
        );
    }

    deleteUser = async (name) => {
        let id
        const ref = db.collection('Students')
        const snapshot = await ref.where('name', '==', name).get()

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  
          
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            id = doc.id
        });

        await db.collection('Students').doc(id).delete()
        this.fetchStudents()
    }

    componentDidMount() {
        this.setUserData()
        this.fetchStudents()
    }

    handleOnPressStudent = (student) => {
        this.props.navigation.navigate("TrainingPlan", { student: student })
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <NativeBaseProvider>
                <View>
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}> Add a New {this.getParsedRole()}</Text>
                            {this.displayModalContent()}
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.showModal(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                    </Modal>
                </View>
                <View style={styles.HomeScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Feather name="menu" size={30} color="black" />
                        </TouchableOpacity>
                        <HStack>
                            <TouchableOpacity onPress = {() => this.showModal(true)}>
                                <AntDesign name="pluscircleo" size={30} color="black" />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    {
                        this.state.isStudent ? <Text style={styles.studentTitle}>Coaches</Text>
                        : <Text style={styles.studentTitle}>Students</Text>
                    }
                    <Text style={styles.studentTitle}></Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.students.map((student, key) => (
                            <TouchableOpacity key={key} onPress={() => this.handleOnPressStudent(student)}>
                                <HStack marginTop="15px" style={styles.studentBox} alignItems="center">
                                    <VStack width={"100%"} space={5}>
                                    <View style={styles.imageContainer}>
                                        <TouchableOpacity
                                            style={styles.deleteButtonBackground}
                                            onPress={() => this.showDeleteAlert(student.name)}>
                                            <Image alt = 'student' source = {deleteImg} style = {styles.deleteButtonImage}></Image>
                                        </TouchableOpacity>
                                    </View>
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        position: 'relative',
        margin: 10,
        width: 300,
        height: 400,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 25,
    },
    item: {
        backgroundColor: 'black',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    itemText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    deleteButtonBackground: {
        width: 35,
        height: 35,
        alignItems: 'flex-end',
    },
    deleteButtonImage: {
        width: 30,
        height: 30,
    },
    imageContainer: {
        alignItems: 'flex-end'
    },
})
