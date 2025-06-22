import { MenuProvider } from "../../context/MenuContext.tsx";
import TkMenu from "./TkMenu.tsx";
import classNames from "classnames";
import model from "../../menu/sidebar-menu.ts";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import type { LayoutContextType, MenuItem } from "../../types/index.ts";
import { LayoutContext } from "../../context/LayoutContext.tsx";
import Tooltip from "@mui/material/Tooltip";
const TkSidebar = () => {
  const { layoutState } = useContext<LayoutContextType>(LayoutContext);

  return (
    <div className={classNames("tk-sidebar", layoutState.sidebarMode)}>
      <div className="tk-menu-container">
        {layoutState.sidebarMode === "default" ? (
          <MenuProvider>
            <TkMenu />
          </MenuProvider>
        ) : (
          <TkSidebarCompact />
        )}
      </div>
      {layoutState.sidebarMode === "default" && (
        <div className="tk-sidebar-footer">
          <div className="tk-sidebar-footer-end">
          </div>
        </div>
      )}
    </div>
  );
};

const TkSidebarCompact = () => {
  const path = useLocation();
  const isActive = (item: MenuItem) => {
    const childsActive = item.items?.filter(
      (i) => i.to === path.pathname,
    ).length;
    const isActive = childsActive || path.pathname === item.to;
    return childsActive || isActive;
  };

  return (
    <div className="tk-fixed">
      {model.map((m, midx) => (
        <div key={midx} className="tk-compact-items">
          {m.label && <span>{m.label}</span>}
          <div className={classNames("tk-menu compact")}>
            {m.items!.map((item, idx) => (
              <Link
                key={idx}
                to={item.to ?? ""}
                className={isActive(item) ? "active" : ""}
              >
                <Tooltip title={item.label} placement="right">
                  <i
                    slot="trigger"
                    className="material-symbols-outlined tk-menuitem-icon"
                  >
                    {item.icon}
                  </i>
                </Tooltip>
              </Link>
            ))}
          </div>
          <div className="tk-compact-items-seperator"></div>
        </div>
      ))}
    </div>
  );
};

export default TkSidebar;
