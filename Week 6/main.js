import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  set,
  get,
  ref,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyApABUleF_0SM44QbQmsiQCFeg4PDe51CM",
  authDomain: "mobile-app-e97ef.firebaseapp.com",
  databaseURL: "https://mobile-app-e97ef-default-rtdb.firebaseio.com",
  projectId: "mobile-app-e97ef",
  storageBucket: "mobile-app-e97ef.firebasestorage.app",
  messagingSenderId: "580998922360",
  appId: "1:580998922360:web:1a81a7603400c9be65ad8d",
  measurementId: "G-L2L1JVZNZ3",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log(db);

// ✅ CREATE
function writeUserData(
  userId,
  firstname,
  lastname,
  email,
  age,
  phone,
  city,
  country,
  gender,
  occupation,
) {
  const usersRef = ref(db, "users/" + userId);
  set(usersRef, {
    firstname: firstname,
    lastname: lastname,
    email: email,
    age: age,
    phone: phone,
    city: city,
    country: country,
    gender: gender,
    occupation: occupation,
  })
    .then(() => {
      console.log("✅ User added successfully with ID:", userId);
      alert("✅ User " + userId + " added!");
    })
    .catch((error) => {
      console.error("❌ Error adding user:", error);
    });
}
window.writeUserData = writeUserData;

// ✅ READ ALL
function readUser() {
  const userRef = ref(db, "users");
  get(userRef).then((snapshot) => {
    snapshot.forEach((childsnapshot) => {
      console.log(childsnapshot.val());
    });
  });
}
window.readUser = readUser;

// ✅ READ ONE
function readUserById(userId) {
  const userRef = ref(db, "users/" + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    console.log("User found:", user);
    document.getElementById("read-result").textContent =
      "Name: " +
      user.firstname +
      " " +
      user.lastname +
      " | Email: " +
      user.email +
      " | Age: " +
      user.age +
      " | Phone: " +
      user.phone +
      " | City: " +
      user.city +
      " | Country: " +
      user.country +
      " | Gender: " +
      user.gender +
      " | Occupation: " +
      user.occupation;
  });
}
window.readUserById = readUserById;

// ✅ FETCH FOR UPDATE
function fetchUserForUpdate(userId) {
  const userRef = ref(db, "users/" + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    document.getElementById("update-firstname").value = user.firstname;
    document.getElementById("update-lastname").value = user.lastname;
    document.getElementById("update-email").value = user.email;
    document.getElementById("update-age").value = user.age;
    document.getElementById("update-phone").value = user.phone;
    document.getElementById("update-city").value = user.city;
    document.getElementById("update-country").value = user.country;
    document.getElementById("update-gender").value = user.gender;
    document.getElementById("update-occupation").value = user.occupation;
    console.log("Loaded user into form:", user);
  });
}
window.fetchUserForUpdate = fetchUserForUpdate;

// ✅ UPDATE
function updateUserData(userId, updatedData) {
  const userRef = ref(db, "users/" + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("✅ User updated successfully");
      alert("✅ User " + userId + " updated!");
    })
    .catch((error) => {
      console.error("❌ Error updating user:", error);
    });
}
window.updateUserData = updateUserData;

// ✅ DELETE
function deleteUserData(userId) {
  const userRef = ref(db, "users/" + userId);
  remove(userRef)
    .then(() => {
      console.log("✅ User deleted successfully");
      alert("✅ User " + userId + " deleted!");
    })
    .catch((error) => {
      console.error("❌ Error deleting user:", error);
    });
}
window.deleteUserData = deleteUserData;
