import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCcfTzOXDW0s7oyTNq3H7tQ9pbxBQeLUag",
    authDomain: "catch-of-the-day-7c92d.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-7c92d.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

//This is a named export

export { firebaseApp };

export default base;