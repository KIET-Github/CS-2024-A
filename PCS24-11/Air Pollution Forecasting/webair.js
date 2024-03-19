document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // You can add your validation logic here

        // Example: Simple validation
        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Example: Sending data to a server
        // You can replace this with your own logic for handling the form data.
        // For now, we'll just display a success message.
        alert("Form submitted successfully!");
        contactForm.reset();
    });
});

