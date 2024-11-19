import { RootState } from '../../store';

export const getUserAuthData = (state: RootState) => state.auth.authData;
