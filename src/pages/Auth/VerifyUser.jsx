import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import config from "../../config";
import {
  Box,
  Paper,
  Button,
  Link,
  CircularProgress,
  Typography,
} from "@mui/material";
import SwitchLang from "../../components/General/LangSwitch";

function VerifyUser() {
  const [verification, setVerification] = useState(null);

  const [delayOver, setDelayOver] = useState(false);

  const { v, uid } = useParams();

  const data = {
    v: v,
    uid: uid,
  };

  useEffect(() => {
    setTimeout(() => {
      setDelayOver(true);
    }, 2500);

    axios
      .post(config.serverUrl + "/PHP-Login/login/ajax/verifyuser.php", data)
      .then((response) => {
        if (response.data === 1) {
          setVerification(true);
        } else {
          setVerification(false);
        }
      })
      .catch((error) => {
        setVerification(false);
      });
  }, []);

  function Verifacation() {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Верифікація ...
        </Typography>
        <CircularProgress color="inherit" />
      </Box>
    );
  }

  function VerifacationSuccess() {
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Верифікація пройдена вдало
        </Typography>
        <Button component={Link} variant="contained" href="/login">
          Увійти
        </Button>
      </Box>
    );
  }
  function VerifacationError() {
    const handleReload = () => {
      window.location.reload();
    };
    return (
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          Сталась помилка
        </Typography>
        <Button variant="contained" onClick={handleReload}>
          Спробувати ще раз
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100vw", height: "100vh", p: 2 }}>
      <Box xs={12} sx={{ p: 3, position: "absolute", top: 0, right: 0 }}>
        <SwitchLang />
      </Box>
      <Paper
        sx={{
          width: "100%",
          height: "100%",
          background: "#FDFDFD",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!delayOver && <Verifacation />}
        {delayOver && verification && <VerifacationSuccess />}
        {delayOver && !verification && <VerifacationError />}
      </Paper>
    </Box>
  );
}

export default VerifyUser;
