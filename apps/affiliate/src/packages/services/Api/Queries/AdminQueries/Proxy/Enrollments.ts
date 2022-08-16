import { IQuery } from "./types"

export interface IEnrollmentQueries {
  getList: IQuery
  getCourseEnrollmentList: IQuery
  getSingleCourseEnrollment: IQuery
  create: IQuery
  createWithPurchaserInfo: IQuery
  getPaymentSummary: IQuery
}