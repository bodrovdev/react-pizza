import { configureStore } from '@reduxjs/toolkit'

import sortSlice from './slices/sortSlice'
import searchSlice from './slices/searchSlice'

export const store = configureStore({
  reducer: {
    sort: sortSlice,
    search: searchSlice,
  },
})