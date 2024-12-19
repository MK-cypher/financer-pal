"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const userContext = createContext<any>(undefined);

export const UserProvider = ({children, user}: {children: ReactNode; user: any}) => {
  return <userContext.Provider value={{user}}>{children}</userContext.Provider>;
};

export const useUser = (): any => {
  const context = useContext(userContext);
  if (!context) throw new Error("need user context provider");
  return context;
};
