import React, { useState } from "react";
import type {
  ChildrenProp,
  LayoutConfig,
  LayoutContextType,
  LayoutState,
} from "../types";

export const LayoutContext = React.createContext<LayoutContextType>(
  {} as LayoutContextType,
);

export const LayoutProvider = (props: ChildrenProp) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    menuMode: "static",
  });

  const [layoutState, setLayoutState] = useState<LayoutState>({
    staticMenuDesktopInactive: false,
    settingsPanelVisible: false,
    notificationPanelVisible: false,
    staticMenuMobileActive: false,
    sidebarMode: "default",
  });

  const onMenuToggle = () => {
    if (isDesktop()) {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive,
        sidebarMode: "default",
      }));
    } else {
      setLayoutState((prevLayoutState) => ({
        ...prevLayoutState,
        staticMenuMobileActive: !prevLayoutState.staticMenuMobileActive,
        sidebarMode: "default",
      }));
    }
  };

  const onMenuModeToggle = () => {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      sidebarMode:
        prevLayoutState.sidebarMode == "default" ? "compact" : "default",
    }));
  };

  const isDesktop = (): boolean => {
    return window.innerWidth > 768;
  };

  const value: LayoutContextType = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    onMenuModeToggle,
    isDesktop,
  };

  return (
    <LayoutContext.Provider value={value}>
      <React.Fragment>{props.children}</React.Fragment>
    </LayoutContext.Provider>
  );
};
