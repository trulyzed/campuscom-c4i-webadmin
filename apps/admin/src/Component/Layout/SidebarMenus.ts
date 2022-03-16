import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission";
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns";
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns";

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
        url: "/course",
        permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
      },
      {
        title: "Financials",
        url: "",
        submenu: [
          { title: "Orders ", url: "/financials/order", submenu: [], permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc) },
        ],
        permission: true
      },
    ]
  }
]
