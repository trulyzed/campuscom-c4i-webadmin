import React, { useEffect, useState } from "react"
import { LoginPage } from "~/Pages/Login/LoginPage"
import { NotFoundPage } from "~/Pages/NotFoundPage"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
import { AppRoutes } from "~/routes"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { LoginModal } from "~/Component/Login/LoginModal"
import { getToken } from "@packages/services/lib/Api/utils/TokenStore"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { useGlobalErrorHandler } from "@packages/services/lib/Api/Hooks/useGlobalErrorHandler"
import { EmptyState } from "@packages/components/lib/Layout/EmptyState"
import { ConfigProvider, notification } from "antd"
import { UserDataProvider } from "@packages/components/lib/Context/UserDataContext"
import { Layout } from "./Component/Layout/Layout"
import { MODAL_HEADING_ID } from "@packages/components/lib/Modal/Modal"

notification.config({
  closeIcon: <span className="glyphicon glyphicon--primary glyphicon-remove" />,
  duration: 4
})

export function App(): JSX.Element {
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)
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

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div id="modal-container" role="dialog" aria-labelledby={MODAL_HEADING_ID}></div>
      {showLoginModal && <LoginModal />}

      <div id="main-body">
        {redirectToLogin ? (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        ) : (
          <ConfigProvider renderEmpty={() => <EmptyState />}>
            <UserDataProvider>
              <Layout>
                <Switch>
                  {AppRoutes.map((route, i) => {
                    return <Route key={i} {...route} exact />
                  })}
                  <Route path="*" component={NotFoundPage} />
                </Switch>
                {window.location.pathname.includes(`/login`) && <Redirect to="/" />}
              </Layout>
            </UserDataProvider>
          </ConfigProvider>
        )}
      </div>
    </BrowserRouter>
  )
}
