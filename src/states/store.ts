// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
// Correct path
import userReducer from "./slices/userSlice";
import counterReducer from "./slices/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
