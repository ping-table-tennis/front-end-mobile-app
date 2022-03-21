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
        student_email: plan.studentEmail,
        coach_email: plan.coachEmail
    }

    const res = await db.collection('General Plans').doc(plan.id).set(data);
    if(res.id === plan.id){
        console.log('successfully added to database')
    }
}