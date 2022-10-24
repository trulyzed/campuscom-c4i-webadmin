import React, { useEffect, useState } from "react"
import { LoginPage } from "~/Pages/Login/LoginPage"
import { DefaultLayout } from "@packages/components/lib/Layout/DefaultLayout"
import { NotFoundPage } from "~/Pages/NotFoundPage"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
import { AppRoutes } from "~/routes"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { LoginModal } from "~/Component/Login/LoginModal"
import { getToken, getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { useGlobalErrorHandler } from "@packages/services/lib/Api/Hooks/useGlobalErrorHandler"
import { EmptyState } from "@packages/components/lib/Layout/EmptyState"
import { ConfigProvider, notification } from "antd"
import { getSidebarMenus } from "./Component/Layout/SidebarMenus"
import { logout } from "./Services/AuthService"

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
