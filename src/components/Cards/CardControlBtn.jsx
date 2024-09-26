import { useState } from 'react';
import {Button, SpeedDial, SpeedDialAction, IconButton, Popover, Typography} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import config from '../../config'



const CardControlBtn = (props) => {

const handleDeleteElement = (itemId) => {
  const values = {table: 'drivers', column: 'driver_id', value: itemId};
  axios
  .post(config.rootUrl + "/backend/axios/cards/deleteItem.php", values)
  .then((response) => {
    console.log('answer - '+ response.data);
  })
  .catch((error) => { 
    console.error(error);
  });
}


  const {t} = useTranslation();

const actions = [
  { icon: <DeleteIcon />, name: t("general.delete"), action: 'del' },
  { icon: <EditIcon />, name:  t("general.edit"), action: 'edit'},
  { icon: <VisibilityIcon />, name: t("general.view"), action: 'view'},
];

const [anchorEl, setAnchorEl] = useState(null);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const openPopover = Boolean(anchorEl);
  const handleClosePopover = () => {
    setAnchorEl(null);
  };


  const handleActionClick = (event, actionName) => {

    // Обробник подій для кожного випадаючого елемента меню
    switch (actionName) {
      case 'del':
        setAnchorEl(event.currentTarget);
        break;
      case 'edit':
        // Логіка для редагування
        break;
      case 'view':
        // Логіка для перегляду
        break;
      default:
        break;
    }

    setOpen(false); // Закриваємо Speed Dial після вибору дії
  };

  return (<>
    <SpeedDial
      ariaLabel="SpeedDial menu"
      //icon={<MoreVertIcon/>}
      icon={<IconButton aria-label="delete">
      <MoreVertIcon />
    </IconButton>}
      onClose={handleClose}
      onOpen={handleClick}
      FabProps={{size: "small", color: 'white', sx: { boxShadow: 'none'} }}
      sx={{position: 'absolute', bottom: '0px', right: '0px', height: '40px'}}
      open={open}  
      direction="left"
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          FabProps={{size: "small", sx: {border: '1px solid #d7d7d7'} }}
          tooltipTitle={action.name}
          onClick={(event) => handleActionClick(event, action.action)}
        />
      ))}
    </SpeedDial>
    <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleClosePopover}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Typography sx={{ p: 2 }}>
          Ви впевнені, що хочете видалити цей елемент?
        </Typography>
        <Button onClick={handleClosePopover}>{t('general.no')}</Button>
        <Button onClick={() => handleDeleteElement(props.itemId)} color="error">
          Видалити
        </Button>
    </Popover>
    </>
  );
};

export default CardControlBtn;
