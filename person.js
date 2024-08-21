	document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        const requiredFields = form.querySelectorAll("[required]");

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add("error");
            } else {
                field.classList.remove("error");
            }
        });

        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Replace with server endpoint
        fetch('https://saginialert-default-rtdb.firebaseio.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(result => {
            alert("Report submitted successfully!");
            form.reset(); 
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while submitting the report.");
        });
    });
});