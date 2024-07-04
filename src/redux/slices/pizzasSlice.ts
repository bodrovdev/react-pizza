import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchedPizzaItem } from '../../components/common/Types/PizzaItem.type';

//@ts-ignore
export const fetchPizzas = createAsyncThunk('pizzas/fetch', async ({ category, sortBy, order, name }) => {
  const { data } = await axios.get('https://653e4e07f52310ee6a9acea3.mockapi.io/items', {
    params: {
      category,
      sortBy,
      order,
      name
    }
  })
  return data;
})

type PizzasSliceState = {
  items: FetchedPizzaItem[],
  status: 'loading' | 'success' | 'error',
}

const initialState: PizzasSliceState = {
  items: [],
  status: 'loading',
}

//@ts-ignore
export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload
        state.status = "success"
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error"
        state.items = []
      })
  }
})

//@ts-ignore
export const selectPizzas = (state) => state.pizzas;

export default pizzasSlice.reducer;