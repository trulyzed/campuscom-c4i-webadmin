import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/institute/course", component: React.lazy(() => import("~/Pages/Institute/Courses").then((x) => ({ default: x.List }))) },
  { path: "/institute/course/:courseID", component: React.lazy(() => import("~/Pages/Institute/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
