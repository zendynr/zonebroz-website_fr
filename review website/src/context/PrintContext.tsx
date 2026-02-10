import { createContext, useContext, useState, ReactNode } from "react";

interface PrintContextType {
  isPrintMode: boolean;
  setIsPrintMode: (value: boolean) => void;
  prefersReducedMotion: boolean;
}

const PrintContext = createContext<PrintContextType | undefined>(undefined);

export function PrintProvider({ children }: { children: ReactNode }) {
  const [isPrintMode, setIsPrintMode] = useState(false);
  
  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <PrintContext.Provider
      value={{ isPrintMode, setIsPrintMode, prefersReducedMotion }}
    >
      {children}
    </PrintContext.Provider>
  );
}

export function usePrint() {
  const context = useContext(PrintContext);
  if (context === undefined) {
    throw new Error("usePrint must be used within a PrintProvider");
  }
  return context;
}
