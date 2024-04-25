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
if (($open = fopen("Accenture.csv", "r")) !== FALSE)
// table name
$table_name="test_table_100132";


$regex="/^[a-zA-Z_][a-zA-Z0-9_]*$/";
{
  $first_time=true;//check for first time for adding columns
	while (($data = fgetcsv($open, 1000, ",")) !== FALSE)
	{		
           if($first_time==true){//Code to create table
          $temp_query="";
          $data_type=" varchar(255)";
          $data_sql="INSERT INTO $table_name(";
            $column=count($data);
            $index=0;
            for ($x = 0; $x < $column; $x++) {
              if($data[$x]!="")
              {
                if(preg_match($regex, $data[$x])==1)
                {
                  $temp_query=$temp_query.$data[$x].$data_type; //query for creating columns and table
                  $data_sql=$data_sql."`".$data[$x]."`";//for generating data entry query for column name
                }
                else
                {
                  $temp_query=$temp_query."ColumnNo".$x.$data_type; //query for creating columns and table
                  $data_sql=$data_sql."`"."ColumnNo".$x."`";//for generating data entry query for column name
                }
               
              }
              else
              {
                $temp_query=$temp_query."Temp_Value".$x.$data_type; //If column name is empty
              }

              
              if(($x+1)<$column){// adding commas between query
                $temp_query=$temp_query.",";
                $data_sql=$data_sql.",";
              }
              
            }
           
            $sql="CREATE TABLE ".$table_name."(".$temp_query.")";
            if ($conn->query($sql) === TRUE) {
              echo "Table Created Successfully!";
          } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
          }
            $first_time=false;
            $data_sql=$data_sql.") VALUES (";
           }
            else{
                $temp_sql=$data_sql;
                for ($x = 0; $x < $column; $x++) {
                  $temp_sql=$temp_sql.'"'.$data[$x].'"';
                  if(($x+1)<$column){
                    $temp_sql=$temp_sql.",";
                  }
                  
                }
                $temp_sql=$temp_sql.")";
                
                if ($conn->query($temp_sql) === TRUE) {
                     echo "New record created successfully";
                } else {
                   echo "Error: " . $temp_sql . "<br>" . $conn->error;
                   break;
                }

            }

	}
  echo "Success";

	fclose($open);
}

 ?>
