importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyBZOR3FERmrQ1ZoLUNShtBqphdXTZkCb2w",
    authDomain: "pet-rescue-fb.firebaseapp.com",
    projectId: "pet-rescue-fb",
    storageBucket: "pet-rescue-fb.appspot.com",
    messagingSenderId: "918318848462",
    appId: "1:918318848462:web:326b0953dd28ae60dbf39f"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});