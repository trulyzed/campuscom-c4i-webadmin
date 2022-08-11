import { IQuery } from "./types"

export interface IEnrollmentQueries {
  getList: IQuery
  getCourseEnrollmentList: IQuery
  getSingleCourseEnrollment: IQuery
  create: IQuery
  getPaymentSummary: IQuery
}