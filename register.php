<?php 
include 'connect.php';

if (isset($_POST['signUp']) ){
    $FLname = $_POST['FLname'];
    $Number = $_POST['Number'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $password=md5($password);

    $checkEmail = "SELECT * FROM registration WHERE email='$email' ";
    $result=$conn->query($checkEmail);
    if ($result->num_rows > 0){
        echo "Email Address Already Exists.";
    } else {
        $insertQuery = "INSERT INTO registration (FLname, Number, email, password) VALUES ('$FLname', '$Number', '$email', '$password')";
        if ($conn->query($insertQuery) === TRUE) {
            header("Location: index.php");
        } else {
            echo "Error: " .$conn->error;
        }
    }
}

if(isset($_POST['login'])){
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password=md5($password);


    $sql = "SELECT * FROM registration WHERE Number='$Number' AND password='$password'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        session_start();
        $row=$result->fetch_assoc();
        $_SESSION['Number']=$row['Number'];
        header("Location: homepage.php");
        exit();
    } else {
        echo "Invalid Phone Number or Password.";
    }
}

?>