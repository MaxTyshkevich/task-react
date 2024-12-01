import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FAVORITE_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { IPostWithProfile } from '../types';

interface filterPostsSliceShema {
  filterByName: string;
  page: number;
}

const initialState: filterPostsSliceShema = {
  filterByName: 'All',
  page: 1,
};

const filterPostsSlice = createSlice({
  name: 'filter_Posts',
  initialState,
  reducers: {
    selectFilterByName: (state, action: PayloadAction<string>) => {
      state.filterByName = action.payload;
      state.page = 1;
    },
    nextPage(state) {
      state.page += 1;
    },
  },
});

export const { actions: filterPostsActions, reducer: filterPostsReducer } = filterPostsSlice;
