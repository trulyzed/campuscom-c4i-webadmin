import { ReactNode } from "react"
import { DefaultLayout } from "@packages/components/lib/Layout/DefaultLayout"
import { AppRoutes } from "~/routes"
import { logout } from "~/Services/AuthService"
import { getSidebarMenus } from "./SidebarMenus"

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <DefaultLayout
      routes={AppRoutes}
      menus={getSidebarMenus()}
      title={"Employee Portal"}
      onLogout={logout}>
      {children}
    </DefaultLayout>
  )
}