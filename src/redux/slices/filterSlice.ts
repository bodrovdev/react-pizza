import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { SortType } from '../../components/pages/Home/Sort';
import { PayloadAction } from '@reduxjs/toolkit';

export type FilterSliceState = {
  categoryValue: string,
  sortValue: SortType,
  sortDir: boolean,
  searchValue: string,
  localSearchValue: string,
}

const initialState: FilterSliceState = {
  categoryValue: '',
  sortValue: {
    sortName: 'По цене',
    sortType: 'price'
  },
  sortDir: false,
  searchValue: '',
  localSearchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setCategoryValue: (state, action: PayloadAction<string>) => {
      state.categoryValue = action.payload === '0' ? '' : action.payload;
    },

    setSortValue: (state, action: PayloadAction<SortType>) => {
      state.sortValue = action.payload;
    },

    setSortDir: (state, action: PayloadAction<boolean>) => {
      state.sortDir = action.payload;
    },

    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },

    setLocalSearchValue: (state, action: PayloadAction<string>) => {
      state.localSearchValue = action.payload;
    },

    setSorting: (state, action: PayloadAction<FilterSliceState>) => {
      state.categoryValue = action.payload.categoryValue;
      state.sortValue = action.payload.sortValue;
      state.sortDir = action.payload.sortDir;
      state.searchValue = action.payload.searchValue;
      state.localSearchValue = action.payload.localSearchValue;
    },

    resetSorting: () => initialState,
  },
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryValue, setSortValue, setSortDir, setSearchValue, setLocalSearchValue, setSorting, resetSorting } = filterSlice.actions;

export default filterSlice.reducer;