import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FilterSliceState = {
  categoryValue: number,
  sortValue: { sortName: string, sortType: 'rating' | 'title' | 'price' },
  sortDir: boolean,
  searchValue: string,
  localSearchValue: string,
}

const initialState: FilterSliceState = {
  categoryValue: 0,
  sortValue: { sortName: 'По цене', sortType: 'price' },
  sortDir: false,
  searchValue: '',
  localSearchValue: '',
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState: initialState,

  reducers: {
    setCategoryValue: (state, action) => {
      state.categoryValue = action.payload;
    },

    setSortValue: (state, action) => {
      state.sortValue = action.payload;
    },

    setSortDir: (state, action) => {
      state.sortDir = action.payload;
    },

    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },

    setLocalSearchValue: (state, action) => {
      state.localSearchValue = action.payload;
    },

    setSorting: (state, action) => {
      state.categoryValue = Number(action.payload.category);
      state.sortValue = action.payload.sortStartValue;
      state.sortDir = action.payload.order === 'desc' ? false : true;
    },

    resetSorting: () => initialState,
  },
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryValue, setSortValue, setSortDir, setSearchValue, setLocalSearchValue, setSorting, resetSorting } = filterSlice.actions;

export default filterSlice.reducer;