import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import cartItems from '../../cartItems';

const URL = 'https://course-api.com/react-useReducer-cart-project';

const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk('cart/getCartItems', () =>
  fetch(URL)
    .then(res => res.json())
    .catch(err => console.log(err.message))
);

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
  extraReducers: {
    [getCartItems.pending]: state => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: state => {
      state.isLoading = false;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
