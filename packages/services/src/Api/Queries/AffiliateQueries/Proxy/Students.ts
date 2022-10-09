import { IQuery } from "./types"

export interface IStudentQueries {
  getSingle: IQuery
  getPaginatedList: IQuery
  getList: IQuery
}

export const processStudents = (data: { first_name: string; last_name: string; primary_email: string }[]): { name: string }[] => {
  return data.map((i) => ({
    ...i,
    name: `${i.last_name}, ${i.first_name} (${i.primary_email})`
  }))
}
