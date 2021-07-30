import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
   apiKey: "AIzaSyChm_PajjT02Pos-56_tXjyUv0BC5jmau4",
   authDomain: "to-do-list-55ba0.firebaseapp.com",
   projectId: "to-do-list-55ba0",
   storageBucket: "to-do-list-55ba0.appspot.com",
   messagingSenderId: "152772923322",
   appId: "1:152772923322:web:69b29027d9af537cd69783"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }