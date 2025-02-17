import { createSlice } from '@reduxjs/toolkit'

export const idSlice = createSlice({
  name: 'id',
  initialState: {
    value: localStorage.getItem('userId') || "", // Load the user ID from localStorage
  },
  reducers: {
    assignId: (state, action) => {
      state.value = action.payload;
      localStorage.setItem('userId', action.payload);
    },
    clearId: (state) => {
      state.value = "";
      localStorage.removeItem('userId'); 
    },
  },
})

export const { assignId, clearId } = idSlice.actions

export default idSlice.reducer