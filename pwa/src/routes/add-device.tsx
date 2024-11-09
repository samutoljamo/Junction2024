import React, { useRef, useState } from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Tooltip,
  Typography,
  Modal,
  Grid,
} from "@mui/joy";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { Camera, CameraType } from "react-camera-pro";
import { addImage, removeImage } from "../store/formSlice";

export default function AddDevice() {
  const navigate = useNavigate();

  // Handle the creation of a new machine
  const prompts = [" asdasd", "dsadasdasd", "kakakakak"];
  const camera = useRef<CameraType>(null);

  // Lähetä nää backendiin
  const images = useAppSelector((state) => state.form.images);
  const dispatch = useAppDispatch();

  const instructions = [
    "Take picture from info plate", // Message for 1 image
    "Take pic from the front", // Message for 2 images
    "Take any picture",
    "All pics taken", // Message for 3 images
  ];

  return (
    <CssVarsProvider>
      <CssBaseline />
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
        <Typography sx={{ marginBottom: 0 }}>
          {instructions[images.length]}{" "}
          {/* Dynamic text based on image count */}
        </Typography>{" "}
        <Button
          disabled={images.length > 2}
          onClick={() => {
            if (camera.current) {
              const capturedImage = camera.current.takePhoto();
              dispatch(addImage(capturedImage));
            }
          }}
        >
          Take picture
        </Button>
        <Grid py={2} container spacing={1} justifyContent="center">
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
        {/* <Typography> Or choose a file</Typography>
                <Grid>
                    <input type="file" id="fileInput" onChange={() => {
                        const fileInput: any = document.getElementById('fileInput');
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
                            alert('Please select a file first!');
                        }

                    }} accept="image/*" />
                </Grid> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end", // Aligns children to the bottom
            height: "100vh", // Ensures the container takes up full viewport height
          }}
        >
          <Button
            onClick={() => navigate("/information")}
            disabled={images.length < 3}
          >
            Continue
          </Button>
          <Button
            onClick={() => navigate("/map")}
            sx={{
              backgroundColor: "gray",
              color: "white",
              margin: 1,
              "&:hover": {
                backgroundColor: "darkgray",
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>

      {/* Modal for Machine Info */}
    </CssVarsProvider>
  );
}
