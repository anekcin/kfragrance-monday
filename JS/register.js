document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Getting form values
        const firstName = document.getElementById("firstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const dob = document.getElementById("dob").value;
        const gender = document.getElementById("gender").value;
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;
        const dateRegistered = new Date().toISOString().split('T')[0];

        // Validate age
        const birthDate = new Date(dob);
        let age = new Date().getFullYear() - birthDate.getFullYear();
        const monthDiff = new Date().getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            alert("You must be at least 18 years old to register.");
            return;
        }

        // Validate TRN format
        const trnPattern = /^\d{3}-\d{3}-\d{3}$/;
        if (!trnPattern.test(trn)) {
            alert("Invalid TRN format. Please use the format 000-000-000.");
            return;
        }

        // Check TRN uniqueness
        let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
        if (users.some(user => user.trn === trn)) {
            alert("This TRN is already registered. Please use a unique TRN.");
            return;
        }

        // Storing user data
        const newUser = {
            firstName,
            lastName,
            dob,
            gender,
            phone,
            email,
            trn,
            password,
            dateRegistered,
            cart: {},
            invoices: []
        };
        users.push(newUser);
        localStorage.setItem("RegistrationData", JSON.stringify(users));

        //for welcome page
        localStorage.setItem("currentUser", JSON.stringify(newUser));

        alert("Registration successful!");
        window.location.href = "./welcome.html";
    });
});
