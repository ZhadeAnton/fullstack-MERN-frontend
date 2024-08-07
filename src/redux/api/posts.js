import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getCookieToken } from './utils.js';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    prepareHeaders: (headers) => {
      const token = getCookieToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: ({ query, mutation }) => ({
    getPosts: query({
      query: () => ({ url: '/posts' }),
      transformResponse: (response) => {
        return response;
      },
    }),
    getPostById: query({
      query: (id) => ({ url: `/posts/${id}` }),
      transformResponse: (response) => {
        return response;
      },
    }),
    getTags: query({
      query: () => ({ url: '/tags' }),
      transformResponse: (response) => {
        return response;
      },
    }),
    createPost: mutation({
      query: ({ id, ...postData }) => ({
        url: '/posts',
        method: 'POST',
        body: postData,
      }),
      transformResponse: (response) => {
        return response;
      },
    }),
    uploadImage: mutation({
      query: (data) => {
        console.log('data', data);
        return {
          url: '/upload',
          method: 'POST',
          body: data,
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useGetTagsQuery,
  useLazyGetTagsQuery,
  useUploadImageMutation,
  useCreatePostMutation,
} = postsApi;
