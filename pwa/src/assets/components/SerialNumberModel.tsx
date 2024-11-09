import * as React from "react";
import { useColorScheme } from "@mui/joy/styles";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { ButtonGroup, Select } from "@mui/joy";
import Textarea from "@mui/joy/Textarea";
import Box from "@mui/joy";
import { useSelector, useDispatch } from "react-redux";
import { formSlice } from "../../formSlice";
import { Option } from "@mui/joy";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';


import {
  setEquipmentName,
  setLocationInBuilding,
  setManufacturer,
  setModel,
  setSerialNumber,
  setEquipmentType,
  setSize,
  setManufacturingYear,
  setTypeOfMaterial,
  setCondition,
  setFreeComment,
} from "../../formSlice";
import { useUploadImageUploadPostMutation } from "../../store/backend";
import { useAppSelector } from "../../store";
import { useFormFill } from "../../hooks";

export default function SerialNumberModel() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const images = useAppSelector((state) => state.form.images);

  const {fillForm,isLoading} = useFormFill();

  React.useEffect(() => {
    fillForm();
  }, []);
  // Get the form values from the Redux store
  let form = useAppSelector((state) => state.form);
  console.log(form.equipmentName);
  return (
    <main>
      <Sheet
        sx={{
          width: "80%",
          mx: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
        {isLoading ? (
                <Stack
                direction="row"
                spacing={2}
                >
                    <CircularProgress/>
                    <Typography level="h4" component="h1">
                <b>Processing image</b>
            </Typography>
                    
                </Stack>
         ) : (
        <>        
                <Typography level="h4" component="h1">
                <b>Device information</b>
            </Typography>
            
            <Typography level="body-sm">
                Verify the information collected from image.
            </Typography></>
         )}
       
            
  
        </div>
        <FormControl>
          <FormLabel>Serial Number</FormLabel>
          <Input
            name="serialNumber"
            type="text"
            value={form.serialNumber}
            onChange={(e) => dispatch(setSerialNumber(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Equipment Name</FormLabel>
          <Input
            name="equipmentName"
            type="text"
            value={form.equipmentName}
            onChange={(e) => dispatch(setEquipmentName(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Location in the Building</FormLabel>
          <Input
            name="location"
            type="text"
            value={form.locationInBuilding}
            onChange={(e) => dispatch(setLocationInBuilding(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Manufacturer</FormLabel>
          <Input
            name="manufacturer"
            type="text"
            value={form.manufacturer}
            onChange={(e) => dispatch(setManufacturer(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Model</FormLabel>
          <Input
            name="model"
            type="text"
            value={form.model}
            onChange={(e) => dispatch(setModel(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Equipment Type</FormLabel>
          <Select
            name="equipmentType"
            value={form.equipmentType}
            onChange={(event, newValue) => dispatch(setEquipmentType(newValue))}
          >
            <Option value="structure">Structure</Option>
            <Option value="ventilation">Ventilation</Option>
            <Option value="electrical">Electrical</Option>
            <Option value="plumbing">Plumbing</Option>
            <Option value="other">Other</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Size</FormLabel>
          <Input
            name="size"
            type="text"
            value={form.size}
            onChange={(e) => dispatch(setSize(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Manufacturing Year</FormLabel>
          <Input
            name="age"
            type="number"
            value={form.age}
            onChange={(e) =>
              dispatch(setManufacturingYear(e.target.valueAsNumber))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel>Type of Material</FormLabel>
          <Input
            name="typeOfMaterial"
            type="text"
            value={form.typeOfMaterial}
            onChange={(e) => dispatch(setTypeOfMaterial(e.target.value))}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Condition</FormLabel>
          <Select
            name="condition"
            value={form.condition}
            onChange={(event, newValue) => dispatch(setCondition(newValue))}
          >
            <Option value="new">New</Option>
            <Option value="good">Good</Option>
            <Option value="fair">Fair</Option>
            <Option value="poor">Poor</Option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Free Comment</FormLabel>
          <Textarea
            minRows={2}
            name="freeComment"
            value={form.freeComment || ""}
            onChange={(e) => dispatch(setFreeComment(e.target.value))}
          />
        </FormControl>
        <ButtonGroup spacing="9.5rem" aria-label="spacing button group">
          <Button onClick={function () {navigate('/map');}}>Back</Button>
          <Button onClick={function () {}} variant="solid" color="primary">
            Add device
          </Button>
        </ButtonGroup>
      </Sheet>
    </main>
  );
}
