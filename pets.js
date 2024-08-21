import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push, set } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

const firebaseConfig = {
    apiKey: "AIzaSyAMSSLJQDAzl-8S00d7wNMQ-dVSJKtgsic",
    authDomain: "saginialert.firebaseapp.com",
    databaseURL: "https://saginialert-default-rtdb.firebaseio.com",
    projectId: "saginialert",
    storageBucket: "saginialert.appspot.com",
    messagingSenderId: "583050302650",
    appId: "1:583050302650:web:9692156cf008b37dab5e83"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const PetReportFormDB = ref(database, 'PetReportForm');

document.getElementById("MissingPetForm").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  // Get form values
  var name = getPetVal('pet-name');
  var type = getPetVal('pet-type');
  var breed = getPetVal('pet-breed');
  var color = getPetVal('pet-color');
  var lastseen = getPetVal('pet-last-seen');
  var lastdate = getPetVal('pet-last-date');
  var reporter = getPetVal('reporter-name');
  var reporterphone = getPetVal('reporter-phone');
  var reporteremail = getPetVal('reporter-email');

  savePetInfo(name, type, breed, color, lastseen, lastdate, reporter, reporterphone, reporteremail);
  document.querySelector('.alert').style.display = 'block';

  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  document.getElementById('MissingPetForm').reset();
}

const savePetInfo = (name, type, breed, color, lastseen, lastdate, reporter, reporterphone, reporteremail) => {
  const newPetInfo = push(PetReportFormDB);

  set(newPetInfo, {
    name: name,
    type: type,
    breed: breed,
    color: color,
    lastseen: lastseen,
    lastdate: lastdate,
    reporter: reporter,
    reporterphone: reporterphone,
    reporteremail: reporteremail,
  });
}

const getPetVal = (id) => {
  return document.getElementById(id).value;
}
