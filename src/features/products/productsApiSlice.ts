import { apiSlice } from '@/app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ limit }) => ({
        url: `/products?limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetProductsQuery } = userApiSlice;
