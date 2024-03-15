<?php

include_once "../../auth/libs/php-jwt/BeforeValidException.php";
include_once "../../auth/libs/php-jwt/ExpiredException.php";
include_once "../../auth/libs/php-jwt/SignatureInvalidException.php";
include_once "../../auth/libs/php-jwt/JWT.php";
use \Firebase\JWT\JWT;

$key = "your_secret_key";
$iss = "http://any-site.org";
$aud = "http://any-site.com";
$iat = time();
$exp = time() + 3600;
$nbf = time() + 300; // через 5 хвилин

$user_data = array(
    "name" => 'React User',
    "uid" => 123456,
    "email" => "solo@gmail.com",
    "company_id" => 234,
    "company_name" => "company_1"
);

$token = array(
    "iss" => $iss,
    "aud" => $aud,
    "iat" => $iat,
    "exp" => $exp,
    "nbf" => $nbf,
    "data" => $user_data
 );

 // Создание jwt
 $jwt = JWT::encode($token, $key, 'HS256');

// Поточний час
$current_time = time();
$expires_in = strtotime('+5 hour', $current_time);


http_response_code(200);    // Код ответа



echo json_encode(
    array(
        "message" => "Успешный вход в систему",
        "jwt" => $jwt,
        //"jwt" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicmVtYWlsIjoiam9obmRvdWVAZXhhbXBsZS5jb20iLCJleHAiOjE2NDgxODEyMDB9.S5o-8_42-3847-4979-9283-772837728372",
        "exp" => $expires_in,
        "user" => $user_data
    )
);


?>