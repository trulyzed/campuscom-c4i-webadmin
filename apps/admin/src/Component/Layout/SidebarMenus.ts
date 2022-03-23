import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission";
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns";
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns";
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns";
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns";
import { getStudentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns";

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
      {
        title: "Instructor",
        submenu: [],
        url: "/institute/instructor",
        permission: checkAdminApiPermission(getInstructorListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc) ||
      checkAdminApiPermission(getInstructorListTableColumns().searchFunc)
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
      {
        title: "Students ",
        url: "/storefront-data/student",
        submenu: [],
        permission: checkAdminApiPermission(getStudentListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentListTableColumns().searchFunc) ||
      checkAdminApiPermission(getStudentListTableColumns().searchFunc)
  }
]
