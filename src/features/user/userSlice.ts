import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
type initialStateType = {
  cart: any[];
  mode: string;
};

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  mode: localStorage.getItem('mode')
    ? localStorage.getItem('mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light',
} as initialStateType;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeMode: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        localStorage.setItem('mode', 'dark');
      } else {
        state.mode = 'light';
        localStorage.setItem('mode', 'light');
      }
    },

    addCart: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        console.log(state.cart[index].quantity, action.payload.stock);
        if (state.cart[index].quantity < action.payload.stock) {
          state.cart[index].quantity += 1;
        }
      } else {
        state.cart.push({
          id: action.payload.id,
          quantity: 1,
        });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    reduceCart: (state, action) => {
      // if there is already a product in the cart, reduce the quantity
      const index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        // if the quantity is 1, remove the product from the cart else reduce the quantity by 1
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeCart: (state, action) => {
      // remove the product from the cart
      const index = state.cart.findIndex((item) => item.id === action.payload);
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { changeMode, addCart, reduceCart, removeCart } = userSlice.actions;

export const selectMode = (state: RootState) => state.user.mode;

export const selectCart = (state: RootState) => state.user.cart;

export const selectCartCount = (state: RootState) => state.user.cart.length;

export default userSlice.reducer;
