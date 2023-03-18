import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';

type initialStateType = {
  basket: any[];
  mode: string;
};

const initialState = {
  basket: [],
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

    addToBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },

    removeFromBasket: (state, action) => {
      const index = state.basket.findIndex((basketItem) => basketItem.id === action.payload.id);

      const newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      }

      state.basket = newBasket;
    },
  },
});

export const { changeMode } = userSlice.actions;

export const selectMode = (state: RootState) => state.user.mode;

export const selectBasket = (state: RootState) => state.user.basket;

export default userSlice.reducer;
