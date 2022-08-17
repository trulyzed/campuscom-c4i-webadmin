import { IQuery } from "./types"

export interface ICourseQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getListBySubject: IQuery
  create: IQuery
  update: IQuery
  tagToSubjects: IQuery
  tagRegistrationQuestion: IQuery
  untagRegistrationQuestion: IQuery
  tagCareer: IQuery
}
