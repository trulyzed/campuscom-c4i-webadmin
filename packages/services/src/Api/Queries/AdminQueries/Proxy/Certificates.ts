import { IQuery } from "./types"

export interface ICertificateQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  create: IQuery
  update: IQuery
  tagCareer: IQuery
  tagCourse: IQuery
  untagCourse: IQuery
}
