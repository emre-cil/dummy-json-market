/* eslint-disable @typescript-eslint/ban-types */
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  // TODO: move to dev and prod env localhost for dev and prod url for prod
  baseUrl: import.meta.env.VITE_API_URL || 'https://dummyjson.com',
  prepareHeaders: (headers) => {
    // const token = (getState() as RootState).user.token;
    // if (token) {
    //   headers.set('authorization', `Bearer ${token}`);
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
  const result = await baseQuery(args, api, extraOptions);
  // === 401 Unauthorized Operations === //
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
