import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  {
    path: "/user-profile",
    component: React.lazy(() => import("~/Pages/UserProfilePage").then((x) => ({ default: x.UserProfilePage })))
  },
  { path: "/about", component: React.lazy(() => import("~/Pages/AboutPage").then((x) => ({ default: x.AboutPage }))) },

]
