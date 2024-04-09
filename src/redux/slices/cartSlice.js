import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  items: [],
}

const updateInfo = (state) => {
  state.totalPrice = state.items.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalAmount = state.items.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem: (state, action) => {
      const existedItem = state.items.find(obj => obj.keyword === action.payload.keyword);

      if (existedItem) {
        existedItem.count++;
      }
      else {
        state.items.push({ ...action.payload, count: 1, });
      }
      updateInfo(state);
    },

    removeItem: (state, action) => {
      const existedItem = state.items.find(obj => obj.keyword === action.payload.keyword);

      if (existedItem.count === 1) {
        state.items.splice(state.items.indexOf(existedItem), 1);
      }
      else {
        existedItem.count--;
      }
      updateInfo(state);
    },

    clearItems: (state) => {
      state.items = []
    },
  },
})

export const { addItem, removeItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;