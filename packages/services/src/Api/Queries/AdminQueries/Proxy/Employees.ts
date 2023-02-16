import { IQuery } from "./types"

export interface IEmployeeQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  create: IQuery
  update: IQuery
  tagSkill: IQuery
}

export const processEmployees = (data: { profile: { first_name: string; last_name: string; primary_email: string } }[]): { name: string }[] => {
  return data.map((i) => ({
    ...i.profile,
    ...i,
    name: `${i.profile.last_name}, ${i.profile.first_name} (${i.profile.primary_email})`
  }))
}
