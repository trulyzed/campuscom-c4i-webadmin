import { ReactNode } from "react"
import { DefaultLayout } from "@packages/components/lib/Layout/DefaultLayout"
import { ContextPreferenceSwitcher } from "@packages/components/lib/Layout/HeaderFunctionalities/ContextPreferenceSwitcher"
import { DROPDOWN } from "@packages/components/lib/Form/common"
import { AppRoutes } from "~/routes"
import { logout } from "~/Services/AuthService"
import { getSidebarMenus } from "./SidebarMenus"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { UserPreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserPreferences"
import { useBrandingTitle } from "~/Hook/useBrandingTitle"
import { useSetDefaultPreference } from "~/Hook/useSetDefaultPreference"
import { RecordSession } from "~/Component/RecordSession"

interface ILayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: ILayoutProps) => {
  const title = useBrandingTitle()
  useSetDefaultPreference({
    contextType: 'Store',
    preferenceIndex: 'default_store'
  })
  return (
    <DefaultLayout
      routes={AppRoutes}
      menus={getSidebarMenus()}
      title={title}
      onLogout={logout}
      headerActions={[
        {
          ariaLabel: "Switch Store",
          component: (
            <ContextPreferenceSwitcher
              label="Switch Store"
              formMeta={[{
                fieldName: "default_store",
                label: "Store",
                inputType: DROPDOWN,
                refLookupService: StoreQueries.getLookupData,
                displayKey: "name",
                valueKey: "id",
                rules: [{ required: true, message: "This field is required!" }],
              }]}
              formTitle="Switch Store"
              preferenceIndex="default_store"
              contextDetailsQuery={StoreQueries.getSingle}
            />
          ),
          permission: UserPreferenceQueries.save,
        },
        {
          ariaLabel: "Record Session",
          component: (
            <RecordSession />
          ),
          permission: UserPreferenceQueries.save,
        }
      ]}>
      {children}
    </DefaultLayout>
  )
}