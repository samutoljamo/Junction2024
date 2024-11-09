import { createSlice } from '@reduxjs/toolkit'
interface FormSlice {
    images: ({
        data: string,
        id: number;
    })[];
}

const initialState: FormSlice = {
    images: [],
}
let id = 0;
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push({
        data: action.payload,
        id: id++,
      })
    },
    removeImage: (state, action) => {
        state.images = state.images.filter(image => image.id !== action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addImage, removeImage } = formSlice.actions

export default formSlice.reducer