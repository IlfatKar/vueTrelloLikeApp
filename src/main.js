import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase/app";
import VueToast from "vue-toast-notification";
import "./assets/css/main.css";
import "vue-toast-notification/dist/theme-default.css";

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCaDvny4ni_HqvnYnVJiImUYGnBZGvw3dM",
  authDomain: "trello-61724.firebaseapp.com",
  databaseURL: "https://trello-61724-default-rtdb.firebaseio.com",
  projectId: "trello-61724",
  storageBucket: "trello-61724.appspot.com",
  messagingSenderId: "362162602999",
  appId: "1:362162602999:web:95075fb6295a18703824f2",
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.use(VueToast);
