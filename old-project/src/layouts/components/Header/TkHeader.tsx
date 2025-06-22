import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext.tsx";
import type { MenuItem } from "../../types/index.ts";
import headerMenu from "../../menu/header-menu.ts";

import { TkButton } from "@takeoff-ui/react";


type HeaderProps = {
  size: "small" | "base" | "large";
  topBar: boolean;
  mode: "default" | "center";
};

type MenuState = {
  show: boolean;
  data: MenuStateData;
};

type MenuStateData = {
  parent: string;
  items: MenuItem[];
};

const TkHeader = ({
  size = "base",
  mode = "default",
}: HeaderProps) => {
  const { onMenuModeToggle } =
    useContext(LayoutContext);
  const [menuState, setMenuState] = useState<MenuState>({} as MenuState);

  return (
    <header>
      <div className="tk-header">
        <div className={classNames("w-full px-3", size)}>
          <div className="tk-header-start">
            <div className="flex gap-3">
              <Link className="tk-header-logo" to="/">
              </Link>

              <TkButton
                type="outlined"
                size="small"
                onTkClick={onMenuModeToggle}
                icon="menu"
                style={{ margin: '10px' }} />

            </div>
          </div>
          <div className={classNames("tk-header-center", mode)}>
            {headerMenu?.length > 0 && (
              <TkMenu
                onShowItems={(data) => setMenuState({ show: true, data })}
              />
            )}
          </div>
        </div>
      </div>
      {
        menuState.show && menuState.data.items?.length && (
          <div
            onMouseLeave={() => setMenuState({ ...menuState, show: false })}
            className="tk-header-submenu"
          >
            {menuState.data.items.map((item: MenuItem, index: number) => (
              <TkMenuItem
                key={index}
                item={item}
                onClick={() => setMenuState({ ...menuState, show: false })}
              />
            ))}
          </div>
        )
      }
    </header >
  );
};

interface MenuProps {
  onShowItems?: (x: any) => void;
}

const TkMenu = ({ onShowItems }: MenuProps) => {
  return (
    <ul className="tk-menu-item-group">
      {headerMenu?.map((i, idx) => (
        <TkMenuItem onShowItems={onShowItems} key={idx} item={i} />
      ))}
    </ul>
  );
};

interface MenuItemProps {
  item: MenuItem;
  onShowItems?: (x: any) => void;
  onClick?: (x: any) => void;
}

const TkMenuItem = ({ onClick, item, onShowItems }: MenuItemProps) => {
  const path = useLocation();
  const childsActive = item.items?.filter((i) => i.to === path.pathname).length;
  const isActive = childsActive || path.pathname === item.to;

  return (
    <Link
      to={item.to ?? ""}
      className={classNames("tk-menu-item", item.class, isActive && "active")}
      onMouseEnter={() =>
        onShowItems &&
        onShowItems({
          parent: item.label,
          items: item.items,
        })
      }
      onClick={onClick}
    >
      <i className="material-symbols-outlined tk-menuitem-icon">{item.icon}</i>
      <span className="tk-menuitem-text">{item.label}</span>
    </Link>
  );
};

export default TkHeader;
