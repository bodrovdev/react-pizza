import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getLocalUpdatedAmount, getLocalUpdatedPrice, parsedLocalData } from '../../utils/getFromLS'

import { ToCartPizzaItem } from '../../components/common/Types/PizzaItem.type'
import { CartSliceState } from './types'

const initialState: CartSliceState = {
  itemsInCart: parsedLocalData,
  totalAmount: getLocalUpdatedAmount(),
  totalPrice: getLocalUpdatedPrice(),
}

const updateInfo = (state: CartSliceState): void => {
  state.totalPrice = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalAmount = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

const existedItem = (state: CartSliceState, payload: string): ToCartPizzaItem | undefined => {
  return state.itemsInCart.find(obj => obj.keyword === payload);
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem: (state, action: PayloadAction<ToCartPizzaItem>) => {
      const match = existedItem(state, action.payload.keyword);

      if (state.totalAmount + action.payload.count > 99) {
        return;
      }
      else {
        match ? match.count += action.payload.count : state.itemsInCart.push({ ...action.payload });
        updateInfo(state);
      }
    },

    increaseItem: (state, action: PayloadAction<{ keyword: string, count: number }>) => {
      const match = existedItem(state, action.payload.keyword);

      if (state.totalAmount + action.payload.count > 99) {
        return;
      }
      else if (match) {
        match.count += action.payload.count;
        updateInfo(state);
      }
    },

    removeItem: (state, action: PayloadAction<ToCartPizzaItem>) => {
      const match = existedItem(state, action.payload.keyword);

      if (match) {
        state.itemsInCart.splice(state.itemsInCart.indexOf(match), 1);
        updateInfo(state);
      }
    },

    decreaseItem: (state, action: PayloadAction<{ keyword: string, count: number }>) => {
      const match = existedItem(state, action.payload.keyword);

      if (match && match.count > 1) {
        match.count--;
        updateInfo(state);
      }
    },

    removeStack: (state, action: PayloadAction<{ keyword: string }>) => {
      const match = existedItem(state, action.payload.keyword);

      if (!match) {
        return;
      }
      state.itemsInCart.splice(state.itemsInCart.indexOf(match), 1);
      updateInfo(state);
    },

    clearItems: (state) => {
      state.itemsInCart = [];
      updateInfo(state);
    },
  },
})

export const { addItem, increaseItem, removeItem, decreaseItem, removeStack, clearItems } = cartSlice.actions;

export default cartSlice.reducer;