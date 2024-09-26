import React, { createContext, useContext, useState, useCallback } from 'react';
import CustomSnackbar from '../components/CustomUI/CustomSnackbar';
import CustomDialog from '../components/CustomUI/CustomDialog';

const UIContext = createContext();

export const CustomUIProvider = ({ children }) => {
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
    duration: 6000,
  });

  const showSnackbar = useCallback((message, severity = 'info', duration = 6000) => {
    setSnackbar({ open: true, message, severity, duration });
  }, []);

  const closeSnackbar = useCallback(() => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  // Dialog state
  const [dialog, setDialog] = useState({
    open: false,
    content: null,
    title: '',
    footer: null,
    onClose: null,
  });

  const showDialog = useCallback(({ content = '', title = '', footer = null, onClose = null }) => {
    setDialog({ open: true, content, title, footer, onClose });
  }, []);

  const closeDialog = useCallback(() => {
    setDialog((prev) => ({ ...prev, open: false }));
    if (dialog.onClose) {
      dialog.onClose();
    }
  }, [dialog.onClose]);

  return (
    <UIContext.Provider value={{ showSnackbar, closeSnackbar, showDialog, closeDialog }}>
      {children}
      <CustomSnackbar
        open={snackbar.open}
        handleClose={closeSnackbar}
        message={snackbar.message}
        severity={snackbar.severity}
        duration={snackbar.duration}
      />
      <CustomDialog
        open={dialog.open}
        handleClose={closeDialog}
        content={dialog.content}
        title={dialog.title}
        footer={dialog.footer}
      />
    </UIContext.Provider>
  );
};

export const useUI = () => useContext(UIContext);
