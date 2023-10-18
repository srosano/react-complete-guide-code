import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase, onValue, ref, set} from "firebase/database";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  // The value of `databaseURL` depends on the location of the database
  databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  measurementId: REACT_APP_MEASUREMENT_ID,
};


const firebase_app = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase_app);
const auth = getAuth(firebase_app);
const database = getDatabase(firebase_app);





export {
  firestore,
  auth,
  database,
  signInAnonymously,
  onValue,
  ref,
  set,
};
