import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const NetworkDetector = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [previousPage, setPreviousPage] = useState(null); // Збереження попередньої сторінки
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Якщо повертаємося в онлайн і попередня сторінка збережена
      if (previousPage) {
        navigate(previousPage); // Перенаправляємо на збережену сторінку
        setPreviousPage(null); // Очищаємо збережену сторінку
      } else {
        navigate("/dashboard");
      }
    };

    const handleOffline = () => {
      setPreviousPage(location.pathname); // Зберігаємо поточну сторінку перед переходом на "no-internet"
      setIsOnline(false);
      navigate("/no-internet");
    };

    if (!navigator.onLine) {
      setPreviousPage(location.pathname); // Зберігаємо поточну сторінку
      navigate("/no-internet");
    }

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Якщо додаток стартує без інтернету

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [navigate, location.pathname]);

  return children;
};

export default NetworkDetector;
