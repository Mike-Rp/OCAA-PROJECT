<?php 

session_start();
include ('connect.php');


?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div> GALING </div>
    <?php 
    if (isset($_SESSION['Number'])) {
        $email = $_SESSION['Number'];
        $query=mysqli_query($conn, "SELECT * FROM registration WHERE Number='$Number'");
        while ($row=mysqli_fetch_array($query)) {
            echo $row['FLname'] . "!";
        }
    } else {
        echo "You are not logged in.";
    }
</body>

</html>