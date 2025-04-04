document.addEventListener("DOMContentLoaded", () => {
    let currentUser = localStorage.getItem("currentUser") || "Guest";
    try {
      // Attempt to parse currentUser if it's a JSON string.
      currentUser = JSON.parse(currentUser);
      // Use the firstName property; default to "Guest" if not available.
      currentUser = currentUser.firstName || "Guest";
    } catch (error) {
      // If parsing fails, leave currentUser as it is.
    }
    document.getElementById("welcomeMessage").textContent = `Welcome to K-Fragrances, ${currentUser}!`;
});
