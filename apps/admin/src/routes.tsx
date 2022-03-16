import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/course", component: React.lazy(() => import("~/Pages/Manage/Courses").then((x) => ({ default: x.List }))) },
  { path: "/course/:courseID", component: React.lazy(() => import("~/Pages/Manage/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/financials/order", component: React.lazy(() => import("~/Pages/Manage/Financials/Orders").then((x) => ({ default: x.List }))) },
  { path: "/financials/order/:orderID", component: React.lazy(() => import("~/Pages/Manage/Financials/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
