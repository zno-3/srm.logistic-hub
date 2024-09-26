import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Autocomplete, Stack, Box, TextField, Typography } from "@mui/material";
import { useUI } from "../../context/CustomIUProvider";
import SelectAsset from "./SelectAsset";

function SelectAssets({ type }) {
  const [assets, setAssets] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const auth = useAuthUser();
  const company_id = auth.company_id;
  const authToken = useAuthHeader();
  const { showDialog, closeDialog } = useUI();


  return (
    <Stack direction="row" spacing={2} sx={{ maxWidth: "1000px" }}>
      <SelectAsset type="drivers" />
      <SelectAsset type="vehicles" />
      <SelectAsset type="trailers" />
    </Stack>
  );
}

export default SelectAssets;
