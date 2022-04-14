import { firebase, auth } from '../firebase'
const db = firebase.firestore()

class GeneralPlan {
    constructor(strengths = [], weaknesses = [], studentEmail = 'student1@student.com', coachEmail = 'coach@coach.com') {
        this.strengths = strengths;
        this.weaknesses = weaknesses;
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.id = this.studentEmail + this.coachEmail;
    }

    post = async (plan) => {
        const data = {
            strengths: plan.strengths,
            weaknesses: plan.weaknesses,
            emails: [plan.coachEmail, plan.studentEmail]
        }

        const res = await db.collection('General Plans').doc(plan.id).set(data);
        if (res.id === plan.id) {
            console.log('successfully added to database')
        }
    }

    get = async (coachEmail, studentEmail) => {
        const userGeneralPlan = await db.collection('General Plans').get();
        return userGeneralPlan.query.where('emails', '==', [coachEmail, studentEmail]).limit(1).get()
    }

    update = async (plan) => {
        const data = {
            strengths: plan.strengths,
            weaknesses: plan.weaknesses,
            emails: [plan.coachEmail, plan.studentEmail]
        }
        const res = await db.collection('General Plans').doc(plan.id).update(data);
    }

    delete = async (plan) => {
        await db.collection('General Plans').doc(plan.id).delete();
    }
}

export default GeneralPlan
