import React, { createContext, useEffect, useState } from 'react'
import LoginScreen from '../screens/LoginScreen'
import { firebase, auth } from "../firebase";
import { View } from 'native-base';

const AuthContext = createContext()

export const Auth = ({ children }) => {
    // const [auth, setAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        console.log(auth.currentUser)

    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            <View>
                <Text>Hola</Text>
            </View>
        </AuthContext.Provider >
    )
}


export default AuthContext