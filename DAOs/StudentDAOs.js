import { firebase, auth } from '../firebase'
const db = firebase.firestore()


class Student {
    constructor() {
    }

    get = async (coach) => {
        const userGeneralPlan = await db.collection('Students').get();
        return userGeneralPlan.query.where('coach', '==', coach).get()
    }
}



export default Student