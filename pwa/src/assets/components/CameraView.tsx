import { Camera, CameraType } from "react-camera-pro";
import { useRef } from "react";
import { Button,ButtonGroup, Stack, Typography, Grid, Box } from "@mui/joy";
import { useAppSelector, useAppDispatch } from "../../store";
import { addImage, removeImage } from "../../store/formSlice";
import { NavLink } from "react-router-dom";
import { useFormFill } from "../../hooks";

import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import * as React from 'react';

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
      <div style={{height: "300px",
        width: "400px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"}}>
        <Camera

          facingMode={"environment"}
          ref={camera}
          errorMessages={{}}
          aspectRatio={1}
        />
      </div>
      <Typography style={{marginTop:"50px"}} level="h4" component="h1" >Take photo from information panel </Typography>
      <Typography level="body-xs" >You can also take another photo from devices condition </Typography>
      
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
      <ButtonGroup sx={{ marginTop:1}}>
          <Button
          variant="outlined" color="primary"
          sx={{ width: 200 }}
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
          <Button style={{width:200}} variant="outlined" color="primary"
          >
            <div style={{paddingTop:"20px"}} >
            <label htmlFor="fileInput" >Select image from device</label>
              <input
                type="file"
                id="fileInput"
                style={{visibility:"hidden"}}
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
          </Button>
        </ButtonGroup>

      <Stack direction="column"
          spacing={1}
          sx={{justifyContent: "center",
            alignItems: "center", marginTop:1}}
          >

        
        <NavLink to="/locate">
          <Button
          sx={{ width: 400 }}
            onClick={() => {
              //    fillForm();
            }}
            color="success"
            endDecorator={<KeyboardArrowRight />}
          >
            Locate device
          </Button>
        </NavLink>
      </Stack>
    </Box>
  );
}
