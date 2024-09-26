import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ProtectedRoute = ({ children }) => {





  
  const auth = useAuthUser();

  if (!auth) {
    // Якщо користувач не авторизований, перенаправляємо на сторінку входу
    return <Navigate to="/login" />;
  }

  if (!auth.company_id) {
    // Якщо у користувача немає компанії, перенаправляємо на сторінку реєстрації компанії
    return <Navigate to="/register-company" />;
  }
  // Якщо користувач авторизований, рендеримо дочірні компоненти
  return children;
};

export default ProtectedRoute;