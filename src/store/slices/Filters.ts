import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FAVORITE_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { IPostWithProfile } from '../types';

interface filterPostsSliceShema {
  filterByName: string;
}

const initialState: filterPostsSliceShema = {
  filterByName: 'All',
};

const filterPostsSlice = createSlice({
  name: 'filter_Posts',
  initialState,
  reducers: {
    selectFilterByName: (state, action: PayloadAction<string>) => {
      state.filterByName = action.payload;
    },
  },
});

export const { actions: filterPostsActions, reducer: filterPostsReducer } = filterPostsSlice;
