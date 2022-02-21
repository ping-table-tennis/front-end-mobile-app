//TODO:
//access fields of user based on email input
//use functions instead of class

import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export const getEmail = () => {
    const currentEmail = auth.currentUser?.email
    return currentEmail;
}

export const getName = () => {
    const currentName = auth.currentUser?.name
    return currentEmail;
}

export const getFriends = () => {
    const currentFriends = auth.currentUser?.friends;
    return currentFriends;
}

export const getIsStudent = () => {
    const currentIsStudent = auth.currentUser?.isStudent;
    return isStudent;
}

export const getRating = () => {
    const currentRating = auth.currentUser?.rating;
    return rating;
}

export const getRequests = () => {
    const currentRequests = auth.currentUser?.requests;
    return requests;
}