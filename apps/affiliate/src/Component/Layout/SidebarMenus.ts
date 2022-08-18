import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { getImportTaskListTableColumns } from "~/TableSearchMeta/ImportTasks/ImportTaskListTableColumns"
import { getOrderListTableColumns } from "~/TableSearchMeta/Order/OrderListTableColumns"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Store",
    url: "",
    submenu: [
      {
        title: "Products",
        url: "/store/product",
        submenu: [],
        permission: checkAdminApiPermission(getProductListTableColumns().searchFunc)
      }
    ],
    permission:
      checkAdminApiPermission(getProductListTableColumns().searchFunc)
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
    ],
    permission:
      checkAdminApiPermission(getOrderListTableColumns().searchFunc)
  },
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Import Tasks",
        url: "/administration/import-task",
        submenu: [],
        permission: checkAdminApiPermission(getImportTaskListTableColumns().searchFunc)
      },
      {
        title: "Create Enrollment",
        url: "/administration/create-enrollment",
        submenu: [],
        permission: checkAdminApiPermission(EnrollmentQueries.createWithPurchaserInfo) || checkAdminApiPermission(EnrollmentQueries.create)
      }
    ],
    permission:
      checkAdminApiPermission(getImportTaskListTableColumns().searchFunc) ||
      (checkAdminApiPermission(EnrollmentQueries.createWithPurchaserInfo) || checkAdminApiPermission(EnrollmentQueries.create))
  },
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
