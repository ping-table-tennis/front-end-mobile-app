import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export class DailyPlan {
    constructor(studentEmail = 'student email', coachEmail = 'coach email', checklistTasks = ['task 1', 'task 2'], checklistIsCompelted = [false, true]){
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.checklistTasks = checklistTasks;
        this.checklistIsCompelted = checklistIsCompelted;
        this.date = new Date();

        console.log(this.coachEmail);
    }
}

// This function puts the new daily plan in the database
export const init = async (plan) => {
    const data = {
        checklist_tasks: plan.checklistTasks,
        checklist_iscompleted: plan.checklistIsCompelted,
        emails: [plan.coachEmail, plan.studentEmail],
        date: firebase.firestore.Timestamp.fromDate(plan.date)
    }

    const res = await db.collection('Daily Plans').add(data);
    plan.id = res.id;
    console.log(res.id);
}

// Regardless of what has been updated in the DAO, the entire object in firestore will be updated
export const updateDailyPlan = async (plan) => {
    const data = {
        checklist_tasks: plan.checklistTasks,
        checklist_iscompleted: plan.checklistIsCompelted,
        emails: [plan.coachEmail, plan.studentEmail],
        date: firebase.firestore.Timestamp.fromDate(plan.date)
    }

    const res = await db.collection('Daily Plans').doc(plan.id).update(data);
}

export const deleteDailyPlan = async (plan) => {
    await db.collection('Daily Plans').doc(plan.id).delete();
}

// gets the daily plans for either the the coach email or the student email.
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