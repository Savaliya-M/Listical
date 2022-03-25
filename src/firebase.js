import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyCm-JoxO1u4zFDSXjoM6fpEJpIWPN-iHlw",
  authDomain: "listical-da0c8.firebaseapp.com",
  databaseURL: "https://listical-da0c8-default-rtdb.firebaseio.com",
  projectId: "listical-da0c8",
  storageBucket: "listical-da0c8.appspot.com",
  messagingSenderId: "231628120016",
  appId: "1:231628120016:web:229c5140100cde45a8e3d5"
};

const app = firebase.initializeApp(firebaseConfig);
const appRef = app.database().ref();

export default appRef;