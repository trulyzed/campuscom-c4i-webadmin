import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission";
import { getCampusListTableColumns } from "~/TableSearchMeta/Campus/CampusListTableColumns";
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns";
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns";
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns";
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns";
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns";
import { getPublishingListTableColumns } from "~/TableSearchMeta/Publishing/PublishingListTableColumns";
import { getStudentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns";
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns";

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
        title: "Instructors",
        submenu: [],
        url: "/institute/instructor",
        permission: checkAdminApiPermission(getInstructorListTableColumns().searchFunc)
      },
      {
        title: "Campuses",
        submenu: [],
        url: "/institute/campus",
        permission: checkAdminApiPermission(getCampusListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc) ||
      checkAdminApiPermission(getInstructorListTableColumns().searchFunc) ||
      checkAdminApiPermission(getCampusListTableColumns().searchFunc)
  },
  {
    title: "Store",
    url: "",
    submenu: [
      {
        title: "Subjects",
        url: "/store/subject",
        submenu: [],
        permission: checkAdminApiPermission(getSubjectListTableColumns().searchFunc)
      },
      {
        title: "Publishing",
        url: "/store/publishing",
        submenu: [],
        permission: checkAdminApiPermission(getPublishingListTableColumns().searchFunc)
      },
      {
        title: "Products",
        url: "/store/product",
        submenu: [],
        permission: checkAdminApiPermission(getProductListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getSubjectListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPublishingListTableColumns().searchFunc) ||
      checkAdminApiPermission(getProductListTableColumns().searchFunc)
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
