import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },

  { path: "/store/product", component: React.lazy(() => import("~/Pages/Store/Products").then((x) => ({ default: x.List }))) },
  { path: "/store/product/:productID", component: React.lazy(() => import("~/Pages/Store/Products/ProductDetailsPage").then((x) => ({ default: x.ProductDetailsPage }))) },

  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/storefront-data/student", component: React.lazy(() => import("~/Pages/StorefrontData/Students").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/student/:studentID", component: React.lazy(() => import("~/Pages/StorefrontData/Students/StudentDetailsPage").then((x) => ({ default: x.StudentDetailsPage }))) },

  { path: "/administration/contact", component: React.lazy(() => import("~/Pages/Administration/Contacts/index").then((x) => ({ default: x.List }))) },
  { path: "/administration/contact/:contactID", component: React.lazy(() => import("~/Pages/Administration/Contacts/ContactDetailsPage").then((x) => ({ default: x.ContactDetailsPage }))) },
  { path: "/administration/import-contacts", component: React.lazy(() => import("~/Pages/Administration/ImportTasks").then((x) => ({ default: x.List }))) },
  { path: "/administration/enrollment", component: React.lazy(() => import("~/Pages/Administration/Enrollments/index").then((x) => ({ default: x.List }))) },
  { path: "/administration/enrollment/:enrollmentID", component: React.lazy(() => import("~/Pages/Administration/Enrollments/EnrollmentDetailsPage").then((x) => ({ default: x.EnrollmentDetailsPage }))) },
  { path: "/administration/create-enrollment", component: React.lazy(() => import("~/Pages/Administration/Enrollments/create").then((x) => ({ default: x.Create }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
