import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },

  { path: "/administration/organization", component: React.lazy(() => import("~/Pages/Administration/Companies").then((x) => ({ default: x.List }))) },
  { path: "/administration/organization/:companyID", component: React.lazy(() => import("~/Pages/Administration/Companies/CompanyDetailsPage").then((x) => ({ default: x.CompanyDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
