import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

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

// ✅ ONE clean function with 10 fields
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
  set(ref(db, "users/" + userId), {
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
      console.log(`✅ User ${userId} - ${firstname} ${lastname} added!`);
    })
    .catch((error) => {
      console.error("❌ Error:", error);
    });
}

// ✅ 10 Users
writeUserData(
  1,
  "Abiral",
  "Khanal",
  "abiral@gmail.com",
  21,
  "9801234567",
  "Kathmandu",
  "Nepal",
  "Male",
  "Student",
);
writeUserData(
  2,
  "Riya",
  "Ojha",
  "riya@gmail.com",
  22,
  "9802345678",
  "Kanchanpur",
  "Nepal",
  "Female",
  "Teacher",
);
writeUserData(
  3,
  "Saugat",
  "Chand",
  "saugat@gmail.com",
  23,
  "9803456789",
  "Baitadi",
  "Nepal",
  "Male",
  "Engineer",
);
writeUserData(
  4,
  "Unik",
  "Bhandari",
  "unik@gmail.com",
  20,
  "9804567890",
  "Kavre",
  "Nepal",
  "Male",
  "Nurse",
);
writeUserData(
  5,
  "Hari",
  "Gurung",
  "hari@gmail.com",
  25,
  "9805678901",
  "Butwal",
  "Nepal",
  "Male",
  "Doctor",
);
writeUserData(
  6,
  "Maya",
  "Tamang",
  "maya@gmail.com",
  19,
  "9806789012",
  "Dharan",
  "Nepal",
  "Female",
  "Student",
);
writeUserData(
  7,
  "Bikash",
  "Shrestha",
  "bikash@gmail.com",
  24,
  "9807890123",
  "Chitwan",
  "Nepal",
  "Male",
  "Developer",
);
writeUserData(
  8,
  "Priya",
  "Maharjan",
  "priya@gmail.com",
  22,
  "9808901234",
  "Bhaktapur",
  "Nepal",
  "Female",
  "Designer",
);
writeUserData(
  9,
  "Suraj",
  "Basnet",
  "suraj@gmail.com",
  26,
  "9809012345",
  "Hetauda",
  "Nepal",
  "Male",
  "Accountant",
);
writeUserData(
  10,
  "Anita",
  "Magar",
  "anita@gmail.com",
  21,
  "9800123456",
  "Janakpur",
  "Nepal",
  "Female",
  "Banker",
);
// ✅ READ - Get all users
function readAllUsers() {
  const userRef = ref(db, "users");
  get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          const user = childSnapshot.val();
          console.log(`👤 User ${childSnapshot.key}:`, user);
        });
      } else {
        console.log("No data found");
      }
    })
    .catch((error) => {
      console.error("❌ Error reading:", error);
    });
}

readAllUsers();
