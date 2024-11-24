import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { authApiSlice } from '../services/authSlice';

export interface UserSchema {
  authData: IUser | null;
}

const initialState: UserSchema = {
  authData: null,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      state.authData = action.payload;
    },

    logout: (state) => {
      console.log('logout');
      state.authData = null;
    },
  },
  extraReducers(builder) {
    /*  builder.addMatcher(authApiSlice.endpoints.login.matchFulfilled, (state, { payload }) => {
      console.log(`builder.addMatcher`);
      state.authData = payload;
    }); */
  },
});

export const { actions: authActions } = AuthSlice;
export const { reducer: authReducer } = AuthSlice;
