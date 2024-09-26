import { useRef, useState } from "react";
import {
  IconButton,
  Box,
  Badge,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import axios from "axios";
import pdfJPG from "../../assets/img/pdf.jpg";
import config from "../../config";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useUI } from "../../context/CustomIUProvider";
import ShowDocsDialog from "../../pages/Assets/Dialogs/ShowDocsDialog";
import { useTranslation } from "react-i18next";

const DocsUploader = ({ title, type, company }) => {
  //initial data
  const [thumbs, setThumbs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showSnackbar, showDialog } = useUI();
  const inputRef = useRef(null);
  const { t } = useTranslation();
  //styles

  const circularProgressStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: "-12px",
    marginLeft: "-12px",
  };

  const docCiricalStyles = {
    width: "26px",
    height: "26px",
    marginLeft: "-10px",
    borderRadius: "50%",
    border: "solid #555555 1px",
  };

  const progressWrapStyles = {
    backgroundColor: "#22222220",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
  };

  //handlers

  const handleUploadDocumentClick = (ref) => {
    ref.current?.click();
  };

  const handleAddDocument = async (e, type) => {
    e.preventDefault();
    setLoading(true);
    const files = e.target.files;
    const formData = new FormData();
    const blobPromises = [];
    const thumbUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("documents[]", file);

      if (file.type.startsWith("image/")) {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        const promise = new Promise((resolve) => {
          image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, 64, 64);
            canvas.toBlob((blob) => {
              formData.append("thumb[]", blob, file.name);
              thumbUrls.push(URL.createObjectURL(blob));
              resolve();
            }, file.type);
          };
        });
        blobPromises.push(promise);
      }

      if (file.type === "application/pdf") {
        const pdfFileName = file.name.replace(/\.pdf$/, ".jpeg");
        const pdfImageBlob = await fetch(pdfJPG).then((response) =>
          response.blob()
        );
        formData.append("thumb[]", pdfImageBlob, pdfFileName);
        thumbUrls.push(URL.createObjectURL(pdfImageBlob));
      }
    }

    formData.append("company", company);
    formData.append("type", type);

    try {
      await Promise.all(blobPromises);
      const response = await axios.post(
        config.serverUrl + "/axios/cards/saveDocs.php",
        formData
      );
      setThumbs((prevThumbs) => [...prevThumbs, ...thumbUrls]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      showSnackbar(t('errors.uploadImage'), "error");
      setLoading(false);
    }
  };

  const hendleShowUploadedDocs = () => {
    showDialog({
      title: title,
      content: <ShowDocsDialog />,
    });
  };

  //return

  return (
    <Paper
      elevation={0}
      sx={{
        py: 1,
        px: 2,
        position: "relative",
        ":hover": { backgroundColor: "#f2f2f7" },
      }}
    >
      <Grid container sx={{ ml: 1 }}>
        <Grid xs="auto" sx={{ mt: 1 }}>
          <Grid container>
            {thumbs?.slice(0, 3)?.map((it, index) => {
              return (
                <Box
                  sx={{
                    ...docCiricalStyles,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundImage: "url(" + it + ")",
                  }}
                  key={index}
                ></Box>
              );
            })}
            <Badge badgeContent={thumbs?.length} color="primary">
              <Box
                onClick={() => handleUploadDocumentClick(inputRef)}
                sx={{
                  ...docCiricalStyles,
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  ref={inputRef}
                  accept=".pdf, .jpeg, .png, .jpg"
                  onChange={(e) => handleAddDocument(e, type)}
                  style={{ display: "none" }}
                  multiple
                />
                <AddIcon />
              </Box>
            </Badge>
          </Grid>
        </Grid>
        <Grid xs sx={{ ml: 3, lineHeight: 1 }}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="caption">pdf, jpg, png</Typography>
        </Grid>
        <Grid xs="auto">
          {thumbs?.length ? (
            <IconButton
              aria-label="doc-uppload-menu"
              onClick={hendleShowUploadedDocs}
            >
              <MoreHorizIcon />
            </IconButton>
          ) : null}
        </Grid>
      </Grid>
      {loading && (
        <Box sx={{ ...progressWrapStyles }}>
          <CircularProgress
            size={24}
            color="primary"
            sx={{ ...circularProgressStyles }}
          />
        </Box>
      )}
    </Paper>
  );
};

export default DocsUploader;
