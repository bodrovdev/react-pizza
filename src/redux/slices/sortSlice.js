import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryValue: 0,
  sortValue: { sortName: 'По цене', sortType: 'price' },
  sortDir: false,
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

    setSorting: (state, action) => {
      state.categoryValue = Number(action.payload.category);
      state.sortValue = action.payload.sortStartValue;
      state.sortDir = action.payload.order === 'desc' ? false : true;
    }
  },
})

export const { setCategoryValue, setSortValue, setSortDir, setSorting } = sortSlice.actions

export default sortSlice.reducer