function openTab(tabName) {
    var i, tabContent, tabButtons;
  
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
  
    if (tabName === "reportTab") {
      populateTableWithCSVData();
    }
  }
  
  function populateTableWithCSVData() {
    fetch('../csv/report.csv')
      .then((response) => response.text())
      .then((data) => {
        const reportTableBody = document.getElementById('reportTableBody');
        const csvRows = data.split('\n');
  
        reportTableBody.innerHTML = '';
  
        for (let i = 1; i < csvRows.length; i++) {
          const csvCols = csvRows[i].split(',');
  
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${i}</td>
            <td>${csvCols[4]}</td> <!-- Ticket No -->
            <td>${csvCols[1]}</td> <!-- Product ID -->
            <td>${csvCols[2]}</td> <!-- Retailer ID -->
            <td>${csvCols[10]}</td> <!-- Ticket Status -->
            <td><button onclick="openTicketDetails(${i})">Open Ticket</button></td>
          `;
  
          reportTableBody.appendChild(row);
        }
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
      });
  }
  function openTicketDetails(ticketNo) {
    fetch('../csv/report.csv')
      .then((response) => response.text())
      .then((data) => {
        const csvRows = data.split('\n');
        if (ticketNo >= 1 && ticketNo <= csvRows.length - 1) {
          const csvCols = csvRows[ticketNo].split(',');
  
          document.getElementById("ticketImage").src = `../images/apparel/${csvCols[8]}`; // Image URL
          document.getElementById("uid").textContent = csvCols[0]; // UID
          document.getElementById("reportTime").textContent = csvCols[3]; // Report Time
          document.getElementById("customerName").textContent = csvCols[5]; // Customer Name
          document.getElementById("customerEmail").textContent = csvCols[6]; // Customer Email
          document.getElementById("message").textContent = csvCols[7]; // Message
          document.getElementById("shopName").textContent = csvCols[9]; // Shop Name
          document.getElementById("reason").textContent = csvCols[11]; // Reason
          document.getElementById("ticketStatus").textContent = csvCols[10]; // Ticket Status
  
          openTab("reportTab");
        }
      })
      .catch((error) => {
        console.error('Error fetching CSV data:', error);
      });
  }
  document.getElementById("reportTab").style.display = "block";
  document.querySelector(".tab-button[data-tab='reportTab']").classList.add("active");
  
  populateTableWithCSVData();