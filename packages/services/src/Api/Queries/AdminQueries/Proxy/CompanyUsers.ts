import { IQuery } from "./types"

export interface ICompanyUserQueries {
  getSingle: IQuery
  getList: IQuery
  getPaginatedList: IQuery
  create: IQuery
  update: IQuery
}

export const processCompanyUsers = (data: { first_name: string; last_name: string; email: string }[]): { name: string }[] => {
  return data.map((i) => ({
    ...i,
    name: `${i.last_name}, ${i.first_name} (${i.email})`
  }))
}
