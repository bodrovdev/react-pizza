import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryValue: 0,
  sortValue: { sortName: 'По цене', sortType: 'price' },
  sortDir: false,
  searchValue: '',
  localSearchValue: '',
}

export const sortSlice = createSlice({
  name: 'sort',
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

export const selectSort = (state) => state.sort;

export const { setCategoryValue, setSortValue, setSortDir, setSearchValue, setLocalSearchValue, setSorting, resetSorting } = sortSlice.actions;

export default sortSlice.reducer;