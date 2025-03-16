// app/providers.tsx
"use client"; // 👈 Required for Redux to work

import { Provider } from "react-redux";
import { store, persistor } from "@/states/store";
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
  </Provider>;
}
