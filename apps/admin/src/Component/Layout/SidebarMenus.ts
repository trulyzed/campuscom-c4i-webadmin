import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { getCampusListTableColumns } from "~/TableSearchMeta/Campus/CampusListTableColumns"
import { getCareerListTableColumns } from "~/TableSearchMeta/Career/CareerListTableColumns"
import { getCompanyListTableColumns } from "~/TableSearchMeta/Company/CompanyListTableColumns"
import { getContactGroupListTableColumns } from "~/TableSearchMeta/ContactGroup/ContactGroupListTableColumns"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { getCourseProviderListTableColumns } from "~/TableSearchMeta/CourseProvider/CourseProviderListTableColumns"
import { getDiscountProgramListTableColumns } from "~/TableSearchMeta/DiscountProgram/DiscountProgramListTableColumns"
import { getGlobalConfigurationListTableColumns } from "~/TableSearchMeta/GlobalConfiguration/GlobalConfigurationListTableColumns"
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns"
import { getImportTaskListTableColumns } from "~/TableSearchMeta/ImportTasks/ImportTaskListTableColumns"
import { getInstructorListTableColumns } from "~/TableSearchMeta/Instructor/InstructorListTableColumns"
import { getMembershipProgramListTableColumns } from "~/TableSearchMeta/MembershipProgram/MembershipProgramListTableColumns"
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns"
import { getPaymentListTableColumns } from "~/TableSearchMeta/Payment/PaymentListTableColumns"
import { getPaymentGatewayListTableColumns } from "~/TableSearchMeta/PaymentGateway/PaymentGatewayListTableColumns"
import { getPaymentGatewayConfigListTableColumns } from "~/TableSearchMeta/PaymentGatewayConfig/PaymentGatewayConfigListTableColumns"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"
import { getPublishingListTableColumns } from "~/TableSearchMeta/Publishing/PublishingListTableColumns"
import { getQuestionListTableColumns } from "~/TableSearchMeta/Question/QuestionListTableColumns"
import { getRefundListTableColumns } from "~/TableSearchMeta/Refund/RefundListTableColumns"
import { getRoleListTableColumns } from "~/TableSearchMeta/Role/RoleListTableColumns"
import { getStoreListTableColumns } from "~/TableSearchMeta/Store/StoreListTableColumns"
import { getStudentListTableColumns } from "~/TableSearchMeta/Student/StudentListTableColumns"
import { getSubjectListTableColumns } from "~/TableSearchMeta/Subject/SubjectListTableColumns"
import { getTransactionReportListTableColumns } from "~/TableSearchMeta/TransactionReport/TransactionReportListTableColumns"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { getContactListTableColumns } from "~/TableSearchMeta/Contact/ContactListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { getCompanyUserListTableColumns } from "~/TableSearchMeta/CompanyUser/CompanyUserListTableColumns"
import { getTransactionBatchListTableColumns } from "~/TableSearchMeta/TransactionBatch/TransactionBatchListTableColumns"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { getSeatBlockListTableColumns } from "~/TableSearchMeta/SeatBlock/SeatBlockListTableColumns"

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Course Provider",
    url: "",
    submenu: [
      {
        title: "Courses",
        submenu: [],
        url: "/course-provider/course",
        permission: checkAdminApiPermission(getCourseListTableColumns().searchFunc)
      },
      {
        title: "Instructors",
        submenu: [],
        url: "/course-provider/instructor",
        permission: checkAdminApiPermission(getInstructorListTableColumns().searchFunc)
      },
      {
        title: "Campuses",
        submenu: [],
        url: "/course-provider/campus",
        permission: checkAdminApiPermission(getCampusListTableColumns().searchFunc)
      }
    ],
    permission:
      checkAdminApiPermission(getCourseListTableColumns().searchFunc) ||
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
      {
        title: "Create Order",
        url: "/store/create-order",
        submenu: [],
        permission: checkAdminApiPermission(EnrollmentQueries.create)
      },
    ],
    permission:
      checkAdminApiPermission(getSubjectListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPublishingListTableColumns().searchFunc) ||
      checkAdminApiPermission(getProductListTableColumns().searchFunc) ||
      checkAdminApiPermission(EnrollmentQueries.create)
  },
  {
    title: "Storefront Data",
    url: "",
    submenu: [
      {
        title: "Orders",
        url: "/storefront-data/order",
        submenu: [],
        permission: checkAdminApiPermission(getOrderListTableColumns().searchFunc)
      },
      {
        title: "Seat Blocks",
        url: "/storefront-data/seat-block",
        submenu: [],
        permission: checkAdminApiPermission(getSeatBlockListTableColumns().searchFunc)
      },
      {
        title: "Payments",
        url: "/storefront-data/payment",
        submenu: [],
        permission: checkAdminApiPermission(getPaymentListTableColumns().searchFunc)
      },
      {
        title: "Students",
        url: "/storefront-data/student",
        submenu: [],
        permission: checkAdminApiPermission(getStudentListTableColumns().searchFunc)
      },
    ],
    permission:
      checkAdminApiPermission(getOrderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getSeatBlockListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentListTableColumns().searchFunc) ||
      checkAdminApiPermission(getStudentListTableColumns().searchFunc)
  },
  {
    title: "Transaction",
    url: "",
    submenu: [
      {
        title: "Settled Transactions",
        url: "/transaction/settled-transaction",
        submenu: [],
        permission: checkAdminApiPermission(getTransactionListTableColumns().searchFunc)
      },
      {
        title: "Unsettled Transactions",
        url: "/transaction/unsettled-transaction",
        submenu: [],
        permission: checkAdminApiPermission(getTransactionListTableColumns().searchFunc)
      },
      {
        title: "Settlement Batches",
        url: "/transaction/settlement-batch",
        submenu: [],
        permission: checkAdminApiPermission(getTransactionBatchListTableColumns().searchFunc)
      },
      {
        title: "Detail Reports",
        url: "/transaction/detail-report",
        submenu: [],
        permission: checkAdminApiPermission(getTransactionReportListTableColumns().searchFunc)
      },
    ],
    permission: checkAdminApiPermission(getTransactionListTableColumns().searchFunc) ||
    checkAdminApiPermission(getTransactionBatchListTableColumns().searchFunc) ||
    checkAdminApiPermission(getTransactionReportListTableColumns().searchFunc)
  },
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Careers",
        url: "/administration/career",
        submenu: [],
        permission: checkAdminApiPermission(getCareerListTableColumns().searchFunc)
      },
      {
        title: "Course Providers",
        url: "/administration/course-provider",
        submenu: [],
        permission: checkAdminApiPermission(getCourseProviderListTableColumns().searchFunc)
      },
      {
        title: "Stores",
        url: "/administration/store",
        submenu: [],
        permission: checkAdminApiPermission(getStoreListTableColumns().searchFunc)
      },
      {
        title: "Roles",
        url: "/administration/role",
        submenu: [],
        permission: checkAdminApiPermission(getRoleListTableColumns().searchFunc)
      },
      {
        title: "Users",
        url: "/administration/user",
        submenu: [],
        permission: checkAdminApiPermission(getUserListTableColumns().searchFunc)
      },
      {
        title: "Refunds",
        url: "/administration/refund",
        submenu: [],
        permission: checkAdminApiPermission(getRefundListTableColumns().searchFunc)
      },
      {
        title: "Discount Programs",
        url: "/administration/discount-program",
        submenu: [],
        permission: checkAdminApiPermission(getDiscountProgramListTableColumns().searchFunc)
      },
      {
        title: "Membership Programs",
        url: "/administration/membership-program",
        submenu: [],
        permission: checkAdminApiPermission(getMembershipProgramListTableColumns().searchFunc)
      },
      {
        title: "Questions",
        url: "/administration/question",
        submenu: [],
        permission: checkAdminApiPermission(getQuestionListTableColumns().searchFunc)
      },
      {
        title: "Organizations",
        url: "/administration/organization",
        submenu: [],
        permission: checkAdminApiPermission(getCompanyListTableColumns().searchFunc)
      },
      {
        title: "Affiliate Users",
        url: "/administration/affiliate-user",
        submenu: [],
        permission: checkAdminApiPermission(getCompanyUserListTableColumns().searchFunc)
      },
      {
        title: "Audit Trails",
        url: "/administration/audit-trail",
        submenu: [],
        permission: checkAdminApiPermission(getAuditTrailListTableColumns().searchFunc)
      },
      {
        title: "Contacts",
        url: "/administration/contact",
        submenu: [],
        permission: checkAdminApiPermission(getContactListTableColumns().searchFunc)
      },
      {
        title: "Contact Groups",
        url: "/administration/contact-group",
        submenu: [],
        permission: checkAdminApiPermission(getContactGroupListTableColumns().searchFunc)
      },
      {
        title: "Import Tasks",
        url: "/administration/import-task",
        submenu: [],
        permission: checkAdminApiPermission(getImportTaskListTableColumns().searchFunc)
      },
      {
        title: "Enrollments",
        url: "/administration/enrollment",
        submenu: [],
        permission: checkAdminApiPermission(getEnrollmentListTableColumns().searchFunc)
      },
    ],
    permission:
      checkAdminApiPermission(getCareerListTableColumns().searchFunc) ||
      checkAdminApiPermission(getCourseProviderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getStoreListTableColumns().searchFunc) ||
      checkAdminApiPermission(getRoleListTableColumns().searchFunc) ||
      checkAdminApiPermission(getUserListTableColumns().searchFunc) ||
      checkAdminApiPermission(getRefundListTableColumns().searchFunc) ||
      checkAdminApiPermission(getDiscountProgramListTableColumns().searchFunc) ||
      checkAdminApiPermission(getMembershipProgramListTableColumns().searchFunc) ||
      checkAdminApiPermission(getQuestionListTableColumns().searchFunc) ||
      checkAdminApiPermission(getCompanyListTableColumns().searchFunc) ||
      checkAdminApiPermission(getCompanyUserListTableColumns().searchFunc) ||
      checkAdminApiPermission(getAuditTrailListTableColumns().searchFunc) ||
      checkAdminApiPermission(getContactListTableColumns().searchFunc) ||
      checkAdminApiPermission(getContactGroupListTableColumns().searchFunc) ||
      checkAdminApiPermission(getImportTaskListTableColumns().searchFunc) ||
      checkAdminApiPermission(getEnrollmentListTableColumns().searchFunc)
  },
  {
    title: "Configuration",
    url: "",
    submenu: [
      {
        title: "Identity Providers",
        url: "/configuration/identity-provider",
        submenu: [],
        permission: checkAdminApiPermission(getIdentityProviderListTableColumns().searchFunc)
      },
      {
        title: "Payment Gateways",
        url: "/configuration/payment-gateway",
        submenu: [],
        permission: checkAdminApiPermission(getPaymentGatewayListTableColumns().searchFunc)
      },
      {
        title: "Payment Gateway Configs",
        url: "/configuration/payment-gateway-config",
        submenu: [],
        permission: checkAdminApiPermission(getPaymentGatewayConfigListTableColumns().searchFunc)
      },
      {
        title: "Global Configurations",
        url: "/configuration/global-configuration",
        submenu: [],
        permission: checkAdminApiPermission(getGlobalConfigurationListTableColumns().searchFunc)
      }
    ],
    permission:
      checkAdminApiPermission(getIdentityProviderListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentGatewayListTableColumns().searchFunc) ||
      checkAdminApiPermission(getPaymentGatewayConfigListTableColumns().searchFunc) ||
      checkAdminApiPermission(getGlobalConfigurationListTableColumns().searchFunc)
  }
]

// generate sidebar menu with unique key and menu permission
const generateSidebarMenuPermission = (
  data: ISidebarMenu[],
  keyPrepend?: string,
  user: IUser | null = getUser()
): ISidebarMenu[] =>
  data.map((i) => {
    const key = `${keyPrepend || ""}${i.title.trim()}`
    const submenu = generateSidebarMenuPermission(i.submenu, `${key}__`, user)

    return {
      ...i,
      key,
      permission: user?.is_superuser
        ? true
        : i.permission && !!(user?.menu_permissions?.includes(key) || submenu.some((i) => i.permission)),
      submenu
    }
  })

export const getSidebarMenus = (): ISidebarMenu[] => {
  return generateSidebarMenuPermission(getSidebarMenuData())
}
