<?php

define("HOST", "localhost");
define("DB_NAME", "crm");
define("DB_USER_NAME", "root");
define("DB_PASSWORD", "");


// Показ сообщений об ошибках
error_reporting(E_ALL);
 
// Установим часовой пояс по умолчанию
date_default_timezone_set("Europe/Kiev");
 
// Переменные, используемые для JWT
$key = "c2f5671e14d5823a9b4c8b1f8e6e9a367e88d72d9e8d0b4b8e1aa47c9ef45d1a";
$iss = "http://any-site.org";
$aud = "http://any-site.com";
$iat = time();
$exp = time() + 3600;
$nbf = time() + 300; // через 5 хвилин


