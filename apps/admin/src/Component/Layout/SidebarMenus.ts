import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission";
import { getCampusListTableColumns } from "~/TableSearchMeta/Campus/CampusListTableColumns";
import { getCompanyListTableColumns } from "~/TableSearchMeta/Company/CompanyListTableColumns";
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns";
import { getCourseProviderListTableColumns } from "~/TableSearchMeta/CourseProvider/CourseProviderListTableColumns";
import { getDiscountProgramListTableColumns } from "~/TableSearchMeta/DiscountProgram/DiscountProgramListTableColumns";
import { getGlobalConfigurationListTableColumns } from "~/TableSearchMeta/GlobalConfiguration/GlobalConfigurationListTableColumns";
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns";
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns";
import { getMembershipProgramListTableColumns } from "~/TableSearchMeta/MembershipProgram/MembershipProgramListTableColumns";
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns";
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns";
import { getPaymentGatewayListTableColumns } from "~/TableSearchMeta/PaymentGateway/PaymentGatewayListTableColumns";
import { getPaymentGatewayConfigListTableColumns } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigListTableColumns";
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns";
import { getPublishingListTableColumns } from "~/TableSearchMeta/Publishing/PublishingListTableColumns";
import { getQuestionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns";
import { getRefundListTableColumns } from "~/TableSearchMeta/Refund/RefundListTableColumns";
import { getRoleListTableColumns } from "~/TableSearchMeta/Role/RoleListTableColumns";
import { getStoreListTableColumns } from "~/TableSearchMeta/Store/StoreListTableColumns";
import { getStudentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns";
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns";
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns";

export interface ISidebarMenu {
  title: string
  url: string
  key: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

export const getSidebarMenus = (): ISidebarMenu[] => [
  {
    title: "Institute",
    url: "",
    key: 'institute',
    submenu: [
      {
        title: "Courses",
        key: 'institute__courses',
        submenu: [],
        url: "/institute/course",
        permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
      },
      {
        title: "Instructors",
        key: 'institute__instructors',
        submenu: [],
        url: "/institute/instructor",
        permission: checkAdminApiPermission(getInstructorListTableColumns().searchFunc)
      },
      {
        title: "Campuses",
        key: 'institute__campuses',
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
    key: 'store',
    submenu: [
      {
        title: "Subjects",
        url: "/store/subject",
        key: 'store__subject',
        submenu: [],
        permission: checkAdminApiPermission(getSubjectListTableColumns().searchFunc)
      },
      {
        title: "Publishing",
        url: "/store/publishing",
        key: 'store__publishing',
        submenu: [],
        permission: checkAdminApiPermission(getPublishingListTableColumns().searchFunc)
      },
      {
        title: "Products",
        url: "/store/product",
        key: 'store__product',
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
    key: 'storefront_data',
    submenu: [
      {
        title: "Orders ",
        url: "/storefront-data/order",
        key: 'storefront_data__order',
        submenu: [],
        permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc)
      },
      {
        title: "Payments ",
        url: "/storefront-data/payment",
        key: 'storefront_data__payment',
        submenu: [],
        permission: checkAdminApiPermission(getPaymentListTableColumns().searchFunc)
      },
      {
        title: "Students ",
        url: "/storefront-data/student",
        key: 'storefront_data__student',
        submenu: [],
        permission: checkAdminApiPermission(getStudentListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentListTableColumns().searchFunc) ||
      checkAdminApiPermission(getStudentListTableColumns().searchFunc)
  },
  {
    title: "Administration",
    url: "",
    key: 'administration',
    submenu: [
      {
        title: "Course Providers",
        url: "/administration/course-provider",
        key: 'administration__course-provider',
        submenu: [],
        permission: checkAdminApiPermission(getCourseProviderListTableColumns().searchFunc)
      },
      {
        title: "Stores",
        url: "/administration/store",
        key: 'administration__store',
        submenu: [],
        permission: checkAdminApiPermission(getStoreListTableColumns().searchFunc)
      },
      {
        title: "Roles",
        url: "/administration/role",
        key: 'administration__role',
        submenu: [],
        permission: checkAdminApiPermission(getRoleListTableColumns().searchFunc)
      },
      {
        title: "Users",
        url: "/administration/user",
        key: 'administration__user',
        submenu: [],
        permission: checkAdminApiPermission(getUserListTableColumns().searchFunc)
      },
      {
        title: "Refunds",
        url: "/administration/refund",
        key: 'administration__refund',
        submenu: [],
        permission: checkAdminApiPermission(getRefundListTableColumns().searchFunc)
      },
      {
        title: "Discount Programs",
        url: "/administration/discount-program",
        key: 'administration__discount-program',
        submenu: [],
        permission: checkAdminApiPermission(getDiscountProgramListTableColumns().searchFunc)
      },
      {
        title: "Membership Programs",
        url: "/administration/membership-program",
        key: 'administration__membership-program',
        submenu: [],
        permission: checkAdminApiPermission(getMembershipProgramListTableColumns().searchFunc)
      },
      {
        title: "Questions",
        url: "/administration/question",
        key: 'administration__question',
        submenu: [],
        permission: checkAdminApiPermission(getQuestionListTableColumns().searchFunc)
      },
      {
        title: "Companies",
        url: "/administration/company",
        key: 'administration__company',
        submenu: [],
        permission: checkAdminApiPermission(getCompanyListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getQuestionListTableColumns().searchFunc)
  },
  {
    title: "Configuration",
    url: "",
    key: 'configuration',
    submenu: [
      {
        title: "Identity Providers",
        url: "/configuration/identity-provider",
        key: 'configuration__identity-provider',
        submenu: [],
        permission: checkAdminApiPermission(getIdentityProviderListTableColumns().searchFunc)
      },
      {
        title: "Payment Gateways",
        url: "/configuration/payment-gateway",
        key: 'configuration__payment-gateway',
        submenu: [],
        permission: checkAdminApiPermission(getPaymentGatewayListTableColumns().searchFunc)
      },
      {
        title: "Payment Gateway Configs",
        url: "/configuration/payment-gateway-config",
        key: 'configuration__payment-gateway-config',
        submenu: [],
        permission: checkAdminApiPermission(getPaymentGatewayConfigListTableColumns().searchFunc)
      },
      {
        title: "Global Configurations",
        url: "/configuration/global-configuration",
        key: 'configuration__global-configuration',
        submenu: [],
        permission: checkAdminApiPermission(getGlobalConfigurationListTableColumns().searchFunc)
      },
    ]
  }
]
