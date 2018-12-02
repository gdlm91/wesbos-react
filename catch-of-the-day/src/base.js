import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDOtzYY31ZUh78wJXTEb8_682ffEcsxPbo",
  authDomain: "wesbos-react-6007f.firebaseapp.com",
  databaseURL: "https://wesbos-react-6007f.firebaseio.com",
  projectId: "wesbos-react-6007f",
  storageBucket: "wesbos-react-6007f.appspot.com",
  messagingSenderId: "652788733312"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
