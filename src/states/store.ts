// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
// Correct path
import userReducer from "./slices/userSlice";
import counterReducer from "./slices/counterSlice";
import scheduleReducer from "./slices/scheduleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    schedule: scheduleReducer,
  },
});

// Infer RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
