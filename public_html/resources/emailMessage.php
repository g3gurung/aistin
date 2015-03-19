<?php

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON);

    $name = $input->name;
    $email = $input->email;
    $phone = $input->phone;
    $message = $input->text;

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

        if (empty($name) || empty($phone) || empty($message)) {
            echo 'Some fields are missing!';
        } else {
            $to = 'info@iprotoxi.fi';
            $subject = 'Message from website.';
            $body = '
                <html>
                <head>
                <title>Message From Website</title>
                </head>
                <body>
                <b>Message content:</b> <p style="text-indent: 50px; margin-top: 0">' . $message . '</p> <p><b>Phone: </b>' . $phone . '</p><p><b>email: </b>' . $email . '</p>
                </body>
                </html>
                ';
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            //$body = '<b>Message content:</b> <p style="text-indent: 50px;">' . $message . '</p> <p><b>Phone: </b>' . $phone . '</p><p><b>email: </b>' . $email . '</p>';
            $headers .= 'From: ' . $email . "\r\n" .
                    'Reply-To: ' . $email . "\r\n" .
                    'X-Mailer: PHP/' . phpversion();

            if (mail($to, $subject, $body, $headers)) {
                echo 'OK';
            } else {
                echo 'Message sending failed!';
            }
        }
    } else {
        echo 'Invalid Email!';
    }
} else {
    header("HTTP/1.1 400 Bad Request");
    echo "Bad Request!";
}

