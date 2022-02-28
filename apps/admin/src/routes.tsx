import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/offerings/courses/list", component: React.lazy(() => import("~/Pages/Manage/Offerings/Courses").then((x) => ({ default: x.List }))) },
  { path: "/offerings/courses/:courseID", component: React.lazy(() => import("~/Pages/Manage/Offerings/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
]
