import { RootState } from '../../store';

export const getUserAuthData = (state: RootState) => state.auth.authData;
export const getIsRemember = (state: RootState) => state.auth.isRemember;
