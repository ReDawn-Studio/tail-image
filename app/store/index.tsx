"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import createStore, { IStore } from "./store";

interface IProps {
  defaultValue: Record<any, any>;
  children: ReactNode;
}

enableStaticRendering(!process.browser);

const StoreContext = createContext({});

export const StoreProvider = ({ defaultValue, children }: IProps) => {
  const store: IStore = useLocalObservable(createStore(defaultValue));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  const store: IStore = useContext(StoreContext) as IStore;
  if (!store) {
    throw new Error("数据不存在");
  }
  return store;
};
