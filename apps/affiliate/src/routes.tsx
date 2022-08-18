import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },

  { path: "/store/product", component: React.lazy(() => import("~/Pages/Store/Products").then((x) => ({ default: x.List }))) },
  { path: "/store/product/:productID", component: React.lazy(() => import("~/Pages/Store/Products/ProductDetailsPage").then((x) => ({ default: x.ProductDetailsPage }))) },

  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },

  { path: "/administration/import-contacts", component: React.lazy(() => import("~/Pages/Administration/ImportTasks").then((x) => ({ default: x.List }))) },
  { path: "/administration/create-enrollment", component: React.lazy(() => import("~/Pages/Administration/Enrollments/create").then((x) => ({ default: x.Create }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
