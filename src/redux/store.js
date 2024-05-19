import { configureStore } from '@reduxjs/toolkit'

import sortSlice from './slices/sortSlice'
import cartSlice from './slices/cartSlice'
import pizzasSlice from './slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    sort: sortSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
})