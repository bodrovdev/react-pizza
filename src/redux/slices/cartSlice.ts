import { createSlice } from '@reduxjs/toolkit'

type ItemType = {
  id: number,
  imageUrl: string,
  name: string,
  price: number,
  type: string,
  size: number,
  keyword: string,
  count: number,
}

type CartSliceState = {
  totalPrice: number,
  totalAmount: number,
  itemsInCart: ItemType[],
}

const initialState: CartSliceState = {
  totalPrice: 0,
  totalAmount: 0,
  itemsInCart: [],
}

const updateInfo = (state: CartSliceState): void => {
  state.totalPrice = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.price * obj.count;
  }, 0);

  state.totalAmount = state.itemsInCart.reduce((sum, obj) => {
    return sum + obj.count;
  }, 0);
}

const existedItem = (state: CartSliceState, payload: string): ItemType => {
  return state.itemsInCart.find(obj => obj.keyword === payload)!;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,

  reducers: {
    addItem: (state, action) => {
      const match = existedItem(state, action.payload.keyword);

      match ? match.count++ : state.itemsInCart.push({ ...action.payload, count: 1, });
      updateInfo(state);
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
  },
})

export const selectCart = (state: any) => state.cart;

export const { addItem, removeItem, removeStack, clearItems } = cartSlice.actions;

export default cartSlice.reducer;