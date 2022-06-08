import { IQuery } from "./types"

export interface ICareerQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
  getListByCourse: IQuery
  getSkillsByCareer: IQuery
  getCareersAndSkillsByCourse: IQuery
}