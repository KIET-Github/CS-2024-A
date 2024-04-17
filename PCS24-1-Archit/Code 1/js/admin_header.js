document.addEventListener('DOMContentLoaded', function () {
    // Get the query parameter from the URL ( format "?employeeId=XXXXXX")
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('employeeId');
  
    if (!employeeId || !isValidEmployeeId(employeeId)) {
      redirectToErrorPage();
      return;
    }
  
    const empIdElement = document.getElementById('emp-id');
    empIdElement.textContent = employeeId;
  
    const logoutButton = document.querySelector('.logout-button');
    logoutButton.addEventListener('click', function () {
      logout();
    });
  
    // Search for the employee data in the CSV file
    fetch('../csv/employee_data.csv')
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split('\n');
        for (const row of rows) {
          const [photo, name, email, empIdCSV, designation] = row.split(',');
          if (empIdCSV.trim() === employeeId) {
            const photoElement = document.querySelector('.photo-container img');
            photoElement.src = `../images/employee/${photo.trim()}`;
  
            const nameElement = document.getElementById('ename');
            nameElement.textContent = name.trim();
  
            const emailElement = document.getElementById('email');
            emailElement.textContent = email.trim();
  
            const designationElement = document.getElementById('e-designation');
            designationElement.textContent = designation.trim();
  
            return;
          }
        }
        redirectToErrorPage();
      })
      .catch((error) => {
        console.error('Error reading CSV file:', error);
        redirectToErrorPage();
      });
  
    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        event.preventDefault();
  
        const targetUrl = link.getAttribute('href');
  
        if (targetUrl === '../pages/login.html' || targetUrl.includes('logout')) {
          logout();
        } else {
          window.location.href = `${targetUrl}?employeeId=${employeeId}`;
        }
      });
    });
  });
  
  function isValidEmployeeId(id) {
    return id.trim() !== '';
  }
  
  function redirectToErrorPage() {
  //  window.location.href = '../pages/admin_error.html';
  }
  
  function logout() {
    sessionStorage.removeItem('employeeId');
  
    window.location.href = '../pages/login.html';
  }