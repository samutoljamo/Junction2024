import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface FormSlice {
  images: {
    data: string;
    id: number;
  }[];
  equipmentName: string;
  locationInBuilding: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  equipmentType: string;
  size: string;
  typeOfMaterial: string;
  condition: string;
  freeComment: string;
  manufacturingYear: number | null;
  floor: number;
}

const initialState: FormSlice = {
  images: [],
  equipmentName: "",
  locationInBuilding: "",
  manufacturer: "",
  manufacturingYear: null,
  model: "",
  serialNumber: "",
  equipmentType: "",
  size: "",
  typeOfMaterial: "",
  condition: "",
  freeComment: "",
  floor: 1,
};
let id = 0;
export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push({
        data: action.payload,
        id: id++,
      });
    },
    removeImage: (state, action) => {
      state.images = state.images.filter(
        (image) => image.id !== action.payload
      );
    },
    setEquipmentName: (state, action: PayloadAction<string>) => {
      state.equipmentName = action.payload;
    },
    setLocationInBuilding: (state, action: PayloadAction<string>) => {
      state.locationInBuilding = action.payload;
    },
    setManufacturer: (state, action: PayloadAction<string>) => {
      state.manufacturer = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    setManufacturingYear: (state, action: PayloadAction<number>) => {
      state.manufacturingYear = action.payload;
    },
    setSerialNumber: (state, action: PayloadAction<string>) => {
      state.serialNumber = action.payload;
    },
    setEquipmentType: (state, action: PayloadAction<string>) => {
      state.equipmentType = action.payload;
    },
    setSize: (state, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    setTypeOfMaterial: (state, action: PayloadAction<string>) => {
      state.typeOfMaterial = action.payload;
    },
    setCondition: (state, action: PayloadAction<string>) => {
      state.condition = action.payload;
    },
    setFreeComment: (state, action: PayloadAction<string>) => {
      state.freeComment = action.payload;
    },
    setFloor: (state, action: PayloadAction<number>) => {
      state.floor = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addImage,
  removeImage,
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
  setFloor,
} = formSlice.actions;

export default formSlice.reducer;
