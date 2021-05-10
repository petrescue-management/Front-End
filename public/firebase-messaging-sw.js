importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyDqHG6VBmDp9NCRzA8cH84CkwPL3X1vNck",
    authDomain: "petrescue-efe22.firebaseapp.com",
    databaseURL: "https://petrescue-efe22-default-rtdb.firebaseio.com",
    projectId: "petrescue-efe22",
    storageBucket: "petrescue-efe22.appspot.com",
    messagingSenderId: "1010947716602",
    appId: "1:1010947716602:web:a125904e617a79acca6043"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Received background message ', payload);

});