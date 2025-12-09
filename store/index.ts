import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import moodReducer from "./slices/moodSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    authState: authReducer,
    user: userReducer,
    moods: moodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
