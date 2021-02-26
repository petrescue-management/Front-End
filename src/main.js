import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";
import firebase from 'firebase';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

var firebaseConfig = {
    apiKey: "AIzaSyAOYgRWxir39_MiNbXeYBBWMgL7EG6T7iA",
    authDomain: "pet-rescue-58782.firebaseapp.com",
    projectId: "pet-rescue-58782",
    storageBucket: "pet-rescue-58782.appspot.com",
    messagingSenderId: "334911547930",
    appId: "1:334911547930:web:300883a8f882994c9c3fa3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(() => {
        return messaging.getToken();
    })
    .then((token) => {
        console.log(token)
    })

messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
    // ...
});
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')