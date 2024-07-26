import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { SortType } from '../../components/pages/Home/Sort';
import { PayloadAction } from '@reduxjs/toolkit';

export type FilterSliceState = {
  category: string,
  sort: SortType,
  order: boolean,
  search: string,
  localSearch: string,
}

const initialState: FilterSliceState = {
  category: '',
  sort: {
    name: 'По цене',
    sortBy: 'price'
  },
  order: false,
  search: '',
  localSearch: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload === '0' ? '' : action.payload;
    },

    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload;
    },

    setOrder: (state, action: PayloadAction<boolean>) => {
      state.order = action.payload;
    },

    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setLocalSearch: (state, action: PayloadAction<string>) => {
      state.localSearch = action.payload;
    },

    setSorting: (state, action: PayloadAction<FilterSliceState>) => {
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.search = action.payload.search;
      state.localSearch = action.payload.search;
    },

    resetSorting: () => initialState,
  },
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategory, setSort, setOrder, setSearch, setLocalSearch, setSorting, resetSorting } = filterSlice.actions;

export default filterSlice.reducer;