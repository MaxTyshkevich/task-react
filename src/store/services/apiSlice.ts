import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/',
  prepareHeaders: (headers, { getState }) => {
    const store = getState() as RootState;
    const token = store.auth.authData ? JSON.stringify(store.auth.authData) : null;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithRejection = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: any,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    // Если ошибка на уровне сети (например, таймаут)
    return result;
  }

  if (result.meta?.response?.status && result.meta.response.status >= 400) {
    console.log('baseQueryWithRejection', result);
    return {
      error: {
        status: result.meta.response.status,
        data: result.data,
      },
    };
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithRejection,
  tagTypes: ['Profile', 'Post', 'Comment'],
  endpoints: () => ({}),
});
