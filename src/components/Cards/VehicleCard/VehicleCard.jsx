import { useState } from 'react';
import {
    Paper,
    TextField,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button,
    Box,
    Stack
} from '@mui/material';

import noImage  from '../../../../src/assets/img/no_vehicle_img.jpg';
import  './styles.css';

function VehicleCard(props){

const [vehicleData, setVehicleData] = useState({
    name: '',
    type: '4',
    model: '',
    year: '',
});

const vehicleTypes = {1: "Тягач", 2:  "Вантажівка", 3: "Причеп", 4: "Бус"};

const [enableEdit, setEnableEdit] = useState({
    readOnly: true,
    inputVariant: "standard"
});

const editSwitch = () => {
    console.log(enableEdit);
    if (enableEdit.readOnly){
        setEnableEdit(enableEdit => ({
            ...enableEdit,
            inputVariant: 'outlined',
            readOnly: false
          }));
    }else{
        setEnableEdit(enableEdit => ({
            ...enableEdit,
            inputVariant: 'standard',
            readOnly: true
          })); 
    }
}

const handleChange = (prop) => (event) => {
    setVehicleData({...vehicleData, [prop]: event.target.value});
};

 return(
    <Paper elevation={3} sx={{width: '600px', m:2, p:3}}>
        <div className='flex'>
        <Box className='vehicle-avatar'>
            <img alt= 'vehicle img' src={props.vehicle.vehicleImgUrl? props.vehicle.vehicleImgUrl: noImage} />
            <div class="auto-avatar-cover">змінити заображення</div>
        </Box> 

        <Box sx={{ml: 2}}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <FormControl  size="small" fullWidth>
            <InputLabel>Type</InputLabel>
            <Select  size="small"
            value={vehicleData.type}
            label="Type"
            readOnly={enableEdit.readOnly}
            variant={enableEdit.inputVariant}
            onChange={handleChange('type')}
            >
               {Object.entries(vehicleTypes).map(([key, value]) => (
                <MenuItem key={key} value={key}>{value}</MenuItem>
                ))}  
            </Select>
        </FormControl>

        <TextField 
            size="small"  
            label='lable'  
            value={vehicleData.type}  
            fullWidth 
            onChange={handleChange('type')} 
            variant={enableEdit.inputVariant}
            InputProps={{
                readOnly: true,
            }}/>
        </Stack>
        </Box>
      </div>
    <Button variant="outlined" size="small" onClick={editSwitch}>редагувати</Button>

    </Paper>
 )
}

export default VehicleCard;