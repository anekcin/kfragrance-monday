document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();

        // Get input values
        const trn = document.getElementById("trn").value.trim();
        const password = document.getElementById("password").value;

        // Retrieve registered users from localStorage
        let users = JSON.parse(localStorage.getItem("RegistrationData")) || [];
        
        // Find matching user
        const user = users.find(user => user.trn === trn && user.password === password);
        
        if (user) {
            // Store current user's first name in localStorage for the welcome page
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "../public/product.html";
          } else {
            alert("Invalid TRN or password. Please try again.");
          }
    });
});
