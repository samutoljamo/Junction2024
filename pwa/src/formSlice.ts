import { createSlice } from '@reduxjs/toolkit'
interface FormSlice {
    images: string[];
}

const initialState: FormSlice = {
    images: [],
}
export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { addImage } = formSlice.actions

export default formSlice.reducer