import React, { useEffect, useState } from "react"
import { LoginPage } from "~/Pages/Login/LoginPage"
import { DefaultLayout } from "~/Layout/DefaultLayout"
import { NotFoundPage } from "~/Pages/NotFoundPage"
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom"
import { AppRoutes } from "~/routes"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { LoginModal } from "~/Component/Login/LoginModal"
import { checkNewBuild, getToken } from "@packages/api/lib/utils/TokenStore"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"

export function App(): JSX.Element {
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false)

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

  useEffect(() => {
    if (process.env.NODE_ENV === "production") checkNewBuild()
  }, [])

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
        <DefaultLayout>
          <Switch>
            {AppRoutes.map((route, i) => {
              return <Route key={i} {...route} exact />
            })}
            <Route path="*" component={NotFoundPage} />
          </Switch>
          {window.location.pathname.includes(`/login`) && <Redirect to="/" />}
        </DefaultLayout>
      )}
    </BrowserRouter>
  )
}
