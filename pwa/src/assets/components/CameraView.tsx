import { Camera, CameraType } from "react-camera-pro";
import { useRef } from "react";
import { Button, Stack, Typography, Grid, Box } from "@mui/joy";
import { useAppSelector, useAppDispatch } from "../../store";
import { addImage, removeImage } from "../../store/formSlice";
import { NavLink } from "react-router-dom";
import { useFormFill } from "../../hooks";

export default function CameraView() {
  const camera = useRef<CameraType>(null);
  const images = useAppSelector((state) => state.form.images);
  const dispatch = useAppDispatch();
  const { fillForm } = useFormFill();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.level1",
        alignItems: "center",
        paddingTop: 2,
      }}
    >
      <Camera
        facingMode={"environment"}
        ref={camera}
        errorMessages={{}}
        aspectRatio={1}
      />
      <Typography>Images</Typography>
      <Grid container spacing={1} justifyContent="center">
        {images.map((image, index) => (
          <Grid
            xs={4}
            key={index}
            onClick={() => {
              dispatch(removeImage(image.id));
            }}
          >
            <img
              src={image.data}
              alt={`Captured ${index}`}
              style={{
                width: "100%",
                borderRadius: "8px",
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Box flexGrow={1} />
      <Button
        disabled={images.length > 2}
        onClick={() => {
          if (camera.current) {
            const capturedImage = camera.current.takePhoto();
            dispatch(addImage(capturedImage));
          }
        }}
      >
        Capture Image
      </Button>
      <NavLink to="/locate">
        <Button
          onClick={() => {
            //    fillForm();
          }}
        >
          Locate device
        </Button>
      </NavLink>
      <div>
        <input
          type="file"
          id="fileInput"
          onChange={() => {
            const fileInput: any = document.getElementById("fileInput");
            const file = fileInput.files[0]; // Get the first file selected
            if (file) {
              // Create a new FileReader instance
              const reader = new FileReader();

              // Define the onload event for when the file is read
              reader.onload = function (event: any) {
                // The result contains the Base64 string
                const base64String = event.target.result;

                // Log the Base64 string or use it as needed
                console.log(base64String);
                dispatch(addImage(base64String));
              };

              // Read the file as a Data URL (Base64 encoded)
              reader.readAsDataURL(file);
            } else {
              alert("Please select a file first!");
            }
          }}
          accept="image/*"
        />
      </div>
    </Box>
  );
}
