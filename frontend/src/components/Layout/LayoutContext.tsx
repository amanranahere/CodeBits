import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface LayoutContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  infoPanelOpen: boolean;
  toggleInfoPanel: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [infoPanelOpen, setInfoPanelOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleInfoPanel = () => setInfoPanelOpen((prev) => !prev);

  return (
    <LayoutContext.Provider
      value={{ sidebarOpen, toggleSidebar, infoPanelOpen, toggleInfoPanel }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
