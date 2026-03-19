import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push, onChildAdded, update, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDig_wBEJqbJf44X15zxbI9-5e-TRNcTKg",
  authDomain: "project-c7a8c42f-cf98-4b6e-82c.firebaseapp.com",
  databaseURL: "https://project-c7a8c42f-cf98-4b6e-82c-default-rtdb.firebaseio.com",
  projectId: "project-c7a8c42f-cf98-4b6e-82c",
  storageBucket: "project-c7a8c42f-cf98-4b6e-82c.firebasestorage.app",
  messagingSenderId: "928822058212",
  appId: "1:928822058212:web:81fe04b3464206529c60f1",
  measurementId: "G-Z13ZTB32TX"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function createGuestRequest(guestId) {
  set(ref(db, 'requests/' + guestId), { guestId, active:true });
}

function sendMessage(chatId, sender, text) {
  push(ref(db, 'chats/' + chatId), { sender, text, time:Date.now() });
}

function listenMessages(chatId, callback) {
  onChildAdded(ref(db, 'chats/' + chatId), snapshot => callback(snapshot.val()));
}

function markGuestActive(guestId) {
  update(ref(db, 'requests/' + guestId), { active:true });
}

export { db, createGuestRequest, sendMessage, listenMessages, markGuestActive, ref, onValue };
