import { checkAdminApiPermission } from "~/packages/services/Api/Permission/AdminApiPermission"
import { EnrollmentQueries } from "~/packages/services/Api/Queries/AdminQueries/Enrollments"
import { IUser } from "~/packages/services/Api/utils/Interfaces"
import { getUser } from "~/packages/services/Api/utils/TokenStore"

export interface ISidebarMenu {
  key?: string
  title: string
  url: string
  permission?: boolean
  submenu: ISidebarMenu[]
}

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Administration",
    url: "",
    submenu: [
      {
        title: "Create Enrollment",
        url: "/administration/create-enrollment",
        submenu: [],
        permission: checkAdminApiPermission(EnrollmentQueries.createWithPurchaserInfo) || checkAdminApiPermission(EnrollmentQueries.create)
      }
    ],
    permission: (checkAdminApiPermission(EnrollmentQueries.createWithPurchaserInfo) || checkAdminApiPermission(EnrollmentQueries.create))
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
