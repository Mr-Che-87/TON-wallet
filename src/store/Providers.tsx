//из-за особенностей Next, пришлось сделать отдельный клиентский компонент (и им уже оборачивать дом-дерево в серверном layout):
"use client"; 

import { Provider } from "react-redux";
import  store  from "@/store/store";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
