<?php

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON);
    
    $email = $input->email;
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        include './variables.php';
        try {
            $conn = new PDO("mysql:host=$localhost;dbname=$dbname", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // prepare sql and bind parameters
            $stmt = $conn->prepare("INSERT INTO EmailSubscription (email, date_of_subscription) 
            VALUES (:email, now())");
            $stmt->bindParam(':email', $email);
            // insert a row
            $stmt->execute();
            
            echo "OK";
        } catch (PDOException $e) {
            echo "Database Connection failed: " . $e->getMessage();
            exit();
        }
        $conn = null;
    } else {
        echo "Invalid email!";
    }

} else {
    header("HTTP/1.1 400 Bad Request");
    echo "Bad Request!";
}

