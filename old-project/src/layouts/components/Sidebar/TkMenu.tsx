import TkMenuItem from "./TkMenuItem.tsx";
import sidebarMenu from "../../menu/sidebar-menu.ts";

const TkMenu = () => {
  return (
    <div className="tk-menu">
      {sidebarMenu.map((item, i) => {
        if (item.seperator) {
          return <li className="menu-separator"></li>;
        } else {
          return (
            <TkMenuItem item={item} root={true} index={i} key={item.label} />
          );
        }
      })}
    </div>
  );
};

export default TkMenu;
