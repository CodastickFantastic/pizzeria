"use client";

// Importing Redux Core
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

// Importing Redux Persist Package
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

// Importing Redux Slices
import userStateSlice from "./actions/userStateSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  userState: userStateSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
