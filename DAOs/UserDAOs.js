//TODO:
//access fields of user based on email input
//use functions instead of class

import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export const getEmail = () => {
    const currentEmail = auth.currentUser?.email
    return currentEmail;
}

export const getName = (email) => {
    db.collection('Users').doc(email).get().then(doc => {
        if (doc.exists) {
            let name = doc.data().name
            return name;
        }
    }).catch(err => {
        console.log(err)
    })

    return;
}

export const getFriends = (email) => {
    db.collection('Users').doc(email).get().then(doc => {
        if (doc.exists) {
            let friends = doc.data().friends
            return friends;
        }
    }).catch(err => {
        console.log(err)
    })

    return;
}

export const getIsStudent = (email) => {
    db.collection('Users').doc(email).get().then(doc => {
        if (doc.exists) {
            let isStudent = doc.data().isStudent
            return isStudent;
        }
    }).catch(err => {
        console.log(err)
    })

    return;
}

export const getRating = (email) => {
    db.collection('Users').doc(email).get().then(doc => {
        if (doc.exists) {
            let rating = doc.data().rating
            return rating;
        }
    }).catch(err => {
        console.log(err)
    })

    return;
}

export const getRequests = (email) => {
    db.collection('Users').doc(email).get().then(doc => {
        if (doc.exists) {
            let requests = doc.data().requests
            return requests;
        }
    }).catch(err => {
        console.log(err)
    })

    return;
}