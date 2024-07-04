import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ToCartPizzaItem } from '../../components/common/Types/PizzaItem.type'

type CartSliceState = {
  totalPrice: number,
  totalAmount: number,
  itemsInCart: ToCartPizzaItem[],
  isVisibleAlert: boolean,
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalAmount: 0,
  itemsInCart: [],
  isVisibleAlert: false,
}

const updateInfo = (state: CartSliceState): void => {
  state.totalPrice = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalAmount = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

const existedItem = (state: CartSliceState, payload: string): ToCartPizzaItem => {
  return state.itemsInCart.find(obj => obj.keyword === payload)!;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem: (state, action) => {
      const match = existedItem(state, action.payload.keyword);

      if (state.totalAmount + action.payload.count > 99) {
        state.isVisibleAlert = true;
        return;
      }
      else {
        match ? match.count = match.count + action.payload.count : state.itemsInCart.push({ ...action.payload });
        updateInfo(state);
      }
    },

    removeItem: (state, action) => {
      const match = existedItem(state, action.payload.keyword);

      match!.count === 1 ? state.itemsInCart.splice(state.itemsInCart.indexOf(match!), 1) : match!.count--;
      updateInfo(state);
    },

    removeStack: (state, action) => {
      const match = existedItem(state, action.payload.keyword);

      state.itemsInCart.splice(state.itemsInCart.indexOf(match!), 1);
      updateInfo(state);
    },

    clearItems: (state) => {
      state.itemsInCart = [];
      updateInfo(state);
    },

    hideAlert: (state) => {
      state.isVisibleAlert = false;
    },
  },
})

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeItem, removeStack, clearItems, hideAlert } = cartSlice.actions;

export default cartSlice.reducer;