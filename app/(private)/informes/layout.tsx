import { ReactNode } from "react";
import { InformProvider } from "./context";

export default function InformsLayout({ children }: { children: ReactNode }) {
  return (
    <InformProvider>
        {children}
    </InformProvider>
  );
}

