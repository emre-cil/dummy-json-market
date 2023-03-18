import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type initialStateType = {
  cart: any[];
  mode: string;
};

const initialState = {
  cart: [],
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

    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },

    removeFromCart: (state, action) => {
      const index = state.cart.findIndex((item) => item.id === action.payload.id);

      const newCart = [...state.cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      }

      state.cart = newCart;
    },
  },
});

export const { changeMode } = userSlice.actions;

export const selectMode = (state: RootState) => state.user.mode;

export const selectCart = (state: RootState) => state.user.cart;

export default userSlice.reducer;
