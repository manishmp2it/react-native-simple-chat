import {initializeApp} from "firebase/app"
// import {Firestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";
import { getDatabase, ref, set } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
// import "firebase/firestore";
// import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBtA3rt3O9dZg2vDPymahgCj5bnXCE5uUc",
    authDomain: "signal-clone-a3c25.firebaseapp.com",
    projectId: "signal-clone-a3c25",
    storageBucket: "signal-clone-a3c25.appspot.com",
    messagingSenderId: "139930149521",
    appId: "1:139930149521:web:1d48e8c9ea5de3dff11530",
    measurementId: "G-1R89MR7QPS"
  };

  let app=initializeApp(firebaseConfig)
  const auth = getAuth(app);
  const db=getFirestore(app)

  export {db,auth}
