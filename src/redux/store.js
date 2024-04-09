import { configureStore } from '@reduxjs/toolkit'

import sortSlice from './slices/sortSlice'
import searchSlice from './slices/searchSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    sort: sortSlice,
    search: searchSlice,
    cart: cartSlice,
  },
})