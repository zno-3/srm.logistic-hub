import { useState } from "react";
import SelectAsset from "../../components/Assets/SelectAsset";


function AddShippingSt2 ({ setData, formik }) {

  //const [driverId, setDriverId] = useState(null);

  const changeDriver = (data) => {
    formik.setFieldValue("driverId", data.driver_id);
    setData(data, 'driver');
  }
  const changeVehicle = (data) => {
    formik.setFieldValue("vehicleId", data.vehicle_id);
    setData(data, 'vehicle');
  }  
  const changeTrailer = (data) => {
    formik.setFieldValue("trailerId", data.trailer_id);
    setData(data, 'trailer');
  }

  return (
    <>
     step 2

     <SelectAsset type = "drivers" onChange={changeDriver}/>
     <SelectAsset type = "vehicles" onChange={changeVehicle}/>
     <SelectAsset type = "trailers" onChange={changeTrailer}/>
    </>
  );
}

export default AddShippingSt2;
