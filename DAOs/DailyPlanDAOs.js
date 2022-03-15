import { getCurrentTimestamp } from 'react-native/Libraries/Utilities/createPerformanceLogger';
import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export class DailyPlan {
    static staticID = 0;

    constuctor(studentEmail = 'student email', coachEmail = 'coach email', checklistTasks = ['task 1', 'task 2'], checklistIsCompelted = [false, true]){
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.checklistTasks = checklistTasks;
        this.checklistIsCompelted = checklistIsCompelted;
        this.date = new Date();
        staticID += 1;
        this.id = staticID;

    }

    // This function puts the new daily plan in the database
    init = async () => {
        const data = {
            //checklist: [this.checklistTasks, this.checklistIsCompelted],
            emails: [this.coachEmail, this.studentEmail],
            //planDate: this.date.getTime()
        }

        const res = await db.collection('Daily Plans').doc(this.id).set(data);
        this.id = res.id;
        console.log(res);
    }

    setDate = async (date) => {
        this.date = date;
        const res = await db.collection('Daily Plans').doc(this.id).update({date: this.date});

    }
}

export const getDailyPlans = async (email) => {
    const dailyPlansRef = db.collection('Daily Plans');
    const snapshot = await dailyPlansRef.where('emails', 'array-contains', email).orderby('date').get();
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