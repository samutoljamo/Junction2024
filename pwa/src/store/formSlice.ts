import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./backendSlice";
interface FormSlice {
  images: {
    data: string;
    id: number;
  }[];
  equipmentName: string;
  x: number;
  y: number;
  manufacturer: string;
  model: string;
  serialNumber: string;
  equipmentType: string;
  size: string;
  material: string;
  condition: string;
  freeComment: string;
  manufacturingYear?: number;
  floor: number;
}

const initialState: FormSlice = {
  images: [],
  equipmentName: "",
  x: 0,
  y: 0,
  manufacturer: "",
  model: "",
  serialNumber: "",
  equipmentType: "",
  size: "",
  material: "",
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
    setManufacturer: (state, action: PayloadAction<string>) => {
      state.manufacturer = action.payload;
    },
    setX: (state, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    setY: (state, action: PayloadAction<number>) => {
      state.y = action.payload;
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
    setMaterial: (state, action: PayloadAction<string>) => {
      state.material = action.payload;
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
    resetForm: (state) => {
      for (const key of Object.keys(initialState)) {
        state[key] = initialState[key];
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addImage,
  removeImage,
  setEquipmentName,
  setX,
  setY,
  setManufacturer,
  setModel,
  setSerialNumber,
  setEquipmentType,
  setSize,
  setManufacturingYear,
  setMaterial,
  setCondition,
  setFreeComment,
  setFloor,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
