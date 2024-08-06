import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: ({ query }) => ({
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
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
  useGetTagsQuery,
  useLazyGetTagsQuery,
} = postsApi;
