export interface ISidebarMenu {
  title: string
  url: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

export const getSidebarMenus = (): ISidebarMenu[] => [
  {
    title: "Manage",
    url: "",
    submenu: [
      {
        title: "Courses",
        submenu: [],
        url: "/courses/list",
        permission: true
      },
      {
        title: "Financials",
        url: "",
        submenu: [
          { title: "Orders ", url: "/financials/orders/list", submenu: [], permission: true },
        ],
        permission: true
      },
    ]
  }
]
