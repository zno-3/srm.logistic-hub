import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import { Box, Alert, Fab, Tooltip } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./utils/useDebounceEffect.ts";
import { canvasPreview } from "./utils/canvasPreview.ts";
import CropIcon from "@mui/icons-material/Crop";
import ReplayIcon from "@mui/icons-material/Replay";
import ClearIcon from "@mui/icons-material/Clear";
import { useTranslation } from "react-i18next";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {unit: "%",
      width: 90},
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageUploader = (props) => {
const [completedCrop, setCompletedCrop] = useState();
const [cropDone, setCropDone] = useState(false);
const previewCanvasRef = useRef(null);
const imgRef = useRef(null);
const [selectedImage, setSelectedImage] = useState(null);
const [crop, setCrop] = useState({ unit: "%", aspect: 1, x: 0, y: 0 });
const [showAlert, setShowAlert] = useState(false);
const [alertText, setAlertText] = useState("");
const { t } = useTranslation();

  const handlershowAlert = (newAlertText) => {
    setAlertText(newAlertText);
    setShowAlert(true);
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      handlershowAlert(t("addNewItem.moreOneFileAlert"));
      return;
    }

    const rejectedFiles = Array.from(acceptedFiles).filter(
      (file) => !isFileValid(file)
    );

    if (rejectedFiles.length > 0) {
      handlershowAlert(t("addNewItem.notAllowedImgType"));
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      setCrop(undefined);
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result);
      });
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const isFileValid = (file) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    return allowedTypes.includes(file.type);
  };

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, props.aspect));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }

      if (props.onImageUpload) {
        props.onImageUpload(previewCanvasRef);
      } //передаемо посилання
    },
    100,
    [completedCrop]
  );

  const restartUploader = () => {
    setCompletedCrop(null);
    setCropDone(false);
    setSelectedImage(null);
    setCrop({ unit: "%", aspect: 1, x: 0, y: 0 });
  };

  return (
    <div>
      {!selectedImage && (
        <>
          {t("addNewItem.uploadImage")}
          <Box
            {...getRootProps()}
            sx={{
              border: "1px dashed grey",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "center",
              p: 1,
            }}
          >
            <input {...getInputProps()} />
            {t("addNewItem.dragOrClick")}
          </Box>
          {showAlert && (
            <Alert
              severity="error"
              icon={false}
              onClose={() => setShowAlert(false)}
            >
              {alertText}
            </Alert>
          )}
        </>
      )}

      {completedCrop && (
        <Grid
          container
          sx={{
            p: 1,
            display: cropDone ? "block" : "none",
            textAlign: "center",
          }}
        >
          <Grid>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "120px",
                height: "120px",
              }}
            />
          </Grid>
          <Grid sx={{ position: "relative" }}>
            <Tooltip title={t("general.clear")} placement="top">
              <Fab
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "50%",
                  marginLeft: "-45px",
                }}
                onClick={restartUploader}
                color="warning"
                size="small"
              >
                <ClearIcon />
              </Fab>
            </Tooltip>
            <Tooltip title={t("general.undo")} placement="top">
              <Fab
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  right: "50%",
                  marginRight: "-45px",
                }}
                onClick={() => setCropDone(false)}
                color="info"
                size="small"
              >
                <ReplayIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      )}

      {selectedImage && (
        <Grid
          container
          sx={{ position: "relative", display: cropDone ? "none" : "block" }}
        >
          <Grid>
            <ReactCrop
              crop={crop}
              onChange={(percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={props.aspect}
            >
              <img
                src={selectedImage}
                ref={imgRef}
                onLoad={onImageLoad}
                alt="Selected"
              />
            </ReactCrop>
          </Grid>

          <Grid>
            <Tooltip title={t("general.crop")} placement="top">
              <Fab
                sx={{
                  position: "absolute",
                  bottom: "-25px",
                  left: "50%",
                  marginLeft: "-20px",
                }}
                color="success"
                onClick={() => setCropDone(true)}
                size="small"
              >
                <CropIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ImageUploader;
