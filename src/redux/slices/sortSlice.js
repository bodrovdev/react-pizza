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
  },
})

export const { setCategoryValue, setSortValue, setSortDir } = sortSlice.actions

export default sortSlice.reducer