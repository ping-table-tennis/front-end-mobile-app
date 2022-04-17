import * as React from 'react';
import { Drawer } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons'
import { StyleSheet, View, Text } from 'react-native'

function DrawerScreen(props) {
    return (
        <View style={{ paddingTop: 50 }}>
            <Drawer.Section>
                <View style={styles.ProfileContainer}>
                    <View style={styles.ProfileImgBox}>
                        <AntDesign size={30} name="user" />
                    </View>
                    <View>
                        <Text style={{ fontWeight: "bold", fontSize: 24 }}>PingTT</Text>
                        {/* <Text>Edit info <AntDesign size={10} name="right" /></Text> */}
                    </View>
                </View>
            </Drawer.Section>
            <Drawer.Section >
                <Drawer.Item style={{ padding: 7 }} label="Training" onPress={() => props.navigation.navigate("Training")} />
                <Drawer.Item style={{ padding: 7 }} label="Profile" onPress={() => props.navigation.navigate("Profile")} />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    ItemBox: {
        backgroundColor: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfileImgBox: {
        width: 55,
        height: 55,
        backgroundColor: "white",
        borderRadius: 100,
        marginRight: 20,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 1,

 
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    ProfileContainer: {
        height: 100,
        paddingLeft: 20,
        paddingRight: 20,

        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    }
})
export default DrawerScreen