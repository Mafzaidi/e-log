"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/types/menu";

interface MenuContextType {
  menus: MenuItem[];
  setMenus: (menus: MenuItem[]) => void;
  clearMenus: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ 
  children, 
}: { 
  children: React.ReactNode }) {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("menus");
    if (stored) {
      setMenus(JSON.parse(stored));
    }
  }, []);

  const handleSetMenus = (newMenus: MenuItem[]) => {
    setMenus(newMenus);
    localStorage.setItem("menus", JSON.stringify(newMenus));
  };

  const clearMenus = () => {
    setMenus([]);
    localStorage.removeItem("menus");
  };

  return (
    <MenuContext.Provider value={{ menus, setMenus: handleSetMenus, clearMenus }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) throw new Error("useMenu must be used within MenuProvider");
  return context;
}
