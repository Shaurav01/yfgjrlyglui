


import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 1. Create root reducer
const rootReducer = combineReducers({
  user: userReducer,
});

// 2. Persist config
const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

// 3. Wrap root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // 🚀 avoid warning
      },
    }),
});

// 5. Create persistor
export const persistor = persistStore(store);
