<?php
include '../db_connect.php';
include 'Classes/User.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$database = new Database();
$db = $database->connect_db();

$user = new User($db);


//отримуємо дані
$data = json_decode(file_get_contents("php://input"));
 
// Встановлюємо дані

$user->id = uniqid(rand(), false);;
$user->firstname = $data->firstname;
$user->lastname = $data->lastname;
$user->email = $data->email;
$user->password = $data->password;

// Поверка на существование e-mail в БД
// $email_exists = $user->emailExists();
 
// Создание пользователя
if (
    //!empty($user->firstname) &&
    //!empty($user->email) &&
    // $email_exists == 0 &&
    //!empty($user->password) &&
    $user->create()
) {
    // Устанавливаем код ответа
    http_response_code(200);
    require '../PHPMailer/autoload.php'; // Шлях до PHPMailer

    // Створіть новий екземпляр PHPMailer
    $mail = new PHPMailer();

    // Встановіть параметри SMTP
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // SMTP сервер
    $mail->SMTPAuth = true; // Аутентифікація SMTP
    $mail->Username = 'znozno3@gmail.com'; // Ваша адреса електронної пошти
    $mail->Password = 'gamel22011980'; // Пароль від поштової скриньки
    $mail->SMTPSecure = 'ssl'; // Захист з'єднання
    $mail->Port = 465; // Порт SMTP сервера або 587

    // Встановіть адресу відправника та отримувача
    $mail->setFrom('znozno3@gmail.com', 'Your Name');
    $mail->addAddress('visp_zsu@i.ua', 'Recipient Name');

    // Додайте тему та текст повідомлення
    $mail->Subject = 'Тема повідомлення';
    $mail->Body = 'Текст повідомлення';

    // Відправте повідомлення
    if($mail->send()) {
        echo 'Повідомлення відправлено';
    } else {
        echo 'Помилка: ' . $mail->ErrorInfo;
    }
        // Покажем сообщение о том, что пользователь был создан
        echo json_encode(array("message" => "Пользователь был создан"));
    }
 
// Сообщение, если не удаётся создать пользователя
else {
 
    // Устанавливаем код ответа
    http_response_code(400);
 
    // Покажем сообщение о том, что создать пользователя не удалось
    echo json_encode(array("message" => "Невозможно создать пользователя"));
}







