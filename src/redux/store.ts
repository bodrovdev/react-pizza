import { configureStore } from '@reduxjs/toolkit'

import cartSlice from './Cart/slice'
import filterSlice from './Filter/slice'
import pizzasSlice from './Pizza/slice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    filter: filterSlice,
    pizzas: pizzasSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;