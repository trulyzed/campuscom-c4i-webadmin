import React from "react"
import * as Sentry from "@sentry/react"
import * as serviceWorker from "~/serviceWorker"
import { render } from "react-dom"
import { App } from "~/App"
import { RegisteGlobalhttpErrorHandlerr } from "~/ApiServices/RegisteGlobalhttpErrorHandlerr"
import "~/Less/theme.less"

if (process.env.REACT_APP_SENTRY_RELEASE && process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    release: process.env.REACT_APP_SENTRY_RELEASE,
    dsn: process.env.REACT_APP_SENTRY_DSN
  })
}

RegisteGlobalhttpErrorHandlerr()

const root = document.getElementById("root")
render(<App />, root)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
