<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form data
    $title = $_POST["title"];
    $dt = $_POST["dt"];
    $desc = $_POST["desc"];

    define('DB_SERVER', '');
    define('DB_USERNAME', '');
    define('DB_PASSWORD', '');
    define('DB_NAME', '');
 
/* Attempt to connect to MySQL database */
    $conn= mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert the form data into the database
    $sql = "INSERT INTO portfolio_data (title, dt, descw) VALUES ('$title', '$dt', '$desc') ORDER BY id ASC";
    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
        header( "refresh:1;url=admin.php" );
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
        header( "refresh:1;url=admin.php" );
    }
    $conn->close();
}
?>