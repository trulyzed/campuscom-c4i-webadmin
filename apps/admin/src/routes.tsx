import React from "react"
import { RouteProps } from "react-router-dom"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage").then((x) => ({ default: x.HomePage }))) },
  { path: "/institute/course", component: React.lazy(() => import("~/Pages/Institute/Courses").then((x) => ({ default: x.List }))) },
  { path: "/institute/course/:courseID", component: React.lazy(() => import("~/Pages/Institute/Courses/CourseDetailsPage").then((x) => ({ default: x.CourseDetailsPage }))) },
  { path: "/institute/section/:sectionID", component: React.lazy(() => import("~/Pages/Institute/Sections/SectionDetailsPage").then((x) => ({ default: x.SectionDetailsPage }))) },
  { path: "/institute/instructor", component: React.lazy(() => import("~/Pages/Institute/Instructors").then((x) => ({ default: x.List }))) },
  { path: "/institute/instructor/:instructorID", component: React.lazy(() => import("~/Pages/Institute/Instructors/InstructorDetailsPage").then((x) => ({ default: x.InstructorDetailsPage }))) },
  { path: "/institute/campus", component: React.lazy(() => import("~/Pages/Institute/Campuses").then((x) => ({ default: x.List }))) },
  { path: "/institute/campus/:campusID", component: React.lazy(() => import("~/Pages/Institute/Campuses/CampusDetailsPage").then((x) => ({ default: x.CampusDetailsPage }))) },

  { path: "/store/subject", component: React.lazy(() => import("~/Pages/Store/Subjects").then((x) => ({ default: x.List }))) },
  { path: "/store/subject/:subjectID", component: React.lazy(() => import("~/Pages/Store/Subjects/SubjectDetailsPage").then((x) => ({ default: x.SubjectDetailsPage }))) },
  { path: "/store/publishing", component: React.lazy(() => import("~/Pages/Store/Publishings").then((x) => ({ default: x.List }))) },
  { path: "/store/publishing/:publishingID", component: React.lazy(() => import("~/Pages/Store/Publishings/PublishingDetailsPage").then((x) => ({ default: x.PublishingDetailsPage }))) },
  { path: "/store/ready-publishing/:publishingID", component: React.lazy(() => import("~/Pages/Store/Publishings/ReadyPublishingDetailsPage").then((x) => ({ default: x.ReadyPublishingDetailsPage }))) },
  { path: "/store/product", component: React.lazy(() => import("~/Pages/Store/Products").then((x) => ({ default: x.List }))) },
  { path: "/store/product/:productID", component: React.lazy(() => import("~/Pages/Store/Products/ProductDetailsPage").then((x) => ({ default: x.ProductDetailsPage }))) },

  { path: "/storefront-data/order", component: React.lazy(() => import("~/Pages/StorefrontData/Orders").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/order/:orderID", component: React.lazy(() => import("~/Pages/StorefrontData/Orders/OrderDetailsPage").then((x) => ({ default: x.OrderDetailsPage }))) },
  { path: "/storefront-data/payment", component: React.lazy(() => import("~/Pages/StorefrontData/Payments").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/payment/:paymentID", component: React.lazy(() => import("~/Pages/StorefrontData/Payments/PaymentDetailsPage").then((x) => ({ default: x.PaymentDetailsPage }))) },
  { path: "/storefront-data/student", component: React.lazy(() => import("~/Pages/StorefrontData/Students").then((x) => ({ default: x.List }))) },
  { path: "/storefront-data/student/:studentID", component: React.lazy(() => import("~/Pages/StorefrontData/Students/StudentDetailsPage").then((x) => ({ default: x.StudentDetailsPage }))) },

  { path: "/configuration/identity-provider/:identityProviderID", component: React.lazy(() => import("~/Pages/Configuration/IdentityProvider/IdentityProviderDetailsPage").then((x) => ({ default: x.IdentityProviderDetailsPage }))) },

  { path: "/administration/course-provider/:courseProviderID", component: React.lazy(() => import("~/Pages/Administration/CourseProviders/CourseProviderDetailsPage").then((x) => ({ default: x.CourseProviderDetailsPage }))) },
  { path: "/administration/store", component: React.lazy(() => import("~/Pages/Administration/Stores").then((x) => ({ default: x.List }))) },
  { path: "/administration/store/:storeID", component: React.lazy(() => import("~/Pages/Administration/Stores/StoreDetailsPage").then((x) => ({ default: x.StoreDetailsPage }))) },
  { path: "/administration/course-sharing-contract/:courseSharingContractID", component: React.lazy(() => import("~/Pages/Administration/CourseSharingContracts/CourseSharingContractDetailsPage").then((x) => ({ default: x.CourseSharingContractDetailsPage }))) },
  { path: "/administration/user/:userID", component: React.lazy(() => import("~/Pages/Administration/Users/UserDetailsPage").then((x) => ({ default: x.UserDetailsPage }))) },

  { path: "/user-profile", component: React.lazy(() => import("~/Pages/UserProfile").then((x) => ({ default: x.UserProfile }))) },
]
