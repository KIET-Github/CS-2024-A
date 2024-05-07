document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Example: Simple validation
        if (name.trim() === "" || email.trim() === "" || message.trim() === "") {
            alert("Please fill in all fields.");
            return;
        }

        // Example: Sending data to a server
        // Replace this with your own logic for handling form data.
        // For now, we'll just display a success message.
        const successMessage = `Thank you, ${name}! Your message has been sent.`;
        confirmationMessage.textContent = successMessage;
        contactForm.reset();
    });
});
