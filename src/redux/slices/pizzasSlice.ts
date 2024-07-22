import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { FetchedPizzaItem } from '../../components/common/Types/PizzaItem.type';
import { RootState } from '../store'

const axiosInstance = axios.create({
  baseURL: 'https://653e4e07f52310ee6a9acea3.mockapi.io',
  timeout: 1000,
});

export const fetchPizzas = createAsyncThunk('pizzas/fetch', async ({ category, order, sortBy, name }: Record<string, string>) => {
  const { data } = await axiosInstance.get<FetchedPizzaItem[]>('items', {
    params: {
      category,
      order,
      sortBy,
      name,
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

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading"
        state.items = []
      })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload
      state.status = "success"
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = "error"
      state.items = []
    })
  }
})


export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;