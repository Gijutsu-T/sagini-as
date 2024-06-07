import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
    import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
    import {   GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";


    // Firebase Initialization
    const firebaseConfig = {
      apiKey: "AIzaSyAMSSLJQDAzl-8S00d7wNMQ-dVSJKtgsic",
      authDomain: "saginialert.firebaseapp.com",
      databaseURL: "https://saginialert-default-rtdb.firebaseio.com",
      projectId: "saginialert",
      storageBucket: "saginialert.appspot.com",
      messagingSenderId: "583050302650",
      appId: "1:583050302650:web:9692156cf008b37dab5e83"
    };
    

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();


    document.getElementById('login-form').addEventListener('submit', function(event){
      event.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert('Account Created Successfully!');
          window.location.href = 'login.html';
          document.getElementById('login-form').reset();
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
          // ..
        });
    });
    const googleLogin = document.getElementById("google-id");
    googleLogin.addEventListener("click", function(){
      signInWithPopup(auth, provider)
        .then((result) => {
          // Google sign-in successful
          const user = result.user;
          console.log(user);
          alert('Google Sign-In Successful!');
          window.location.href = 'index.html';
          document.getElementById('login-form').reset();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(errorMessage);
        });
    });
    
    