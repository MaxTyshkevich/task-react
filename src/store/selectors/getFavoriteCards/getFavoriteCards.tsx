import { RootState } from '../../store';

export const getFavoriteCards = (state: RootState) => state.favorite.favoriteCards;
