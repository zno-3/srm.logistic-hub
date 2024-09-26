import React from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Typography } from "@mui/material";

const clientId = "271742445061-89dvfms4j6v65tmj50ebkv8i2ih7dq5c.apps.googleusercontent.com";

function GoogleAuth() {
  const handleLoginSuccess = (response) => {
    console.log("Login Success: ", response);

    // Отримання токена
    const token = response.credential;

    // Відправка токена на сервер для верифікації з використанням axios
    axios
      .post(
        "https://server.logistic-hub.com/PHP-Login/login/ajax/google_login.php",
        { token }
      )
      .then((serverResponse) => {
        const data = serverResponse.data;
        console.log(data);
        if (data.status === "success") {
          console.log("User Data: ", data.user);
          // Тут ви можете обробити дані користувача, наприклад, зберегти їх у стані або localStorage
        } else {
          console.error("Server Error: ", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching user info: ", error);
        if (error.response) {
          console.error("Server Response: ", error.response.data);
        }
      });
  };

  const handleLoginFailure = (response) => {
    console.log("Login Failed: ", response);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="App">
        <Typography
          variant="body2"
          color="grey"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Або
        </Typography>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onFailure={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default GoogleAuth;
