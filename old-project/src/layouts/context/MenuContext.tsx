import { createContext, useState } from "react";
import type { ChildrenProp, MenuContextType } from "../types";

export const MenuContext = createContext<MenuContextType>(
  {} as MenuContextType,
);

export const MenuProvider = (props: ChildrenProp) => {
  const [activeMenu, setActiveMenu] = useState<string>("");

  const value = {
    activeMenu,
    setActiveMenu,
  };

  return (
    <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>
  );
};
