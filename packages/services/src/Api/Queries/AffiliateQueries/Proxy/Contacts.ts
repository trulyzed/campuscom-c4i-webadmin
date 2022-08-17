import { IQuery } from "./types"

export interface IContactQueries {
  getSingle: IQuery
}

export const processContacts = (data: { first_name: string; last_name: string; primary_email: string }[]): { name: string }[] => {
  return data.map((i) => ({
    ...i,
    name: `${i.last_name}, ${i.first_name} (${i.primary_email})`
  }))
}
