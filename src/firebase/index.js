
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'



const firebaseConfig = {
  apiKey: 'AIzaSyBBfptJKt6ubxb-hdj-4uBcwOiUQKJHFKE',
  authDomain: 'mebsoftware-v.firebaseapp.com',
  projectId: 'mebsoftware-v',
  storageBucket: 'mebsoftware-v.appspot.com',
  messagingSenderId: '46002841210',
  appId: '1:46002841210:web:20e6d43f70bc1e541f7dc3'
}


const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

export{
    db
}