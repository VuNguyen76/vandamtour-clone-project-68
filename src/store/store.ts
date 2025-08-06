import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import bookingReducer from './bookingSlice';
import vehicleReducer from './vehicleSlice';
import contentReducer from './contentSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['booking', 'vehicle', 'content'],
};

export const store = configureStore({
  reducer: {
    booking: persistReducer(persistConfig, bookingReducer),
    vehicle: persistReducer(persistConfig, vehicleReducer),
    content: persistReducer(persistConfig, contentReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;