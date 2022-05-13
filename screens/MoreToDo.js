import { NativeBaseProvider, HStack, VStack, Checkbox, Modal, Button, FormControl, Input } from 'native-base'
import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native'
import { AntDesign, Entypo } from "@expo/vector-icons"
import { auth, firebase } from '../firebase'
const db = firebase.firestore()

class MoreToDo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tasks: [],
            showGeneralModal: false,
            modalTitle: "",
            modalvalue: ""
        }
    }

    handleDelete = async (key) => {
        const { tasks, id } = this.props.route.params
        const list = tasks
        list.splice(key, 1)
        console.log("list:", list)

        await db.collection("General Plans").doc(id).update({
            tasks: list
        }).then(async () => {
            this.setState({
                tasks: list
            })
            console.log("Doc created successfully.")
        }).catch(err => console.log(err))
    }


    handleGeneralModalCancel = () => {
        this.setState({
            showGeneralModal: false,
            modalTitle: "",
            modalvalue: ""
        })
    }

    showModal = (visible) => {
        const { tasks, id, title } = this.props.route.params

        this.setState({
            showGeneralModal: visible,
            modalTitle: title
        })
    }

    handleGeneralModalSave = async () => {
        const { id, title } = this.props.route.params

        const { modalvalue, tasks } = this.state
        let generalTask = tasks
        generalTask.push(modalvalue)

        await db.collection("General Plans").doc(id).update({
            tasks: generalTask
        }).then(async () => {
            console.log("Doc created successfully.")
            this.setState({
                showGeneralModal: false,
                modalvalue: "",
                tasks: generalTask
            })
        }).catch(err => console.log(err))
        console.log("generalTask:", generalTask)
    }

    componentDidMount() {
        const { tasks, id } = this.props.route.params
        console.log(this.props.route.params);
        this.setState({
            tasks
        })
    }

    render() {
        const { title } = this.props.route.params
        return (
            <NativeBaseProvider>
                <VStack background={"#E3F6F5"} h="100%" px={"20px"}>
                    <HStack p={"20px"} justifyContent={"flex-end"}>
                        <TouchableOpacity onPress={() => this.showModal(true)}>
                            <AntDesign name="pluscircleo" size={30} color="black" />
                        </TouchableOpacity>
                    </HStack>
                    <ScrollView>
                        <HStack alignItems={"center"} justifyContent="center" h={"50px"} background={"white"} style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
                        </HStack>
                        {this.state.tasks.map((task, key) => (
                            <HStack background={"white"} key={key} px={"20px"} h={"50px"} w={"100%"} alignItems={"center"} borderColor="gray.200" borderWidth={"0.5px"} justifyContent="space-between">
                                <HStack alignItems={"center"} >
                                    <Entypo name="dot-single" size={24} color="black" />
                                    <Text>{task}</Text>
                                </HStack>
                                <HStack>
                                    <TouchableOpacity onPress={() => this.handleDelete(key)}>
                                        <AntDesign name="delete" size={18} color="red" />
                                    </TouchableOpacity>
                                </HStack>
                            </HStack>
                        ))}
                        <Modal isOpen={this.state.showGeneralModal} onClose={this.handleGeneralModalCancel}>
                            <Modal.Content maxWidth="400px">
                                <Modal.CloseButton />
                                <Modal.Header>{this.state.modalTitle}</Modal.Header>
                                <Modal.Body>
                                    <FormControl mt="3">
                                        <FormControl.Label>Title</FormControl.Label>
                                        <Input value={this.state.modalvalue} onChangeText={(value) => this.setState({ modalvalue: value })} />
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
                    </ScrollView>
                </VStack>
            </NativeBaseProvider>
        )
    }
}

export default MoreToDo