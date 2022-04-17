import { firebase, auth } from '../firebase'
const db = firebase.firestore()

export class DailyPlan {
    constructor(studentEmail = 'student email', coachEmail = 'coach email', checklistTasks = ['task 1', 'task 2'], checklistIsCompelted = [false, true]) {
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.checklistTasks = checklistTasks;
        this.checklistIsCompelted = checklistIsCompelted;
        this.date = new Date();
        console.log(this.coachEmail);
    }

    get = async (coachEmail, studentEmail) => {
        const userGeneralPlan = await db.collection('Daily Plans').get();
        return userGeneralPlan.query.where('emails', '==', [coachEmail, studentEmail]).limit(1).get()
    }

    post = async (plan) => {
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

    update = async (plan) => {
        const data = {
            checklist_tasks: plan.checklistTasks,
            checklist_iscompleted: plan.checklistIsCompelted,
            emails: [plan.coachEmail, plan.studentEmail],
            date: firebase.firestore.Timestamp.fromDate(plan.date)
        }

        const res = await db.collection('Daily Plans').doc(plan.id).update(data);
    }

    delete = async (plan) => {
        await db.collection('Daily Plans').doc(plan.id).delete();
    }

}

export default DailyPlan
