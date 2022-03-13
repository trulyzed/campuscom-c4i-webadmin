import { IApiPermission } from "~/packages/services/Api/utils/Interfaces"
import { IQuery, IPublicQuery } from "./types"

export const ConstructQuery = (query: IPublicQuery, permission: IApiPermission): IQuery => {
  const func: IQuery = query as unknown as IQuery
  func.__permission = permission
  return func
}