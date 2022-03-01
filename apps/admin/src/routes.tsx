import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/courses/list", component: React.lazy(() => import("~/Pages/Manage/Courses").then((x) => ({ default: x.List }))) },
  { path: "/courses/:courseID", component: React.lazy(() => import("~/Pages/Manage/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/financials/orders/list", component: React.lazy(() => import("~/Pages/Manage/Financials/Orders").then((x) => ({ default: x.List }))) },
  { path: "/financials/orders/:orderID", component: React.lazy(() => import("~/Pages/Manage/Financials/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
]
