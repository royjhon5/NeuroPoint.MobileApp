// context/DrawerContext.tsx
import React, { createContext, useContext, useRef } from "react";
import { DrawerLayoutAndroid } from "react-native";

type DrawerContextType = {
  openDrawer: () => void;
  closeDrawer: () => void;
  drawerRef: React.RefObject<DrawerLayoutAndroid | null>;
};

const DrawerContext = createContext<DrawerContextType | null>(null);

export const useDrawer = () => {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used inside DrawerProvider");
  return ctx;
};

export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const drawerRef = useRef<DrawerLayoutAndroid | null>(null);

  const openDrawer = () => drawerRef.current?.openDrawer();
  const closeDrawer = () => drawerRef.current?.closeDrawer();

  return (
    <DrawerContext.Provider value={{ openDrawer, closeDrawer, drawerRef }}>
      {children}
    </DrawerContext.Provider>
  );
};
