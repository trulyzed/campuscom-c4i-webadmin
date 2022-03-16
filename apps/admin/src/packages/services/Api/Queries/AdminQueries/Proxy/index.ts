import { IApiPermission, IApiResponse } from "~/packages/services/Api/utils/Interfaces"
import { IQuery, IQueryParams } from "./types"

interface IQueryWoPermission {(data?: IQueryParams) : Promise<IApiResponse>}

export const ConstructQuery = (query: IQueryWoPermission, permission: IApiPermission): IQuery => {
  const func: IQuery = query as unknown as IQuery
  func.__permission = permission
  return func
}