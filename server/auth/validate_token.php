<?php

include_once '../config.php';
// Требуется для декодирования JWT
//include_once "config/core.php";
include_once "libs/php-jwt/BeforeValidException.php";
include_once "libs/php-jwt/ExpiredException.php";
include_once "libs/php-jwt/SignatureInvalidException.php";
include_once "libs/php-jwt/JWT.php";
include_once "libs/php-jwt/Key.php";
use \Firebase\JWT\JWT;
use \Firebase\JWT\Key; 
 
// Получаем значение веб-токена JSON
$data = json_decode(file_get_contents("php://input"));

// Получаем JWT
$jwt = isset($data->jwt) ? $data->jwt : "";

// Если JWT не пуст
if ($jwt) {
 
    // Если декодирование выполнено успешно, показать данные пользователя
    try {

        // Декодирование jwt
        $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        // Код ответа
        http_response_code(200);
 
        // Покажем детали
        echo json_encode(array(
            "message" => "Доступ разрешен",
            "data" => $decoded->data
        ));
    }
 
    // Если декодирование не удалось, это означает, что JWT является недействительным
    catch (Exception $e) {
    
        http_response_code(401);    // Код ответа
        // Сообщим пользователю что ему отказано в доступе и покажем сообщение об ошибке
        echo json_encode(array(
            "message" => "Вам доступ закрыт",
            "error" => $e->getMessage()
        ));
    }
}
 
// Покажем сообщение об ошибке, если JWT пуст
else {
    http_response_code(401);    // Код ответа
 
    // Сообщим пользователю что доступ запрещен
    echo json_encode(array("message" => "Доступ запрещён"));
}