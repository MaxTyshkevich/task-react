import { useNavigate } from 'react-router-dom';
import { authActions } from '../slices/Auth';
import { apiSlice } from './apiSlice';

interface UserData {
  login: string;
  password: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: UserData) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(authActions.setAuthData(data));
        } catch (error) {}
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
