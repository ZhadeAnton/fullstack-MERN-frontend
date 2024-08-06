import { configureStore } from '@reduxjs/toolkit';
import { postsApi } from './api/posts.js';
import { authApi } from './api/auth.js';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware, postsApi.middleware),
});
