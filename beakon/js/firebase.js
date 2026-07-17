import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
} from "https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDAnJlge1JYrRm2TtqKDbGOSEyF6xTxhKQ",
  authDomain: "beakon-nepal.firebaseapp.com",
  projectId: "beakon-nepal",
  storageBucket: "beakon-nepal.firebasestorage.app",
  messagingSenderId: "139136976426",
  appId: "1:139136976426:web:2de9b5931d5e966eaca553",
  databaseURL: "https://beakon-nepal-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, set };
