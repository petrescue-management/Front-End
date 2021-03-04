import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";
import firebase from 'firebase';
import * as ElementUI from 'element-ui';
// import * as VueGoogleMaps from 'vue2-google-maps'
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
// Vue.use(VueGoogleMaps, {
//     load: {
//         key: 'AIzaSyAZ4pja68qoa62hCzFdlmAu30iAb_CgmTk',
//         libraries: "places"
//     },
//     installComponents: true
// })

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