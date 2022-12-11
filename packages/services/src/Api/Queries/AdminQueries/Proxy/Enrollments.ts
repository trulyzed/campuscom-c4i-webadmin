import { IQuery } from "./types"

export interface IEnrollmentQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  getCourseEnrollmentList: IQuery
  getSingleCourseEnrollment: IQuery
  remove: IQuery
  swap: IQuery
  updateApprovalStatus: IQuery
}
