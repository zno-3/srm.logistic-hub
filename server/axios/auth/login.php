<?php

$user_data = array(
    "name"=> 'React User',
    "uid"=> 123456,
    "email" => "solo@gmail.com",
    "company_id" => 234,
    "company_name" => "company_1"
);

// Поточний час
$current_time = time();
$expires_in = strtotime('+5 hour', $current_time);


http_response_code(200);    // Код ответа



echo json_encode(
    array(
        "message" => "Успешный вход в систему",
        //"jwt" => $jwt,
        "jwt" => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE2NDYzOTk2MDB9.6eY3Ux7XjLUKlHFvLlKz_jnXoJ7d6hz8QDqmrNt5pIc",
        "exp" => $expires_in,
        "user" => $user_data
    )
);


?>