import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import { NativeBaseProvider, HStack, VStack } from 'native-base'
import moment from "moment"
import { Entypo, AntDesign, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';



class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        };
    }


    pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({
              image: result.uri
          });
        }
      };


    render() {
        return (
            <NativeBaseProvider>
                <VStack style={styles.Profile}>
                    <View style={styles.userPhoto}>
                        <TouchableOpacity onPress={this.pickImage} style={{position:'relative'}} >
                            <AntDesign name="edit" size={24} color="black" />
                        </TouchableOpacity>
                        <Image
                            style={styles.tinyLogo}
                            source={{ uri: this.state.image}}
                        />
                    </View>
                    <HStack style={styles.textContainer}>

                        <AntDesign name="user" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Name</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialCommunityIcons name="email-edit-outline" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Email</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <AntDesign name="staro" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Rating</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialIcons name="sports-tennis" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Style</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>

                        <MaterialCommunityIcons name="home-roof" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Home Club</Text>
                    </HStack>

                    <HStack style={styles.textContainer}>
                        <MaterialIcons name="attach-money" size={18} color="#272643" style={{ width: 20, height: 20, position: 'relative', right: 5, bottom: 1 }} />
                        <Text style={{ color: "#272643" }} >Lesson Rate</Text>
                    </HStack>






                </VStack>
            </NativeBaseProvider>
        );
    }
}

export default Profile;



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
        paddingTop: 40,
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
        
      },

})


