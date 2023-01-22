<?php
// Connect to the database
define('DB_SERVER', '');
define('DB_USERNAME', '');
define('DB_PASSWORD', '');
define('DB_NAME', '');
 
/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link == false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}


// Retrieve the data from the database
$result = mysqli_query($link, 'SELECT dt, title, descw FROM portfolio_data');

// Fetch all data
$data = array();
while($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

// Close the connection
mysqli_close($link);

// Return the data as JSON
header('Content-Type: application/json');
echo json_encode($data);

?>