<?php

class User
{
    // Подключение к БД таблице "users"
    private $conn;
    private $table_name = "users";

    // Свойства
    public $id;
    public $firstname;
    public $lastname;
    public $email;
    public $password;
    public $company_id;
    public $company_name;


    // Конструктор класса User
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Метод для создания нового пользователя
    function create()
    {
        // Инъекция
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));

        // хеширование пароля
        $password_hash = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt = $this->conn->prepare("INSERT INTO users 
        (user_id, firstname, lastname, email, password) 
        VALUES (?, ?, ?, ?, ?)");

        $stmt->bind_param("sssss", $this->id, $this->firstname, $this->lastname, $this->email, $password_hash);
        // Выполняем запрос
        // Если выполнение успешно, то информация о пользователе будет сохранена в базе данных
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    function emailExists()
    {
        // Инъекция
        $this->email = htmlspecialchars(strip_tags($this->email));


        $sql = "SELECT 
        users.user_id,
        users.firstname,
        users.lastname,
        users.password,
        users.company_id,
        companies.name AS companyName
        FROM users 
        LEFT JOIN companies ON users.company_id = companies.company_id
        WHERE email=?"; // SQL with parameters
        $stmt = $this->conn->prepare($sql);
        $stmt->bind_param("s", $this->email);
        $stmt->execute();
        //$stmt->store_result();

        $result = $stmt->get_result(); // get the mysqli result
        $num = $result->num_rows;

        if ($num > 0) {
            $user = $result->fetch_assoc(); // fetch data   

            // Присвоим значения свойствам объекта
            $this->id = $user["user_id"];
            $this->firstname = $user["firstname"];
            $this->lastname = $user["lastname"];
            $this->password = $user["password"];
            $this->company_id = $user["company_id"];
            $this->company_name = $user["companyName"];

            // Вернём "true", потому что в базе данных существует электронная почта

            return true;
        }

        // Вернём "false", если адрес электронной почты не существует в базе данных
        return false;
    }


    // Обновить запись пользователя
    public function update()
    {
        // Если в HTML-форме был введен пароль (необходимо обновить пароль)
        $password_set = !empty($this->password) ? ", password = :password" : "";

        // Если не введен пароль - не обновлять пароль
        $query = "UPDATE " . $this->table_name . "
            SET
                firstname = :firstname,
                lastname = :lastname,
                email = :email
                {$password_set}
            WHERE id = :id";

        // Подготовка запроса
        $stmt = $this->conn->prepare($query);

        // Инъекция (очистка)
        $this->firstname = htmlspecialchars(strip_tags($this->firstname));
        $this->lastname = htmlspecialchars(strip_tags($this->lastname));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // Привязываем значения с HTML формы
        $stmt->bindParam(":firstname", $this->firstname);
        $stmt->bindParam(":lastname", $this->lastname);
        $stmt->bindParam(":email", $this->email);

        // Метод password_hash () для защиты пароля пользователя в базе данных
        if (!empty($this->password)) {
            $this->password = htmlspecialchars(strip_tags($this->password));
            $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
            $stmt->bindParam(":password", $password_hash);
        }

        // Уникальный идентификатор записи для редактирования
        $stmt->bindParam(":id", $this->id);

        // Если выполнение успешно, то информация о пользователе будет сохранена в базе данных
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}