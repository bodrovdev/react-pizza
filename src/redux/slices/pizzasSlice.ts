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

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzasSliceState = {
  items: FetchedPizzaItem[],
  status: Status,
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING,
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState: initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      })
  }
})


export const selectPizzas = (state: RootState) => state.pizzas;

export default pizzasSlice.reducer;