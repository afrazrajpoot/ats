import React, { useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Modal, Button, Box, Avatar } from "@mui/material";
import setCanvasPreview from "../libs/setCanvasPreview";
import generateResumePDF from "../libs/generateResumePDF";
import { useGlobalContext } from "../context/useGlobal";

const ImageCroper = () => {
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const inputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { setProfileImage } = useGlobalContext();
  const onSelectImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";

      imageElement.src = imageUrl;

      imageElement.addEventListener("load", (e) => {
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < 150 || naturalHeight < 150) {
          alert("Image dimensions should be at least 150x150");
          setImageSrc("");
          return;
        }
        setImageSrc(imageUrl);
        setModalOpen(true); // Open the modal after selecting the image
      });
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { height, width } = e.currentTarget;
    const cropWidth = (150 / width) * 100;
    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidth,
      },
      1,
      height,
      width
    );
    const centerCropImage = centerCrop(crop, height, width);
    setCrop(centerCropImage);
  };

  const onCropImage = () => {
    if (!imgRef.current || !previewCanvasRef.current || !crop) return;

    setCanvasPreview(
      imgRef.current,
      previewCanvasRef.current,
      convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height)
    );

    const canvas = previewCanvasRef.current;
    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc("");
    setCroppedImage(dataUrl);
    setProfileImage(dataUrl);
    setModalOpen(false); // Close the modal after cropping the image
  };

  return (
    <div className="resume-builder">
      <div className="image-cropper">
        <input type="file" ref={inputRef} hidden onChange={onSelectImage} />
        <figure
          className="w-[10vw] flex justify-center"
          onClick={() => inputRef.current.click()}
        >
          {croppedImage ? (
            <Avatar
              sx={{
                width: 150, // Adjust size as needed
                height: 150, // Adjust size as needed
              }}
            >
              <img src={croppedImage} className="w-full" alt="profile" />
            </Avatar>
          ) : (
            <img src="/img/profile.png" className="w-full" alt="profile" />
          )}
        </figure>
        {/* Render the Modal */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          aria-labelledby="crop-image-modal"
          aria-describedby="crop-image-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 600,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {imageSrc && (
              <ReactCrop
                crop={crop}
                circularCrop
                onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                keepSelection
                aspect={1}
                minWidth={200}
                minHeight={200}
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Selected Image"
                  onLoad={onImageLoad}
                />
              </ReactCrop>
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={onCropImage}
              sx={{ mt: 2 }}
            >
              Crop Image
            </Button>
            {crop && (
              <canvas
                ref={previewCanvasRef}
                style={{
                  display: "none",
                  border: "1px solid black",
                  objectFit: "contain",
                  width: 150,
                  height: 150,
                }}
              />
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default ImageCroper;
