import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },

  { path: "/administration/department", component: React.lazy(() => import("~/Pages/Administration/Departments").then((x) => ({ default: x.List }))) },
  { path: "/administration/department/:departmentID", component: React.lazy(() => import("~/Pages/Administration/Departments/DepartmentDetailsPage").then((x) => ({ default: x.DepartmentDetailsPage }))) },

  { path: "/employee-management/employee", component: React.lazy(() => import("~/Pages/EmployeeManagement/Employees").then((x) => ({ default: x.List }))) },
  { path: "/employee-management/employee/:employeeID", component: React.lazy(() => import("~/Pages/EmployeeManagement/Employees/EmployeeDetailsPage").then((x) => ({ default: x.EmployeeDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
