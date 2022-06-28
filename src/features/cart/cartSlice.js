import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../cartItems';

const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: state => {
      state.cartItems = [];
      //   return { cartItems : []}
    },
    removeItem: (state, action) => {
      const {
        payload: { id },
      } = action;
      const items = state.cartItems.filter(cur => cur.id !== id);
      state.cartItems = [...items];
    },
    increase: (state, action) => {
      const {
        payload: { id },
      } = action;
      const cartItem = state.cartItems.find(cur => cur.id === id);
      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const {
        payload: { id },
      } = action;
      const cartItem = state.cartItems.find(cur => cur.id === id);
      cartItem.amount -= 1;
    },
    calculateTotals: state => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach(cur => {
        amount += cur.amount;
        total += cur.amount * cur.price;
      });

      state.amount = amount;
      state.total = total.toFixed(2);
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
