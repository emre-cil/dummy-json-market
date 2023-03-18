import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/products?limit=0`,
        method: 'GET',
      }),
    }),
    getProductWithId: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductWithIdQuery } = userApiSlice;
