import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },

  { path: "/course", component: React.lazy(() => import("~/Pages/Course").then((x) => ({ default: x.List }))) },
  { path: "/course/:courseID", component: React.lazy(() => import("~/Pages/Course/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },

  { path: "/skill", component: React.lazy(() => import("~/Pages/Skill").then((x) => ({ default: x.List }))) },

  { path: "/enrollment", component: React.lazy(() => import("~/Pages/Enrollment").then((x) => ({ default: x.List }))) },
  { path: "/enrollment/:enrollmentID", component: React.lazy(() => import("~/Pages/Enrollment/EnrollmentDetailsPage").then((x) => ({ default: x.EnrollmentDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
