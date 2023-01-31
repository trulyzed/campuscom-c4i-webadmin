import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { getDepartmentListTableColumns } from "~/TableSearchMeta/Department/DepartmentListTableColumns"
import { getEmployeeListTableColumns } from "~/TableSearchMeta/Employee/EmployeeListTableColumns"

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Employee Management",
    url: "",
    submenu: [
      {
        title: "Employees",
        url: "/employee-management/employee",
        submenu: [],
        permission: checkAdminApiPermission(getEmployeeListTableColumns().searchFunc)
      },
    ],
    permission:
      checkAdminApiPermission(getEmployeeListTableColumns().searchFunc)
  },
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Departments",
        url: "/administration/department",
        submenu: [],
        permission: checkAdminApiPermission(getDepartmentListTableColumns().searchFunc)
      },
    ],
    permission:
      checkAdminApiPermission(getDepartmentListTableColumns().searchFunc)
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
