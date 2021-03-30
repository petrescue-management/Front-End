import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBZOR3FERmrQ1ZoLUNShtBqphdXTZkCb2w",
    authDomain: "pet-rescue-fb.firebaseapp.com",
    projectId: "pet-rescue-fb",
    storageBucket: "pet-rescue-fb.appspot.com",
    messagingSenderId: "918318848462",
    appId: "1:918318848462:web:326b0953dd28ae60dbf39f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;