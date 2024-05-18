<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "test";
$conn = new mysqli($servername, $username, $password,$dbname);


//Connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  echo "Connected successfully";


//File read
$jsonData = file_get_contents('products.json');
$data = json_decode($jsonData, true);

if ($data === null) {
    die("Error decoding JSON data");
}

// Get keys for table columns
$keys = array_keys($data[0]);




$regex="/^[a-zA-Z_][a-zA-Z0-9_]*$/";


// Generate table creation query
$tableName = "json2222"; // You can change the table name here


$tableCreateQuery = "CREATE TABLE $tableName (";
$x=0;
foreach ($keys as $key) {
    if(preg_match($regex, $key)==1)
    {
        $tableCreateQuery .= "$key VARCHAR(255), ";
    }
    else
    {
        $tableCreateQuery .= "ColumnNo".$x." VARCHAR(255), ";
     
    }
   $x++;
}
$tableCreateQuery = rtrim($tableCreateQuery, ", ");
$tableCreateQuery .= ")";

//Creating Table query
if ($conn->query($tableCreateQuery) === TRUE) {
    echo "New record created successfully \n";
} else {
    echo "Error: " . $tableCreateQuery . "<br>" . $conn->error;
}

// creating insert query
foreach ($data as $row) {
    $insertQuery = "INSERT INTO $tableName ";
    $values = "";
    foreach ($keys as $key) {
        $values .= "'" . $row[$key] . "', ";
    }
    $insertQuery = rtrim($insertQuery, ", ") . " VALUES (" . rtrim($values, ", ") . ")";
   
    if ($conn->query($insertQuery) === TRUE) {
        echo "New record created successfully \n";
   } else {
      echo "Error: " . $insertQuery . "<br>" . $conn->error;
      break;
   }
}

 ?>