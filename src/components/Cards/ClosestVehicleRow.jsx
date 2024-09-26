
import { TableRow, TableCell } from "@mui/material";


function ClosestVehicleRow (props) {


    return( 
        <TableRow>
          <TableCell>{props.data.vehicle_id}</TableCell>
          <TableCell>{props.data.vehicleNumber}</TableCell>
          <TableCell>{props.data.pdol}</TableCell>
          <TableCell>Cell 4</TableCell>
          <TableCell>Cell 5</TableCell>
          <TableCell>Cell 6</TableCell>
        </TableRow>
    )
}

export default ClosestVehicleRow;