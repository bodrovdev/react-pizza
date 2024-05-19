import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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

const initialState = {
  items: [],
  status: 'loading',
}

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

export const selectPizzas = (state) => state.pizzas;

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;