export interface ISidebarMenu {
  title: string
  url: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

export const getSidebarMenus = (): ISidebarMenu[] => [
  { title: "View Schedule", url: "/view-schedule", submenu: [] },
  { title: "Current Sections", url: "/current-sections", submenu: [] },
  { title: "Completed Sections", url: "/completed-sections", submenu: [] },
  { title: "Change Password", url: "", submenu: [] }
]
