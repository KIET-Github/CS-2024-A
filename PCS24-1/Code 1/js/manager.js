// $(document).ready(function () {
//   $("#getDataBtn").click(function () {
//       // Make an AJAX request to the server when the button is clicked
//       $.ajax({
//           url: 'http://localhost:5000/add_admin',
//           type: 'POST',
//           success: function (response) {
//               // Handle the response from the server
              
//               var respJSON = JSON.parse(response)
//               console.log(respJSON)
//               alert(respJSON[0].emp_id)
//              console.log(respJSON[0].emp_id);
//           },
//           error: function (error) {
//               alert(2)
//               console.error(error);
//           }
//       });
//   });
// });



const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

function openTab(tabName) {
  tabContents.forEach(content => {
    content.classList.remove('active');
  });

  tabButtons.forEach(button => {
    button.classList.remove('active');
  });

  const selectedTab = document.getElementById(tabName);
  if (selectedTab) {
    selectedTab.classList.add('active');
    const correspondingButton = document.querySelector(`[onclick="openTab('${tabName}')"]`);
    if (correspondingButton) {
      correspondingButton.classList.add('active');
    }
  }
}

tabButtons.forEach(button => {
  button.addEventListener('click', function () {
    const tabName = this.getAttribute('onclick').match(/\('.*?'\)/)[0].slice(2, -2);
    openTab(tabName);
  });
});

openTab('addEmployeeTab');
