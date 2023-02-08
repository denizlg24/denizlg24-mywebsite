<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        body {
            background-color: #b08bcc;
            text-align: center;
        }

        form {
            width: 50%;
            margin: 0 auto;
            background-color: #c3c2c4;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 2px 2px 10px #888888;
        }

        label {
            color: #00008b;
            font-weight: bold;
        }

        input[type="text"], input[type="date"], textarea {
            background-color: #ffffff;
            border: none;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 20px;
        }

        input[type="submit"] {
            background-color: #00008b;
            color: #ffff
        }
    </style>
</head>
<body>
    <h1 class="my-5">Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>. Welcome to the admin page.</h1>
    <p>
        <a href="logout.php" class="btn btn-danger ml-3">Sign Out of Your Account</a>
    </p>
    <form action="submit-portfolio-data.php" method="post">
    <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" class="form-control" id="title" name="title">
    </div>
    <div class="form-group">
        <label for="dt">Date:</label>
        <input type="text" class="form-control" id="dt" name="dt">
    </div>
    <div class="form-group">
        <label for="desc">Description:</label>
        <textarea class="form-control" id="desc" name="desc"></textarea>
    </div>
    <input type="submit" class="btn btn-primary" value="Submit">
</form>
</body>
</html>