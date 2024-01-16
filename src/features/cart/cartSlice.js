import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: defaultState,
  reducers: {
    addItem: (state, action) => {
      console.log(`adding ${action.payload} to cart`);
    },
    clearCart: (state) => {
      console.log('clearing cart')
    },

    removeItem: (state, action) => {
      console.log('remove item')
    },
    editItem: (state, action) => {
      console.log('edit item')
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;