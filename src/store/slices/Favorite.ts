import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FAVORITE_LOCALSTORAGE_KEY } from '../../const/localStorage';
import { IPost, IPostWithProfile } from '../types';

export interface FavoritesSchema {
  favoriteCards: IPostWithProfile[];
}

const favoritesFromStorage = localStorage.getItem(FAVORITE_LOCALSTORAGE_KEY);

const initialState: FavoritesSchema = {
  favoriteCards: favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IPostWithProfile>) => {
      const isFavorite =
        state.favoriteCards.find((card) => card.id === action.payload.id) !== undefined; // state.favoriteIds.includes(action.payload);

      if (isFavorite) {
        state.favoriteCards = state.favoriteCards.filter((card) => card.id !== action.payload.id);
      } else {
        state.favoriteCards.push(action.payload);
      }

      // Обновляем localStorage
      localStorage.setItem(FAVORITE_LOCALSTORAGE_KEY, JSON.stringify(state.favoriteCards));
    },
  },
});

export const { actions: favoriteActions, reducer: favoriteReducer } = favoritesSlice;
