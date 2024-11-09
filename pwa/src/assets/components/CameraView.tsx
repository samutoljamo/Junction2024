import { Camera } from "react-camera-pro";
import { useState, useRef } from 'react';
import { Button, Stack, Typography, Grid, Box } from '@mui/joy';
import { useAppSelector, useAppDispatch } from "../../store";
import { addImage } from "../../formSlice";
export default function CameraView() {
    const [loc, setLoc] = useState('');
    const camera = useRef(null);
    const images = useAppSelector((state) => state.form.images);
    const dispatch = useAppDispatch();
  
    return (
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={2} alignItems="center" sx={{ width: '100%', mx: 'auto', p: 2, flexGrow: 1 }}>
          <Camera ref={camera} errorMessages={{}} aspectRatio={1} />
          <Typography>Images</Typography>
          <Grid container spacing={1} justifyContent="center">
            {images.map((image, index) => (
              <Grid xs={4} key={index}>
                <img
                  src={image}
                  alt={`Captured ${index}`}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Button
          sx={{ mt: 2 }}
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
      </Box>
    );
  }
  