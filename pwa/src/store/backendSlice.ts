import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Visit {
  condition: string;
  notes: string;
  createdAt: number;
}

interface Item {
  id: string;
  x: number;
  y: number;
  floor: number;
  serialNumber: string;
  material: string;
  model: string;
  manufacturer: string;
  description: string;
  visits: Visit[];
}

interface BackendSlice {
  items: Item[];
}

const initialState: BackendSlice = {
  items: [],
};

export const backendSlice = createSlice({
  name: "backend",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Item, "id">>) => {
      state.items.push({
        id: uuidv4(),
        ...action.payload,
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = backendSlice.actions;

export default backendSlice.reducer;
