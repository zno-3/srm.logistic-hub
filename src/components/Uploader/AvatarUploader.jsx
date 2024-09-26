import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDebounceEffect } from "./utils/useDebounceEffect.ts";
import { canvasPreview } from "./utils/canvasPreview.ts";
import { useTranslation } from "react-i18next";
import NoPhotographyOutlinedIcon from "@mui/icons-material/NoPhotographyOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

import { useUI } from "../../context/CustomIUProvider";

const centerAspectCrop = (mediaWidth, mediaHeight, aspect) => {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
};

const AvatarUploader = (props) => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState({ unit: "%", aspect: 1, x: 0, y: 0 });
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { showSnackbar } = useUI();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      showSnackbar(t("image.moreOneFile"), "warning");
      return;
    }

    const rejectedFiles = Array.from(acceptedFiles).filter(
      (file) => !isFileValid(file)
    );

    if (rejectedFiles.length > 0) {
      showSnackbar(t("addNewItem.notAllowedImgType"), "warning");
      return;
    }

    if (acceptedFiles && acceptedFiles.length > 0) {
      setCrop(undefined);
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setSelectedImage(reader.result);
        setOpen(true);
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
    setCrop(centerAspectCrop(width, height, 1));
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
      }
    },
    100,
    [completedCrop]
  );

  function getCroppedImg(image, crop) {
    const canvas = document.createElement("canvas");
    canvas.width = 128; // Змініть розмір на 128px
    canvas.height = 128; // Змініть розмір на 128px
    const ctx = canvas.getContext("2d");
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      128, // Змініть розмір на 128px
      128  // Змініть розмір на 128px
    );
  
    return canvas.toDataURL("image/jpeg"); // Змініть на тип зображення, який вам потрібний
  }



  return (
    <div>
      <Box
        {...getRootProps()}
        sx={{
          width: "128px",
          height: "128px",
          margin: "0 auto",
          border: "1px dashed grey",
          borderRadius: "50%",
          cursor: "pointer",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {selectedImage ? (
          <>
            {completedCrop ? (
              <canvas
                ref={previewCanvasRef}
                style={{
                  objectFit: "contain",
                  width: "128px",
                  height: "128px",
                }}
              />
            ) : null}
            <Box
              sx={{
                position: "absolute",
                width: "128px",
                height: "30px",
                bottom: 0,
                backgroundColor: "#0E1C3680",
              }}
            >
              {" "}
              <NoPhotographyOutlinedIcon color="white" />
            </Box>
          </>
        ) : (
          <>
            <input {...getInputProps()} />
            <Box
              sx={{
                position: "absolute",
                width: "128px",
                height: "30px",
                bottom: 0,
                backgroundColor: "#0E1C3680",
              }}
            >
              <AddAPhotoOutlinedIcon color="white" />
            </Box>
          </>
        )}
      </Box>
      <Dialog open={open}>
        <DialogTitle>{t("image.edit")}</DialogTitle>
        <DialogContent>
          <Grid>
            <ReactCrop
              crop={crop}
              onChange={(percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => {
                setCompletedCrop(c);
                if (imgRef.current && c.width && c.height) {
                  const croppedImage = getCroppedImg(imgRef.current, c);
                  setAvatar(croppedImage);
                }
              }}
              aspect={1}
            >
              <img
                src={selectedImage}
                ref={imgRef}
                onLoad={onImageLoad}
                alt="Selected"
              />
            </ReactCrop>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.onAvatarUpload(avatar);
              setOpen(false);
            }}
          >
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AvatarUploader;
