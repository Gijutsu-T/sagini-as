const firebaseConfig = {
    apiKey: "AIzaSyAMSSLJQDAzl-8S00d7wNMQ-dVSJKtgsic",
    authDomain: "saginialert.firebaseapp.com",
    databaseURL: "https://saginialert-default-rtdb.firebaseio.com",
    projectId: "saginialert",
    storageBucket: "saginialert.appspot.com",
    messagingSenderId: "583050302650",
    appId: "1:583050302650:web:9692156cf008b37dab5e83"
  };

firebase.initializeApp(firebaseConfig);
var CarReportFormDB = firebase.database().ref('CarReportForm');

document.getElementById('CarReportForm').addEventListener("submit", submitForm)

function submitForm(e) {
  e.preventDefault();

   // Get form values
   var name = getCarVal('name');
   var description = getCarVal('description');
  var location = getCarVal('location');
  var model = getCarVal('carModel');
  var color = getCarVal('carColor');

  saveCarInfo(name,description,location, model, color);
  document.querySelector('.alert').style.display = 'block';

  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
   }, 3000);

   document.getElementById('carReportForm').reset()
}

const saveCarInfo = (name,description,location, model, color) => {
   var newCarInfo = CarReportFormDB.push();

    newCarInfo.set({
     name: name,
     description: description,
     location: location,
     model: model,
     color: color,
    });
    }

const getCarVal = (id) => {
return document.getElementById(id).value;
}