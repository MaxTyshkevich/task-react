import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../types';
import { USER_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { authApiSlice } from '../services/authSlice';

export interface UserSchema {
  authData: IUser | null;
}
const storedToken = localStorage.getItem(USER_LOCALSTORAGE_KEY);

const initialState: UserSchema = {
  authData: storedToken ? JSON.parse(storedToken) : null,
};

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload));
      state.authData = action.payload;
    },

    logout: (state) => {
      console.log('logout');
      state.authData = null;
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
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
