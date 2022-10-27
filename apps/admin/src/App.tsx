import React, { useEffect, useState } from "react"
import { LoginPage } from "~/Pages/Login/LoginPage"
import { DefaultLayout } from "@packages/components/lib/Layout/DefaultLayout"
import { NotFoundPage } from "~/Pages/NotFoundPage"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
import { AppRoutes } from "~/routes"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { LoginModal } from "~/Component/Login/LoginModal"
import { getToken, getUser, setUser } from "@packages/services/lib/Api/utils/TokenStore"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { useGlobalErrorHandler } from "@packages/services/lib/Api/Hooks/useGlobalErrorHandler"
import { EmptyState } from "@packages/components/lib/Layout/EmptyState"
import { ConfigProvider, notification } from "antd"
import { getSidebarMenus } from "./Component/Layout/SidebarMenus"
import { logout } from "./Services/AuthService"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { UserPreferenceQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserPreferences"
import { DROPDOWN } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

notification.config({
  closeIcon: <span className="glyphicon glyphicon--primary glyphicon-remove" />,
  duration: 4
})

export function App(): JSX.Element {
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
  const user = getUser()
  const primaryCourseProvider = Array.isArray(user?.context) ? (user?.context || []).find(i => i.type === "Store")?.values.find(i => i.primary_course_provider)?.primary_course_provider : undefined
  useGlobalErrorHandler()

  useEffect(() => {
    const tokenNotExist = !getToken()
    setRedirectToLogin(tokenNotExist)

    eventBus.subscribe(SHOW_LOGIN_MODAL, (show: boolean) => {
      const token = getToken()
      setShowLoginModal(show && !!token)
    })
    eventBus.subscribe(REDIRECT_TO_LOGIN, (redirect: boolean) => {
      setRedirectToLogin(redirect)
    })

    return () => {
      eventBus.unsubscribe(SHOW_LOGIN_MODAL)
      eventBus.unsubscribe(REDIRECT_TO_LOGIN)
    }
  }, [])

  // Update document title
  useEffect(() => {
    document.title = `Campus Marketplace | ${(user && primaryCourseProvider?.name) ? primaryCourseProvider?.name : "Webadmin"}`
  }, [primaryCourseProvider?.name, user])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div id="modal-container"></div>
      {showLoginModal && <LoginModal />}

      {redirectToLogin ? (
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Redirect to="/login" />
        </Switch>
      ) : (
        <ConfigProvider renderEmpty={() => <EmptyState />}>
          <DefaultLayout routes={AppRoutes} menus={getSidebarMenus()} title={primaryCourseProvider?.name || "Campus Marketplace Webadmin"} onLogout={logout}>
            <DefaultContextSwitcher />
            <Switch>
              {AppRoutes.map((route, i) => {
                return <Route key={i} {...route} exact />
              })}
              <Route path="*" component={NotFoundPage} />
            </Switch>
            {window.location.pathname.includes(`/login`) && <Redirect to="/" />}
          </DefaultLayout>
        </ConfigProvider>
      )}
    </BrowserRouter>
  )
}

// interface IDefaultContextSwitcherProps {
//   title: string

// }

export const DefaultContextSwitcher = () => {
  const user = getUser()
  if (!user) return null
  const defaultStore = user?.preferences.default_store

  const handleSubmit = QueryConstructor(async (params) => {
    const resp = await StoreQueries.getSingle({ params: { id: params?.data.store } })
    const payload = {
      default_store: {
        id: resp.data.id,
        name: resp.data.name,
      }
    }
    if (resp.success) {
      return UserPreferenceQueries.save({
        ...params,
        data: payload
      }).then(resp => {
        if (resp.success) {
          setUser({
            ...user,
            preferences: payload
          })
          eventBus.publishSimilarEvents(/REFRESH.*/i)
        }
        return resp
      })
    } else return resp
  }, [StoreQueries.getSingle, UserPreferenceQueries.save])

  return (
    <MetaDrivenFormModalOpenButton
      buttonLabel="Switch Store"
      formTitle={"Switch Store"}
      formMeta={[{
        fieldName: 'store',
        label: "Store",
        inputType: DROPDOWN,
        refLookupService: StoreQueries.getLookupData,
        displayKey: "name",
        valueKey: "id",
        rules: [{ required: true, message: "This field is required!" }],
        ...defaultStore && { defaultValue: defaultStore.id }
      }]}
      iconType={"shuffle"}
      formSubmitApi={handleSubmit}
    />
  )
}