import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  {
    path: "/course/list",
    component: React.lazy(() => import("~/Pages/Course/List").then((x) => ({ default: x.List })))
  }
]
