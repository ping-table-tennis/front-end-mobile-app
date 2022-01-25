import * as firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDtW3e_WVrh80YjG87_-w6T2GJJyhpTC-Y",
  authDomain: "pingtt-584c4.firebaseapp.com",
  projectId: "pingtt-584c4",
  storageBucket: "pingtt-584c4.appspot.com",
  messagingSenderId: "408950196090",
  appId: "1:408950196090:web:e05ec7d9fc49af0c8cf8c3",
  measurementId: "G-SRLPWK25W5"
};

// Initialize Firebase
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth }
