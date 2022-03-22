import { IApiPermission, IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { IQuery, IQueryParams } from "./types"

interface IQueryWoPermission {(data?: IQueryParams) : Promise<IApiResponse>}

export const PermissionWrapper = (query: IQueryWoPermission, permissions: IQuery['__permissions']): IQuery => {
  const func: IQuery = query as unknown as IQuery
  func.__permissions = permissions
  return func
}

export const QueryConstructor = (callback: IQueryWoPermission, queries: IQuery[]): IQuery => {
  const func: IQuery = callback as unknown as IQuery
  func.__permissions = queries.reduce((a, c) => {
    a = [...a, ...c.__permissions]
    return a
  }, [] as IApiPermission[])
  return func
}
