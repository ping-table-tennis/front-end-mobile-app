import React, { Component } from 'react';
import { StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { NativeBaseProvider, HStack, VStack, ZStack, Button, Text } from 'native-base'
import { AntDesign, MaterialIcons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { auth, firebase } from '../firebase'
import { ref, getStorage, uploadBytes } from 'firebase/storage'
const db = firebase.firestore()


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: "https://images.assetsdelivery.com/compings_v2/thesomeday123/thesomeday1231712/thesomeday123171200008.jpg",
            inputs: [
                {
                    label: "name",
                    title: "Name",
                    icon: <MaterialCommunityIcons name="account-circle-outline" size={20} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                },
                {
                    label: "email",
                    title: "Email",
                    icon: <MaterialCommunityIcons name="email-edit-outline" size={20} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                },
                {
                    label: "rating",
                    title: "Rating",
                    icon: <AntDesign name="staro" size={20} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                },
                {
                    label: "style",
                    title: "Style",
                    icon: <MaterialIcons name="sports-tennis" size={20} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                },
                {
                    label: "homeClub",
                    title: "Home Club",
                    icon: <Feather name="home" size={20} color="black" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                },
                {
                    label: "lessonRate",
                    title: "Lesson Rate",
                    icon: <MaterialCommunityIcons name="scoreboard-outline" size={20} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                }
            ],
            name: "",
            email: "",
            rating: "",
            style: "",
            homeClub: "",
            lessonRate: "",
            isChange: false,
            currentUser: []
        }
    }

    pickImage = async () => {
        await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        }).then(async (result) => {
            // const image = await FileSystem.readAsStringAsync(result.uri, {
            //     encoding: 'base64',
            // })

            if (!result.cancelled) {
                this.setState({
                    image: result.uri
                })
            }
        })
    }

    handleOnChange = (value, label) => {
        this.setState({
            isChange: value ? true : false,
            [label]: value,
        })
    }

    fetProfile = async () => {
        if (firebase.auth().currentUser !== null) {
            const userDailyPlan = await db.collection('Users').get();
            userDailyPlan.query.where('email', '==', firebase.auth().currentUser.email).get().then((res) => {
                const user = res.docs.map(doc => doc.data())[0]
                this.setState({
                    currentUser: res.docs.map(doc => doc.data())[0],
                    name: user?.name,
                    email: user?.email,
                    rating: user?.rating.toString(),
                    style: user?.style,
                    homeClub: user?.homeClub,
                    lessonRate: user?.lessonRate,
                })
                console.log(res.docs.map(doc => doc.data())[0])
            }).catch(err => {
                console.log(err)
            })
        }
    }

    handleOnPress = async () => {
        const { name, email, rating, style, homeClub, lessonRate, image } = this.state
        await db.collection("Users").doc(firebase.auth().currentUser.email).set({
            email,
            name,
            rating: parseInt(rating),
            friends: [],
            style,
            homeClub,
            lessonRate,
            image
        }).then(async () => {
            console.log("User (" + email + ") created successfully.")
            this.fetProfile()
            this.setState({
                isChange: false
            })
            this.props.navigation.navigate("Profile")
        }).catch(err => console.log(err))
    }

    componentDidMount() {
        this.fetProfile()
    }

    render() {
        const { inputs, isChange, name, email, rating, style, homeClub, lessonRate, image } = this.state
        const values = [name, email, rating, style, homeClub, lessonRate]

        return (
            <NativeBaseProvider>
                <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
                    <VStack style={styles.Profile}>
                        <ZStack style={styles.userPhoto}>
                            <Image
                                style={styles.tinyLogo}
                                source={{ uri: image }}
                            />
                            <HStack width={"100%"} justifyContent="flex-end" top="-2px">
                                <TouchableOpacity style={styles.Upload} onPress={this.pickImage}>
                                    <AntDesign name="edit" size={20} color="black" />
                                </TouchableOpacity>
                            </HStack>
                        </ZStack>
                        <VStack>
                            {inputs.map((input, key) => (
                                <HStack key={key} style={styles.textContainer} alignItems="center" >
                                    <HStack>
                                        {input.icon}
                                    </HStack>
                                    <TextInput value={values[key]} onChangeText={(value) => this.handleOnChange(value, input.label)} placeholderTextColor={"black"} style={styles.inputs} />
                                </HStack>
                            ))}
                            {isChange &&
                                <HStack justifyContent={"center"}>
                                    <Button onPress={this.handleOnPress} width={"50%"} mt={"10px"} rounded={20} success>
                                        <Text>Success</Text>
                                    </Button>
                                </HStack>
                            }
                        </VStack>
                    </VStack>
                </ScrollView>
            </NativeBaseProvider>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    Profile: {
        flex: 1,
        width: "100%",
        height: "100%",

        // backgroundColor: "tomato",
        paddingTop: 50,

        display: "flex",
        alignItems: "center",

    },
    userPhoto: {
        width: "50%",
        height: 200,
        borderRadius: 40,
        backgroundColor: "white",
    },

    textContainer: {
        minWidth: 130,
        padding: 20,

    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        borderRadius: 40

    },
    Upload: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 100,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1,
    },
    inputs: {
        height: 30,
        backgroundColor: "transparent",
        borderWidth: 0,
        borderColor: "transparent",
    }
})