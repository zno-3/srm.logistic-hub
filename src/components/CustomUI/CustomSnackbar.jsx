import {Alert, Snackbar, Slide} from '@mui/material';

const CustomSnackbar = ({ open, handleClose, message, severity = 'info', duration = 6000 }) => {
  
  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={handleClose} variant="filled" severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;