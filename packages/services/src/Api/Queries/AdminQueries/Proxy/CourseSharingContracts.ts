import { IQuery } from "./types"

export interface ICourseSharingContractQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  create: IQuery
  update: IQuery
  deactivate: IQuery
  getAvailableCourseList: IQuery
  deactivateStoreCourse: IQuery
}
