import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import examSlice from "./slices/exam/examSlice";

export const store = configureStore({
  reducer: {
    exam: examSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
