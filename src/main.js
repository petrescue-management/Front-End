import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store/index";
import firebase from './firebase';
import * as ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import * as VueGoogleMaps from 'vue2-google-maps'
import 'element-ui/lib/theme-chalk/index.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import '@/assets/sass/light-bootstrap-dashboard.scss'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import VueSelectImage from 'vue-select-image'


// add stylesheet
require('vue-select-image/dist/vue-select-image.css')
require('vue-it-bigger/dist/vue-it-bigger.min.css')
Vue.prototype.$store = store;
Vue.config.productionTip = false
Vue.use(ElementUI, { locale });
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueSelectImage)
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyBsvVQXdBTdwTxP3jNco77FjF1oDnbypc4',
        libraries: "places"
    },
    installComponents: true
})

const messaging = firebase.messaging();
messaging.requestPermission()
    .then(() => {
        return messaging.getToken();
    })
    .then((token) => {
        console.log(token)
    })

if ('serviceWorker' in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
        console.log('Service worker registration succeeded:', registration);

        // At this point, you can optionally do something
        // with registration. See https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration
    }).catch(function(error) {
        console.log('Service worker registration failed:', error);
    });

    // Independent of the registration, let's also display
    // information about whether the current page is controlled
    // by an existing service worker, and when that
    // controller changes.

    // First, do a one-off check if there's currently a
    // service worker in control.
    if (navigator.serviceWorker.controller) {
        console.log('This page is currently controlled by:', navigator.serviceWorker.controller);
    }

    // Then, register a handler to detect when a new or
    // updated service worker takes control.
    navigator.serviceWorker.oncontrollerchange = function() {
        console.log('This page is now controlled by:', navigator.serviceWorker.controller);
    };
} else {
    console.log('Service workers are not supported.');
}
new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')