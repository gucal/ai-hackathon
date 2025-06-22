import type { MenuItem } from "../types";

const sidebarMenu: MenuItem[] = [
  {
    label: "Group",
    rootTextVisible: true,
    items: [


      {
        label: "form",
        icon: "dataset",
        to: "/",
      },
      {

        label: "dashboard",
        icon: "dataset",
        to: "/dashboard",
      },
      {

        label: "reports",
        icon: "report",
        to: "/reports",
      },


    ],
  },

];

export default sidebarMenu;
