import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Visit {
  condition: string;
  notes: string;
  createdAt: string;
  surveyor: string;
}

interface AddVisitPayload {
  itemId: string;
  visit: {
    condition: string;
    notes: string;
    createdAt: string;
    surveyor: string;
  }
}

export interface Item {
  id: string;
  equipmentName: string;
  x: number;
  y: number;
  floor: number;
  manufacturer?: string;
  model?: string;
  serialNumber?: string;
  equipmentType?: string;
  size?: string;
  material?: string;
  manufacturingYear?: number;
  visits: Visit[];
}

interface BackendSlice {
  items: Item[];
}

const initialState: BackendSlice = {
  items: [
    {
      id: "fdfdsfdsfds",
      x: 0.1,
      y: 0.2,
      floor: 1,
      serialNumber: "test",
      material: "material",
      model: "model",
      manufacturer: "dsffds",
      equipmentName: "useless",
      visits: [
        {
          condition: "good",
          notes: "Stunning",
          createdAt: new Date(2024, 11, 8).toLocaleDateString(),
          surveyor: "Mike J",
        },
        {
          condition: "horrible",
          notes: "Very bad",
          createdAt: new Date(2024, 3, 2).toLocaleDateString(),
          surveyor: "Jake L",
        },
      ],
    },
  ],
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
    addVisit: (state, action: PayloadAction<AddVisitPayload>) => {
      const item = state.items.find(item => item.id === action.payload.itemId);
      if (item) {
        item.visits.push(action.payload.visit);
      }}
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = backendSlice.actions;

export default backendSlice.reducer;
