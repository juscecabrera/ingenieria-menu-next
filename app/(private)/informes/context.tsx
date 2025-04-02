"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type InformData = {
  _id: string;
  Mes_informes: string;
  Informes_category: string;
  results: any;
  plates: string[]
} | null;

type InformContextType = {
  informData: InformData;
  setInformData: (data: InformData) => void;
};

const InformContext = createContext<InformContextType | undefined>(undefined);

export function InformProvider({ children }: { children: ReactNode }) {
  const [informData, setInformData] = useState<InformData>(null);

  return (
    <InformContext.Provider value={{ informData, setInformData }}>
      {children}
    </InformContext.Provider>
  );
}

export function useInform() {
  const context = useContext(InformContext);
  if (!context) {
    throw new Error("useInform must be used within an InformProvider");
  }
  return context;
}

