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
}

function onCheck(){
  alert(1);
  var productId = document.getElementById(productId);
  alert(2);
  //go to database and check if it is a valid id
  var mysql = require('mysql');
  alert(3);
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "archit",
    database: "truecheck"
  
  });
  alert(4);
  connection.connect(function(err) {
    if (err) {
      alert(5);
    console.log("Connection Error!")
    }
  else {
    alert(6);
    console.log(`Database Connected`)
    connection.query(`SELECT COUNT(*) FROM truecheck.PRODUCT_DETAILS WHERE PRODUCT_ID = `+productId,onResult)
     
  }})
}

function onResult (err, result) {
  alert(7);
  connection.destroy();
  if (err){
    alert(8);
      console.log(`Error executing the query - ${err}`)}
  else if(result >= 0){
    alert(true);
  }
  alert(false);
}
document.getElementById("tab1").style.display = "block";
document.querySelector(".tab-button").classList.add("active");