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
var reportFormDB = firebase.database().ref('reportForm');

document.getElementById('reportForm').addEventListener("submit",submitForm)


function submitForm(e) {
  e.preventDefault();

  // Get form values
 var name = getElementVal('name');
 var description = getElementVal('description');
 var location = getElementVal('location');
 var age = getElementVal('age');
 var gender = getElementVal('gender');
 var height = getElementVal('height');

  saveMessages( name,description,location,age,gender,height);
  document.querySelector('.alert').style.display = 'block';

  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  document.getElementById('reportForm').reset()

}


const saveMessages= ( name, description,location, age, gender,height) => {
  var newReportFormDB = reportFormDB.push();

  newReportFormDB.set({
    name: name,
    description: description,
    location: location,
    age: age,
    gender:gender,
    height:height,
});
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
  }

 