<?php

// Connect to database
// Server - localhost
// Username - root
// Password - empty
// Database name = xmldata
$conn = mysqli_connect("localhost", "root", "", "test");

$affectedRow = 0;

// Load xml file else check connection
$xml = simplexml_load_file("input.xml") 
	or die("Error: Cannot create object");

// Assign values
foreach ($xml->children() as $row) {
	$title = $row->title;
	$link = $row->link;
	$description = $row->description;
	$keywords = $row->keywords;
	
	// SQL query to insert data into xml table
	$sql = "INSERT INTO xml(title, link, 
		description, keywords) VALUES ('" 
		. $title . "','" . $link . "','"
		. $description . "','" . $keywords . "')";
	
	$result = mysqli_query($conn, $sql);
	
	if (! empty($result)) {
		$affectedRow ++;
	} else {
		$error_message = mysqli_error($conn) . "\n";
	}
}
?>

<center><h2>XML TO RDBMS CONVERTER</h2></center>
<center><h1>XML Data storing in Database</h1></center>
<?php
if ($affectedRow > 0) {
	$message = $affectedRow . " records inserted";
} else {
	$message = "No records inserted";
}

?>
<style>
	body { 
		max-width:550px;
		font-family: Arial;
	}
	.affected-row {
		background: #cae4ca;
		padding: 10px;
		margin-bottom: 20px;
		border: #bdd6bd 1px solid;
		border-radius: 2px;
		color: #6e716e;
	}
	.error-message {
		background: #eac0c0;
		padding: 10px;
		margin-bottom: 20px;
		border: #dab2b2 1px solid;
		border-radius: 2px;
		color: #5d5b5b;
	}
</style>

<div class="affected-row">
	<?php echo $message; ?>
</div>

<?php if (! empty($error_message)) { ?>

<div class="error-message">
	<?php echo nl2br($error_message); ?>
</div>
<?php } ?>
