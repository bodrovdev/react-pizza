import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalAmount: 0,
  itemsInCart: [],
}

const updateInfo = (state) => {
  state.totalPrice = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalAmount = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

const existedItem = (state, action) => {
  return state.itemsInCart.find(obj => obj.keyword === action.payload.keyword);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem: (state, action) => {

      if (existedItem(state, action)) {
        existedItem(state, action).count++;
      }
      else {
        state.itemsInCart.push({ ...action.payload, count: 1, });
      }

      updateInfo(state);
    },

    removeItem: (state, action) => {
      if (existedItem(state, action).count === 1) {
        state.items.splice(state.items.indexOf(existedItem), 1);
      }
      else {
        existedItem(state, action).count--;
      }
      updateInfo(state);
    },

    removeStack: (state, action) => {
      state.items.splice(state.items.indexOf(existedItem(state, action)), 1);
      updateInfo(state);
    },

    clearItems: (state) => {
      state.items = [];
      updateInfo(state);
    },
  },
})

export const selectCart = (state) => state.cart;

export const { addItem, removeItem, removeStack, clearItems } = cartSlice.actions;

export default cartSlice.reducer;