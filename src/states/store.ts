// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
// Correct path
import userReducer from "./slices/userSlice";
import counterReducer from "./slices/counterSlice";
import scheduleReducer from "./slices/scheduleSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from 'redux-persist/lib/storage';

// Combine all reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  schedule: scheduleReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
