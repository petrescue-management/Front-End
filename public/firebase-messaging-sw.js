importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

var firebaseConfig = {
    apiKey: "AIzaSyAOYgRWxir39_MiNbXeYBBWMgL7EG6T7iA",
    authDomain: "pet-rescue-58782.firebaseapp.com",
    projectId: "pet-rescue-58782",
    storageBucket: "pet-rescue-58782.appspot.com",
    messagingSenderId: "334911547930",
    appId: "1:334911547930:web:300883a8f882994c9c3fa3"
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