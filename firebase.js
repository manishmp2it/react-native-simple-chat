import {initializeApp} from "firebase/app"
import { Auth, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native/';
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyBtA3rt3O9dZg2vDPymahgCj5bnXCE5uUc",
    authDomain: "signal-clone-a3c25.firebaseapp.com",
    projectId: "signal-clone-a3c25",
    storageBucket: "signal-clone-a3c25.appspot.com",
    messagingSenderId: "139930149521",
    appId: "1:139930149521:web:1d48e8c9ea5de3dff11530",
    measurementId: "G-1R89MR7QPS",
  };

  let app=initializeApp(firebaseConfig)

  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  const db=getFirestore(app)

  export {db,auth}
