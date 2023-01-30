import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { getCompanyListTableColumns } from "~/TableSearchMeta/Company/CompanyListTableColumns"

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Organizations",
        url: "/administration/organization",
        submenu: [],
        permission: checkAdminApiPermission(getCompanyListTableColumns().searchFunc)
      },
    ],
    permission:
      checkAdminApiPermission(getCompanyListTableColumns().searchFunc)
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
