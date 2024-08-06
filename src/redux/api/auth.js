import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from './utils.js';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/auth',
    prepareHeaders: (headers) => {
      const token = getCookieToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: ({ query }) => ({
    login: query({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const { useLazyLoginQuery, useLoginQuery } = authApi;
