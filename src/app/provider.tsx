// app/providers.tsx
"use client"; // 👈 Required for Redux to work

import { Provider } from "react-redux";
import { store } from "@/states/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
