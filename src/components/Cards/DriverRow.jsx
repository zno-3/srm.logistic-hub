
import {
  Avatar, TableCell, TableRow, Typography, Paper
} from '@mui/material';
import { useTranslation } from "react-i18next";
import TableStatusBadge from './TableStatusBadge';
import Grid from '@mui/material/Unstable_Grid2'; 
import CardControlBtn from './CardControlBtn';


function EmployeeRow(props){


  const name = props.data.lastname + ' '+ props.data.firstname;
  let statusColor = '';

  switch (props.data.status) {
    case 1:  statusColor = 'success'; break;
    case 2:  statusColor = 'info'; break;
    case 3:  statusColor = 'error'; break;
    default: statusColor = ''; break;
  }

 return(

<>
<TableCell align="right"><TableStatusBadge color={statusColor} /></TableCell>
  <TableCell scope="row" sx={{py:1}}>
    <Grid container spacing={1}>
        <Grid>
          <Avatar size="medium" alt={name} src={"http://logistic-site/images/drivers/"+props.data.driver_id+".jpeg"} />
        </Grid>
        <Grid>
          <Typography>{name}</Typography>
        </Grid>
  </Grid>
  </TableCell>


  <TableCell  sx={{py:1}}>
    {props.data.vehicle_default ?
        <Grid container spacing={1}>
          <Grid>
            <Avatar size="medium" alt={props.data.vehicleName} src={"http://logistic-site/images/vehicles/"+props.data.vehicleId+".jpg"} />
          </Grid>
          <Grid>
            <Typography>{props.data.vehicleName}</Typography>
          </Grid>
      </Grid>: null
    }
  </TableCell>

  <TableCell sx={{py:1}}>
    <Grid>
      <Typography>{props.data.vehicleNumber}</Typography>
    </Grid>
  </TableCell>


  <TableCell align="center">{props.data.trailerName}</TableCell>
  <TableCell align="center">{props.data.vehicleId}</TableCell>  
  <TableCell align="center" sx={{position: 'relative'}}>
    <CardControlBtn itemId={props.data.driver_id}/>
  </TableCell>

  </>

 )
}

export default EmployeeRow;