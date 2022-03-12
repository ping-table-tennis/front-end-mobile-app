import { firebase, auth } from '../firebase'

const db = firebase.firestore()

export class DailyPlan {
    constuctor(studentEmail = 'student email', coachEmail = 'coach email', checklist = []){
        this.studentEmail = studentEmail;
        this.coachEmail = coachEmail;
        this.checklist = checklist;
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
    await dailyPlansRef.doc().set(Object.assign({}, plan))

    const snapshot = await dailyPlansRef.get();
    const plansMap = snapshot.docs.map(doc => doc.data());
    console.log(plansMap);

    // const postConverter = {
    //     toFirestore(post: Post): firebase.firestore.DocumentData {
    //       return {title: post.title, author: post.author};
    //     },
    //     fromFirestore(
    //       snapshot: firebase.firestore.QueryDocumentSnapshot,
    //       options: firebase.firestore.SnapshotOptions
    //     ): Post {
    //       const data = snapshot.data(options)!;
    //       return new Post(data.title, data.author);
    //     }
    //   };
      
    //   const postSnap = await firebase.firestore()
    //     .collection('posts')
    //     .withConverter(postConverter)
    //     .doc().get();
    //   const post = postSnap.data();
    //   if (post !== undefined) {
    //     post.title; // string
    //     post.toString(); // Should be defined
    //     post.someNonExistentProperty; // TS error
    //   }
}

export const getChecklist = () => {
    //TODO:
    //how should I do this?
    //what should I return the checklist as? An array? a 2d array?
}