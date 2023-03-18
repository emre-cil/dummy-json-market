import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ skip }) => ({
        url: `/products?skip=${skip}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = userApiSlice;
