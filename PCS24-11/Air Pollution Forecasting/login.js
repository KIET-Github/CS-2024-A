document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginError = document.getElementById("login-error");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Example: Simple validation
        if (username.trim() === "" || password.trim() === "") {
            loginError.textContent = "Please fill in both fields.";
            return;
        }

        // Example: Check username and password (replace with your own logic)
        if (username === "user" && password === "password") {
            // Successful login
            loginError.textContent = "Login successful!";
        } else {
            // Failed login
            loginError.textContent = "Invalid username or password.";
        }
    });
});
