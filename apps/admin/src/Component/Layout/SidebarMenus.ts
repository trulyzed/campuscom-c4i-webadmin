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
        url: "/courses/list",
        permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
      },
      {
        title: "Financials",
        url: "",
        submenu: [
          { title: "Orders ", url: "/financials/orders/list", submenu: [], permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc) },
        ],
        permission: true
      },
    ]
  }
]
