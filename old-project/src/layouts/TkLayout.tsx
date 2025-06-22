import React, { useCallback, useContext, useEffect } from "react";

import classNames from "classnames";
import TkHeader from "./components/Header/TkHeader.tsx";
import TkFooter from "./components/TkFooter.tsx";
import { LayoutContext } from "./context/LayoutContext.tsx";
import type { ChildrenProp, LayoutContextType, LayoutState } from "./types/index.ts";
import "../styles/layout/layout.scss";
import TkSidebar from "./components/Sidebar/TkSidebar.tsx";

const TkLayout = (props: ChildrenProp) => {
  const { layoutConfig, layoutState, setLayoutState, isDesktop } =
    useContext<LayoutContextType>(LayoutContext);

  const hideMenu = useCallback(() => {
    setLayoutState((prevLayoutState: LayoutState) => ({
      ...prevLayoutState,
      staticMenuMobileActive: false,
      resetMenu: isDesktop(),
    }));
  }, [isDesktop]);

  useEffect(() => {
    const onRouteChange = () => {
      hideMenu();
    };
    onRouteChange();
  }, [location]);

  const containerClassName: string = classNames(
    "sidebar-" + layoutState.sidebarMode,
    {
      "layout-static": layoutConfig.menuMode === "static",
      "layout-static-inactive":
        layoutState.staticMenuDesktopInactive &&
        layoutConfig.menuMode === "static",
      "layout-mobile-active": layoutState.staticMenuMobileActive,
    },
  );

  return (
    <React.Fragment>
      <div
        className={classNames("layout-container-wrapper", containerClassName)}
      >
        {/* Header üzerinde koyu renkli bar istiyorsanız topBar={true} olarak setleyebilirsiniz.
          Eğer koyu renkli bar istemiyorsanız topBar={false} olarak setlemelisiniz. */}
        {/* size prop'u 'small', 'base' veya 'large' alabilir. */}
        <TkHeader size="small" topBar={true} mode="default" />

        {/* Sidebar kullanmak istiyorsanız mode="default" olarak setlenmelidir.
          Eğer başlangıçta menülerin sadece iconları göründüğü compact versiyonun görünmesi için 
          LayoutContect içerisindeki layoutState'in sidebarMode değerini 'compact' olarak değiştirin. */}
        <TkSidebar />

        <div className="layout-content-wrapper">
          <div className="layout-content">
            <div className="w-full">{props.children}</div>
          </div>
        </div>

        {/* Footer istemiyorsanız bu komponenti kaldırabilirsiniz. 
          Eğer customize etmek istiyorsanız komponentin içinden customize edebilirsiniz. */}
        <TkFooter />

        {/* Settings headerdaki ayarlar iconununa tıklandığında sağdan açılan drawer paneldir.
          Bu panel içerisinden dark/light theme değişiklikleri ve uygulamanın dil seçimi değiştirilebilir. 
          Farklı ayarlar eklemek isterseniz komponent içerisinden ekleyeblirsiniz. */}

        {/* Notification headerdaki bildirim iconuna tıklandığında sağdan açılan drawer paneldir.
          Bu panel içerisinde varsayılan bir bildirim listeleme gösterilmiştir.
          Bildirim gösterimine ihtiyacınız yoksa bunu kaldırabilir veya bu paneli farklı bir amaç için özelliştirip kullanbilirsiniz.  */}
      </div>
    </React.Fragment>
  );
};

export default TkLayout;
