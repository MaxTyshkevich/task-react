import { createTransform } from 'redux-persist';
import { UserSchema } from '../slices/Auth';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
const initialAuthState: UserSchema = {
  authData: null,
  isRemember: false,
};

const authTransform = createTransform(
  (inboundState: UserSchema, key) => {
    console.log('inboundState', { inboundState, key });

    return inboundState.isRemember ? inboundState : initialAuthState;
  },

  (outboundState) => outboundState,
  { whitelist: ['auth'] },
);

export const persistConfig = {
  key: 'root',
  storage,
  transforms: [authTransform],
  whitelist: ['auth', 'favorite'],
};
