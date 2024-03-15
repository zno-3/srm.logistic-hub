<?php
    include '../db_connect.php';
    include 'Classes/User.php';


$database = new Database();
$db = $database->connect_db(); 

$user = new User($db);

// Получаем данные
$data = json_decode(file_get_contents("php://input"));
 
// Устанавливаем значения
$user->email = $data->email;
//$user->firstname = $data->firstname;
$email_exists = $user->emailExists();
 
// Подключение файлов JWT  //https://github.com/firebase/php-jwt
//include_once "config/core.php";
include_once "libs/php-jwt/BeforeValidException.php";
include_once "libs/php-jwt/ExpiredException.php";
include_once "libs/php-jwt/SignatureInvalidException.php";
include_once "libs/php-jwt/JWT.php";
use \Firebase\JWT\JWT;



if ($email_exists && password_verify($data->password, $user->password)) {
    $user_data = array(
           "id" => $user->id,
           "firstname" => $user->firstname,
           "lastname" => $user->lastname,
           "email" => $user->email,
           "company_id" => $user->company_id,
           "company_name" => $user->company_name
    );

    $token = array(
       "iss" => $iss,
       "aud" => $aud,
       "iat" => $iat,
       "nbf" => $nbf,
       "data" => $user_data
    );


    http_response_code(200);    // Код ответа
    
    // Создание jwt
    $jwt = JWT::encode($token, $key, 'HS256');
    $user_json_data = json_encode($user_data);
    echo json_encode(
        array(
            "message" => "Успешный вход в систему",
            "jwt" => $jwt,
            "exp" => $exp,
            "user" => $user_data
        )
    );

}else {
    http_response_code(401);    // Код ответа
    echo json_encode(array("message" => "Ошибка входа")); // Скажем пользователю что войти не удалось
  }
