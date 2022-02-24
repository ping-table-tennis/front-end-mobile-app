import { firebase, auth } from '../firebase'

const db = firebase.firestore()

// Get all daily plans which match given email
export const getDailyPlans = (email) => {
    const dailyPlansRef = db.collection('Daily Plans');
    const snapshot = await dailyPlansRef.where('emails', 'array-contains', email).get();
    const userDailyPlans = [];

    if(snapshot.empty){
        console.log('No Daily Plans for ', email);
    }
    else {
        snapshot.forEach(doc => {
            userDailyPlans.push(doc.data());
        });
    }

    return userDailyPlans;
}

export const getChecklist = () => {
    //TODO:
    //how should I do this?
    //what should I return the checklist as? An array? a 2d array?
}