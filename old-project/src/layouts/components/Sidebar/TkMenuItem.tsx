import { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import classNames from "classnames";

import type { MenuItemProps } from "../../types";
import { MenuContext } from "../../context/MenuContext";
import { LayoutContext } from "../../context/LayoutContext";

const TkMenuItem = ({
  item,
  parentKey,
  index,
  root,
  level = 0,
}: MenuItemProps) => {
  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const { isDesktop, layoutConfig } = useContext(LayoutContext);
  const submenuRef = useRef<HTMLUListElement>(null);
  const menuitemRef = useRef<HTMLLIElement>(null);

  const key: string = parentKey ? parentKey + "-" + index : String(index);
  const isActiveRoute: boolean =
    !!item.to &&
    (location.pathname === item.to ||
      !!item.items?.map((i) => i.to === location.pathname)?.includes(true));

  const active: boolean =
    activeMenu === key || !!(activeMenu && activeMenu.startsWith(key + "-"));

  const itemClick = (event: React.MouseEvent) => {
    //avoid processing disabled items
    if (item.disabled) {
      event.preventDefault();
      return;
    }

    //execute command
    if (item?.command) {
      item?.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item?.items) {
      setActiveMenu(active ? parentKey! : key);
    } else {
      setActiveMenu(key);
    }
  };

  const onMouseEnter = () => {
    // activate item on hover
    if (root && isDesktop()) {
      if (!active) {
        setActiveMenu(key);
      }
    }
  };

  useEffect(() => {
    if (isActiveRoute) {
      setActiveMenu(key);
    }
    const url = location.pathname;
    const onRouteChange = () => {
      if (
        item.to &&
        (url === item.to || (item.to !== "/" && url.startsWith(item.to)))
      ) {
        setActiveMenu(key);
      }
    };
    onRouteChange();
  }, [location, layoutConfig]);

  const subMenu =
    item?.items && item?.visible !== false ? (
      <ul
        ref={submenuRef}
        className={classNames({ "tk-root-submenulist": root })}
      >
        <div className="tk-submenu-content">
          {item?.items.map((child, i) => {
            return (
              <TkMenuItem
                item={child}
                index={i}
                className={child.badgeClass}
                parentKey={key}
                key={child.label}
                level={level + 1}
              />
            );
          })}
        </div>
      </ul>
    ) : null;

  return (
    <li
      ref={menuitemRef}
      className={classNames({
        "tk-menuitem-group": root,
        "has-active-menuitem": active,
        [`level-${level}`]: true,
      })}
    >
      {root && item?.visible !== false && item?.rootTextVisible !== false && (
        <div className="tk-menuitem-root-text">
          <span>{item?.label}</span>
          <i className="material-symbols-outlined tk-menuitem-root-icon">
            {item.icon}
          </i>
        </div>
      )}
      {(!item?.to || item?.items) && item?.visible !== false ? (
        <a
          href={item?.url}
          onClick={(e) => itemClick(e)}
          className={item?.class}
          target={item?.target}
          data-tk-disabled={!root}
          tabIndex={0}
          onMouseEnter={onMouseEnter}
        >
          <i
            className={classNames("material-symbols-outlined tk-menuitem-icon")}
          >
            {item?.icon}
          </i>
          <span className="tk-menuitem-text">{item?.label}</span>
          {item?.items && (
            <i className="material-symbols-outlined tk-submenu-toggler">
              expand_more
            </i>
          )}
        </a>
      ) : null}

      {item?.to && !item?.items && item?.visible !== false ? (
        <>
          <Link
            to={item?.to}
            replace={item?.replaceUrl}
            onClick={(e) => itemClick(e)}
            className={classNames(item?.class, {
              "active-route": isActiveRoute,
            })}
            tabIndex={0}
            onMouseEnter={onMouseEnter}
          >
            {isActiveRoute && <div className="active-route-pointer"></div>}
            <i className="material-symbols-outlined tk-menuitem-icon">
              {item?.icon}
            </i>
            <span className="tk-menuitem-text">{item?.label}</span>
            {item?.items && (
              <i className="material-symbols-outlined tk-submenu-toggler">
                expand_more
              </i>
            )}
          </Link>
        </>
      ) : null}
      {subMenu}
    </li>
  );
};

export default TkMenuItem;
