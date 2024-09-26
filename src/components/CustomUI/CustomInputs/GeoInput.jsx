import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import config from "../../../config";
import TextInput from "./TextInput";

const fetchPlaceSuggestions = async (query) => {
  const response = await axios.get(
    `${config.serverUrl}/axios/googlemap/placeAutocomplite.php`,
    {
      params: {
        input: query,
      },
    }
  );
  return response.data.predictions;
};

const fetchPlaceDetails = async (placeId) => {
  const response = await axios.get(
    `${config.serverUrl}/axios/googlemap/placeDetails.php`,
    {
      params: {
        place_id: placeId,
      },
    }
  );

  return response.data;
};

function GeoInput({ label, placeholder, name, onChange }) {


  const [options, setOptions] = useState([]);

  const handleChange = async (event, value) => {
    if (value && value.place_id) {
      try {
        const detailsResponse = await fetchPlaceDetails(value.place_id);
        console.log(detailsResponse.result);
        if (detailsResponse.status === "OK") {
          onChange({
            name: value.structured_formatting.main_text,
            coordinates: detailsResponse.result.geometry.location,
          });
        }
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    } else {
      //setFieldValue(name, null);
    }
  };

  return (
    <Autocomplete 
      freeSolo
      name={name}
      options={options}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option?.description || ""
      }
      onInputChange={async (event, newValue) => {
        if (newValue.length >= 3) {
          try {
            const suggestions = await fetchPlaceSuggestions(newValue);
            setOptions(suggestions);
          } catch (error) {
            console.error("Error fetching place suggestions:", error);
          }
        }
      }}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} placeholder={placeholder} label={label} />
      )}
    />
    
  );
}

export default GeoInput;
