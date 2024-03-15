<?php 
include '../config.php';
include '../PHPMailer/autoload.php'; // Шлях до PHPMailer

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../PHPMailer/phpmailer/phpmailer/src/Exception.php';
require '../PHPMailer/phpmailer/phpmailer/src/PHPMailer.php';
require '../PHPMailer/phpmailer/phpmailer/src/SMTP.php';
require '../PHPMailer/autoload.php';

    // Створіть новий екземпляр PHPMailer
    $mail = new PHPMailer();

    // Встановіть параметри SMTP
    $mail->SMTPDebug = 0;
    //$mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSendMail();
    $mail->Host =  "ssl://smtp.gmail.com"; // SMTP сервер
    $mail->SMTPAuth = true; // Аутентифікація SMTP
    $mail->Username = 'znozno3@gmail.com'; // Ваша адреса електронної пошти
    $mail->Password = 'gamel22011980'; // Пароль від поштової скриньки
    $mail->SMTPSecure = 'ssl'; // Захист з'єднання//ssl або tls
    $mail->Port = 465; // Порт SMTP сервера або 587 або 465
    $mail->SMTPKeepAlive = true;   
$mail->Mailer = 'smtp'; // don't change the quotes!

$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
echo !extension_loaded('openssl')?"Not Available":"Available";

    if (!$mail->smtpConnect()) {
        echo 'SMTP connect() хуйня.';
    } else {
        echo 'SMTP connect() successful.';
    }

    // Встановіть адресу відправника та отримувача
    $mail->setFrom('znozno3@gmail.com', 'Your Name');
    $mail->addAddress('znozno3@gmail.com', 'Recipient Name');

    // Додайте тему та текст повідомлення
    $mail->Subject = 'Тема повідомлення';
    $mail->Body = 'Текст повідомлення';
    print_r($mail);
    // Відправте повідомлення
    if($mail->send()) {
        echo 'Повідомлення відправлено';
    } else {
        echo 'Помилка: ' . $mail->ErrorInfo;
    }

echo 'eee';

