import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { ButtonGroup } from '@mui/joy';



export default function SerialNumberModel() {
  return (
    <main>
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Information</b>
          </Typography>
          <Typography level="body-sm">Verify the information.</Typography>
        </div>
        <FormControl>
          <FormLabel>Serial Number</FormLabel>
          <Input
            // html input attribute
            name="serialNumber"
            type="text"
            placeholder="123"
          />
        </FormControl>
        <ButtonGroup spacing="0.5rem" aria-label="spacing button group">
        <Button >Back</Button>
        <Button>Continue</Button>
        </ButtonGroup>
      </Sheet>
    </main>
  );
}
