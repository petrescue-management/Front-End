import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDqHG6VBmDp9NCRzA8cH84CkwPL3X1vNck",
    authDomain: "petrescue-efe22.firebaseapp.com",
    databaseURL: "https://petrescue-efe22-default-rtdb.firebaseio.com",
    projectId: "petrescue-efe22",
    storageBucket: "petrescue-efe22.appspot.com",
    messagingSenderId: "1010947716602",
    appId: "1:1010947716602:web:a125904e617a79acca6043"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;