import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export class DailyPlan {
    constuctor(studentEmail = 'student email', coachEmail = 'coach email', checklistTasks = [], checklistIsCompelted = []){
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.checklistTasks = checklistTasks;
        this.checklistIsCompelted = checklistIsCompelted;
        this.date = new Date();
    }

    setStudentEmail = async (email = auth.currentUser?.email) => {
        this.studentEmail = email;
    }

    setCoachEmail = async (email = auth.currentUser?.email) => {
        this.coachEmail = email;
    }
}

export const getDailyPlans = async (email) => {
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

export const addDailyPlan = async () => {
    const dailyPlansRef = db.collection('Daily Plans');
    const plan = new DailyPlan('abc@abc.com');
}

export const getChecklist = () => {
    //TODO:
    //how should I do this?
    //what should I return the checklist as? An array? a 2d array?
}