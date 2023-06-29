import { combineReducers } from 'redux';
import { contactsReducer, filterReducer } from './contactsSlice';
import { userReducer } from './userSlise';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, userReducer);

export const reducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
  user: persistedReducer,
});
