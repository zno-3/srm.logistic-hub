import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,

  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CustomDialog = ({ open, handleClose, content, title, footer, divid }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      {title ? (
        <>
          <DialogTitle id="dialog-title">{title}</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </>
      ) : null}

      <DialogContent dividers={divid ? true : false}>{content}</DialogContent>
      <DialogActions>
        {footer ? (
          footer
        ) : (
null
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
