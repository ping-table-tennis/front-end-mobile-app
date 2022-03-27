import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export class GeneralPlan {
    constructor(strengths = [], weaknesses = [], studentEmail = 'student@student.com', coachEmail = 'coach@coach.com'){
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.id = this.studentEmail + this.coachEmail;
    }
}

export const init = async (plan) => {
    const data = {
        strengths: plan.strengths,
        weaknesses: plan.weaknesses,
        emails: [plan.coachEmail, plan.studentEmail]
    }

    const res = await db.collection('General Plans').doc(plan.id).set(data);
    if(res.id === plan.id){
        console.log('successfully added to database')
    }
}

export const deleteGeneralPlan = async (plan) => {
    await db.collection('General Plans').doc(plan.id).delete();
}

export const updateGenralPlan = async (plan) => {
    const data = {
        strengths: plan.strengths,
        weaknesses: plan.weaknesses,
        emails: [plan.coachEmail, plan.studentEmail]
    }

    const res = await db.collection('General Plans').doc(plan.id).update(data);
}

// gets the general plan for the the coach email and the student email.
export const getGeneralPlan = async (studentEmail, coachEmail) => {
    idstr = studentEmail + coachEmail
    const userGeneralPlan = await db.collection('General Plans').doc(idstr).get();

    return userGeneralPlan;
}