// Provide redux store and redux-presist to Next 13 App Router
"use client";

import { Provider } from "react-redux";
import { store, persistor } from "./store";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
