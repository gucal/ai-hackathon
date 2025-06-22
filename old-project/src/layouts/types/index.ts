import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ChildrenProp {
  children?: ReactNode;
}

export interface MenuItem {
  label: string;
  icon?: string;
  to?: string;
  activePathnames?: string[];
  disabled?: boolean;
  items?: MenuItem[];
  visible?: boolean;
  command?: any;
  badgeClass?: string;
  url?: string;
  isExternal?: boolean;
  class?: string;
  target?: any;
  replaceUrl?: boolean;
  seperator?: boolean;
  rootTextVisible?: boolean;
}

export interface MenuItemProps {
  item: MenuItem;
  parentKey?: string;
  index: number;
  root?: boolean;
  level?: number;
  className?: string;
}

// LayoutContext Types
export interface LayoutContextType {
  layoutConfig: LayoutConfig;
  setLayoutConfig: Dispatch<SetStateAction<LayoutConfig>>;
  layoutState: LayoutState;
  setLayoutState: Dispatch<SetStateAction<LayoutState>>;
  onMenuToggle: () => void;
  onMenuModeToggle: () => void;
  isDesktop: () => boolean;
}

export interface LayoutConfig {
  menuMode: "static" | "icon";
}

export interface LayoutState {
  staticMenuDesktopInactive: boolean;
  staticMenuMobileActive: boolean;
  settingsPanelVisible: boolean;
  notificationPanelVisible: boolean;
  sidebarMode: string;
}

// MenuContext Types
export interface MenuContextType {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}
