$(document).ready(function() {
    // Firebase Configuration
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
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.database();

    // Form Submission
    $("#missing-item-form").on("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        const requiredFields = $("[required]");

        requiredFields.each(function() {
            if (!$.trim($(this).val())) {
                isValid = false;
                $(this).addClass("error");
            } else {
                $(this).removeClass("error");
            }
        });

        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }

        const data = {};
        $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
        });

        // Store data in Firebase
        const newReportRef = db.ref("missing-items").push();
        newReportRef.set(data)
        .then(() => {
            alert("Report submitted successfully!");
            $("#missing-item-form")[0].reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while submitting the report.");
        });
    });
});
