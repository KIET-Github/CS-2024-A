const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const employeeId = document.getElementById("employee-id").value;
  const password = document.getElementById("password").value;
  // alert("here")
  fetch("../csv/credentials.csv")
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n");
      for (const row of rows) {
        const [storedEmployeeId, storedPassword] = row.split(",");
        if (employeeId === storedEmployeeId.trim() && password === storedPassword.trim()) {
          redirectToDashboard(employeeId);
          return;
        }
      }
      showErrorMessage();
    })
    .catch((error) => {
      console.error("Error reading CSV file:", error);
    });
});

function showSuccessMessage() {
  window.alert("Login successful!");
}

function showErrorMessage() {
  window.alert("Invalid credentials. Please try again.");
}

function redirectToDashboard(employeeId) {
  const firstThreeLetters = employeeId.slice(0, 3);
  showSuccessMessage();
 
  switch (firstThreeLetters) {
    case "000":
      window.location.href = `../pages/super_admin.html?employeeId=${employeeId}`;
      break;
    case "100":
      window.location.href = `../pages/product_controller.html?employeeId=${employeeId}`;
      break;
    case "200":
      window.location.href = `../pages/feedback_admin.html?employeeId=${employeeId}`;
      break;
    case "300":
      window.location.href = `../pages/manager.html?employeeId=${employeeId}`;
      break;
    case "400":
      window.location.href = `../pages/delivery.html?employeeId=${employeeId}`;
      break;
    default:
      break;
  }
}

function togglePasswordVisibility(show) {
  const passwordInput = document.getElementById("password");
  const passwordToggle = document.querySelector(".password-toggle");
  const eyeIcon = passwordToggle.querySelector("i");

  if (show) {
    passwordInput.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    passwordInput.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }

  const capsLockWarning = document.getElementById("caps-lock-warning");
  passwordInput.addEventListener("keyup", function (event) {
    if (event.getModifierState && event.getModifierState("CapsLock")) {
      capsLockWarning.style.display = "block";
    } else {
      capsLockWarning.style.display = "none";
    }
  });
}