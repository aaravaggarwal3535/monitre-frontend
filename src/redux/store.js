import { configureStore } from '@reduxjs/toolkit'
import idSlice from './credentials/idSlice'

export const store = configureStore({
  reducer: {
    id: idSlice,
  },
})