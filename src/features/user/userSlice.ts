import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/app/store';
import type { AddressType } from '@/pages/Address/Address';

type initialStateType = {
  cart: any;
  favorites: string[];
  addressList: AddressType[];
  mode: string;
};

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  addressList: JSON.parse(localStorage.getItem('addressList') || '[]'),
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
      // if there is already a product in the cart, increase the quantity
      const index = state.cart.findIndex((item: any) => item.id === action.payload.id);
      if (index !== -1) {
        // if the quantity is less than the stock, increase the quantity by quantity
        if (state.cart[index].quantity < action.payload.stock) {
          state.cart[index].quantity += action.payload.quantity;
        }
      } else {
        // if there is no product in the cart, add the product to the cart
        state.cart.push({
          id: action.payload.id,
          quantity: action.payload.quantity,
        });
      }
      // save the cart to the local storage
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    reduceCart: (state, action) => {
      // if there is already a product in the cart, reduce the quantity
      const index = state.cart.findIndex((item: any) => item.id === action.payload.id);
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
      const index = state.cart.findIndex((item: any) => item.id === action.payload);
      state.cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    emptyCart: (state) => {
      // remove all products from the cart
      state.cart = [];
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    handleFavorite: (state, action) => {
      // if the product is already in the favorites, remove it from the favorites
      // else add it to the favorites
      const index = state.favorites.findIndex((item: string) => item === action.payload);

      if (index !== -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    addAddress: (state, action) => {
      state.addressList.push(action.payload);
      localStorage.setItem('addressList', JSON.stringify(state.addressList));
    },

    removeAddress: (state, action) => {
      const index = state.addressList.findIndex((item: AddressType) => item.id === action.payload);
      state.addressList.splice(index, 1);
      localStorage.setItem('addressList', JSON.stringify(state.addressList));
    },
  },
});

export const { changeMode, addCart, reduceCart, removeCart, handleFavorite, addAddress, removeAddress, emptyCart } =
  userSlice.actions;

export const selectMode = (state: RootState) => state.user.mode;

export const selectCart = (state: RootState) => state.user.cart;

export const selectCartCount = (state: RootState) => state.user.cart.length;

export const selectFavorites = (state: RootState) => state.user.favorites;

export const selectAddressList = (state: RootState) => state.user.addressList;

export default userSlice.reducer;
