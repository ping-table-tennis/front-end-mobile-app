import React, { useState, Component } from 'react'
import { Pressable, Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { firebase, auth } from '../firebase'
import { NativeBaseProvider, HStack, VStack, Popover, Modal, Button, Divider, Image, FormControl, Input } from 'native-base'

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
            user: null,
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
            modalVisible: false,
            modalEmailValue: '',
            modalNameValue: '',
            userId: ""
        }
        this.student = new Student()
    }

    fetchUpcoming = async () => {
        if (firebase.auth().currentUser !== undefined) {
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

    fetchStudents = async () => {
        if (firebase.auth().currentUser !== undefined) {
            const userGeneralPlan = await db.collection('Students').get();
            userGeneralPlan.query.where('addedByEmail', '==', firebase.auth().currentUser.email).get().then((res) => {
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
                    arr.push(data)
            })
        }
        this.setState({ availableUsers: arr })
    }


    fetchUserData = async () => {
        if (!auth.currentUser) this.props.navigation.navigate("Registration", { toRegister: false })
        const email = auth.currentUser.email
        if (email) {
            await db.collection('Users').doc(email).get().then(res => {
                const data = res.data()
                console.log(data)
                this.setState({
                    name: data.name,
                    friends: data.friends,
                    isStudent: data.isStudent,
                    user: data.isStudent,
                    userId: res.id
                })
                console.log(res.id)
            })
            this.setAvailableUsers()
        } else {
            this.props.navigation.navigate("Registration", { toRegister: false })
        }
    }

    showModal = (visible) => {
        this.setState({ modalVisible: visible })
    }

    displayModalContent = () => {
        let arr = []
        for (let i = 0; i < this.state.availableUsers.length; i++) {
            let element = this.state.availableUsers[i]
            arr.push(
                <View key={i}>
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => this.addNewUser(element)} >
                        <Text style={styles.itemText}> {element.name} </Text>
                    </TouchableOpacity>
                </View>)
        }
        return arr
    }

    addNewUser = async (user) => {
        await db.collection('Students').add({
            name: user.name,
            addedByEmail: auth.currentUser?.email,
            email: user.email
        });
        this.fetchStudents()
        this.showModal(false)
        Alert.alert("", user.name + " has been added to your account.")

        // send notification to the added person that they were added by this user
        this.sendNotification(user)
    }

    sendNotification = async (user) => {
        let notifs = []
        let reference = db.collection('Users').doc(user.email)
        await reference.get().then((doc) => {
            if (doc.exists) {
                notifs = doc.data().notifications
            }
        }).catch(e => console.log(e))

        let notificationMsg = "You have been added by " + this.state.name + " (" +
            auth.currentUser?.email + ")."
        notifs.push(notificationMsg)
        await db.collection('Users').doc(user.email).update({
            notifications: notifs,
        })
            .catch(err => {
                console.log(err)
            })
    }

    showDeleteAlert = (index) => {
        Alert.alert(
            "Delete User",
            "Are you sure that you want to delete this user? This cannot be undone.",
            [
                { text: Const.ALERT_CANCEL, style: "cancel" },
                { text: Const.ALERT_YES, onPress: () => this.deleteUser(index.email) }
            ]
        )
    }

    deleteUser = async (email) => {
        let id
        const ref = db.collection('Students')
        const snapshot = await ref.where('email', '==', email).get()

        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }

        snapshot.forEach(doc => {
            id = doc.id
        })

        await db.collection('Students').doc(id).delete().then(() => {
            this.fetchStudents()
        })
    }

    handleOnPressStudent = (student) => {
        this.props.navigation.navigate("TrainingPlan", { student: student })
    }

    handleGeneralModalCancel = () => {
        this.setState({
            modalVisible: false,
            modalTitle: "",
            modalEmailValue: "",
            modalNameValue: "",
        })
    }

    handleGeneralModalSave = async () => {
        const { modalNameValue, modalEmailValue } = this.state
        const email = auth.currentUser.email

        await db.collection("Students").add({
            addedByEmail: email,
            email: modalEmailValue.toLowerCase(),
            name: modalNameValue
        }).then(async () => {
            console.log("Doc created successfully.")
            this.fetchStudents()
            this.setState({
                modalVisible: false,
                modalTitle: "",
                modalEmailValue: "",
                modalNameValue: "",
            })
        }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.state.currentEmail = auth.currentUser?.email
        this.fetchUserData()
        this.fetchStudents()
        this.props.navigation.addListener('focus', () => {
            this.state.currentEmail = auth.currentUser?.email
            this.fetchUserData()
            this.fetchStudents()
        });
    }

   
    render() {
        const { modalVisible, isStudent } = this.state
        return (
            <NativeBaseProvider>
                <Modal isOpen={modalVisible} onClose={this.handleGeneralModalCancel}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header>{"Add Student"}</Modal.Header>
                        <Modal.Body>
                            <FormControl mt="3">
                                <FormControl.Label>Name</FormControl.Label>
                                <Input value={this.state.modalNameValue} onChangeText={(value) => this.setState({ modalNameValue: value })} />
                            </FormControl>
                            <FormControl mt="3">
                                <FormControl.Label>Email</FormControl.Label>
                                <Input value={this.state.modalEmailValue} onChangeText={(value) => this.setState({ modalEmailValue: value })} />
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button variant="ghost" colorScheme="blueGray" onPress={this.handleGeneralModalCancel}>Cancel</Button>
                                <Button onPress={this.handleGeneralModalSave}>Add</Button>
                            </Button.Group>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
                <View style={styles.HomeScreen}>
                    <HStack justifyContent="space-between" marginBottom="10px">
                        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                            <Feather name="menu" size={30} color="black" />
                        </TouchableOpacity>
                        <HStack>
                            <TouchableOpacity onPress={() => this.showModal(true)}>
                                <AntDesign name="pluscircleo" size={30} color="black" />
                            </TouchableOpacity>
                        </HStack>
                    </HStack>
                    <Text style={styles.studentTitle}>{isStudent ? "Students" : "Coaches"}</Text>
                    <Text style={styles.studentTitle}></Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {this.state.students.map((student, key) => (
                            <TouchableOpacity key={key} onPress={() => this.handleOnPressStudent(student)}>
                                <HStack px={"20px"} marginTop="15px" style={styles.studentBox} alignItems="center">
                                    <VStack width={"100%"} space={5}>
                                        <View style={styles.imageContainer}>
                                            <TouchableOpacity style={styles.deleteButtonBackground} onPress={() => this.showDeleteAlert(student)}>
                                                <Image alt='student' source={deleteImg} style={styles.deleteButtonImage}></Image>
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
        // padding: 25
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
        alignItems: 'flex-end',
        position: "relative",
        top: -10,
        left: 5
    },
})

