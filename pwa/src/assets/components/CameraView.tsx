import { Camera } from "react-camera-pro";
import { useRef } from 'react';
import { Button, Stack, Typography, Grid, Box } from '@mui/joy';
import { useAppSelector, useAppDispatch } from "../../store";
import { addImage, removeImage } from "../../formSlice";

export default function CameraView() {
  const camera = useRef(null);
  const images = useAppSelector((state) => state.form.images);
  const dispatch = useAppDispatch()

  return (
    <Stack spacing={2} alignItems="center" sx={{ width: '100%', mx: 'auto', p: 2 }}>
      <Camera ref={camera} errorMessages={{}} aspectRatio={1} />
      <Typography>Images</Typography>
        <Grid container spacing={1} justifyContent="center">
        {images.map((image, index) => (
          <Grid xs={4} key={index} onClick={() => {
            dispatch(removeImage(image.id))
          }}>
          <img 
            src={image.data} 
            alt={`Captured ${index}`} 
            style={{
              width: '100%',
              borderRadius: '8px',
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
            dispatch(addImage(capturedImage))
          }
        }}
      >
        Capture Image
      </Button>
    </Stack>
  );
}
