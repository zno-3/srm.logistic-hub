import React, { createContext, useContext, useState } from 'react';

// Створюємо контекст
const DrawerContext = createContext();

// Провайдер контексту
export const DrawerProvider = ({ children }) => {
  const [open, setOpen] = useState(true); // Стан відкриття Drawer

  const toggleDrawer = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

// Хук для використання контексту
export const useDrawer = () => {
  return useContext(DrawerContext);
};
