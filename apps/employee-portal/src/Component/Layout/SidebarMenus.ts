import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { ISidebarMenu } from "@packages/components/lib/SidebarNavigation/Sidebar"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { getCourseListTableColumns } from "~/TableSearchMeta/Course/CourseListTableColumns"
import { getEnrollmentListTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentListTableColumns"
import { getSkillListTableColumns } from "~/TableSearchMeta/Skill/SkillListTableColumns"

const getSidebarMenuData = (): ISidebarMenu[] => [
  {
    title: "Courses",
    url: "/course",
    submenu: [],
    permission:
      checkAdminApiPermission(getCourseListTableColumns().searchFunc)
  },
  {
    title: "Skills",
    url: "/skill",
    submenu: [],
    permission:
      checkAdminApiPermission(getSkillListTableColumns().searchFunc)
  },
  {
    title: "Enrollments",
    url: "/enrollment",
    submenu: [],
    permission:
      checkAdminApiPermission(getEnrollmentListTableColumns().searchFunc)
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
      // permission: user?.is_superuser
      //   ? true
      //   : i.permission && !!(user?.menu_permissions?.includes(key) || submenu.some((i) => i.permission)),
      permission: true,
      submenu
    }
  })

export const getSidebarMenus = (): ISidebarMenu[] => {
  return generateSidebarMenuPermission(getSidebarMenuData())
}
