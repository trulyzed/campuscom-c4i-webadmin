import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission";
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns";
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns";
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns";

export interface ISidebarMenu {
  title: string
  url: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

export const getSidebarMenus = (): ISidebarMenu[] => [
  {
    title: "Institute",
    url: "",
    submenu: [
      {
        title: "Courses",
        submenu: [],
        url: "/institute/course",
        permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
  },
  {
    title: "Storefront Data",
    url: "",
    submenu: [
      {
        title: "Orders ",
        url: "/storefront-data/order",
        submenu: [],
        permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc)
      },
      {
        title: "Payments ",
        url: "/storefront-data/payment",
        submenu: [],
        permission: checkAdminApiPermission(getPaymentListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentListTableColumns().searchFunc)
  }
]
