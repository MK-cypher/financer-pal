"use client";

import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const financeContext = createContext<any>(undefined);

export const FinanceProvider = ({children, financeData}: {children: ReactNode; financeData: any}) => {
  return <financeContext.Provider value={{financeData}}>{children}</financeContext.Provider>;
};

export const useFinance = (): any => {
  const context = useContext(financeContext);
  if (!context) throw new Error("need finance context provider");
  return context;
};
