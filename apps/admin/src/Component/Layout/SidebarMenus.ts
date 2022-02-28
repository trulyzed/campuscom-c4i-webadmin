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
        title: "Offerings",
        url: "",
        submenu: [
          { title: "Courses ", url: "/offerings/courses/list", submenu: [], permission: true },
        ],
        permission: true
      },
    ]
  }
]
