import { createSlice } from '@reduxjs/toolkit';

// Retrieve the cart data from sessionStorage if it exists
let savedCart = [];
const cartData = window.sessionStorage.getItem('cart');
if (cartData) {
  try {
    savedCart = JSON.parse(cartData);
  } catch (error) {
    console.error('Error parsing cart data:', error);
  }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: savedCart,
  reducers: {
    add(state, action) {
      state.push(action.payload);
      window.sessionStorage.setItem('cart', JSON.stringify(state));
    },

    remove(state, action) {
      const updatedCart = state.filter(item => item._id !== action.payload);
      state.length = 0;
      state.push(...updatedCart);
      window.sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    },

    // eslint-disable-next-line no-unused-vars
    clear(state, action) {
      state.length = 0;
      window.sessionStorage.removeItem('cart');
    }
  },
});

export const { add, remove, clear } = cartSlice.actions;
export default cartSlice.reducer;
