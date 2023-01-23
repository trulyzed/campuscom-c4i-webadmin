import { IQuery } from "./types"

export interface ICareerQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByCourse: IQuery
  getListByCertificate: IQuery
  getSkillsByCourse: IQuery
  getSkillsByCertificate: IQuery
  getSkillsByCareer: IQuery
  getCareersAndSkillsByCourse: IQuery
  getCareersAndSkillsByCertificate: IQuery
}
