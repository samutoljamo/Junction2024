import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { ButtonGroup, Select } from '@mui/joy';
import Textarea from '@mui/joy/Textarea';
import Box from '@mui/joy';



export default function SerialNumberModel() {
  return (
    <main>
      <Sheet
        sx={{
          width: '60%',
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
            <b>Device information</b>
          </Typography>
          <Typography level="body-sm">Verify the information collected from image.</Typography>
        </div>
        <FormControl>
          <FormLabel>Serial Number</FormLabel>
          <Input
            // html input attribute
            name="serialNumber"
            type="text"

          />
        </FormControl>
        <FormControl>
        <FormLabel>Equipment Name</FormLabel>
        <Input name="equipmentName" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Location in the Building</FormLabel>
            <Input name="location" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Manufacturer</FormLabel>
            <Input name="manufacturer" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Model</FormLabel>
            <Input name="model" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Serial Number</FormLabel>
            <Input name="serialNumber" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Equipment Type</FormLabel>
            <Select name="equipmentType" defaultValue="">
            <option value="structure">Structure</option>
            <option value="ventilation">Ventilation</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="other">Other</option>
            </Select>
        </FormControl>

        <FormControl>
            <FormLabel>Size</FormLabel>
            <Input name="size" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Age</FormLabel>
            <Input name="age" type="number" />
        </FormControl>

        <FormControl>
            <FormLabel>Type of Material</FormLabel>
            <Input name="materialType" type="text" />
        </FormControl>

        <FormControl>
            <FormLabel>Condition</FormLabel>
            <Select name="condition" defaultValue="">
            <option value="new">New</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            </Select>
        </FormControl>

        <FormControl>
        <FormLabel>Free comment</FormLabel>
        <Textarea  minRows={2} name="FreeComment" />
        </FormControl>
        <ButtonGroup spacing="107.9px" aria-label="spacing button group">
        <Button onClick={function(){}}  >Back</Button>
        <Button onClick={function(){}} variant="solid" color="primary" >Continue</Button>
        </ButtonGroup>
      </Sheet>
    </main>
  );
}
