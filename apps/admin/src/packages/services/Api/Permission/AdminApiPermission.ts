import { IQuery } from "~/packages/services/Api/Queries/AdminQueries/Proxy/types"
import { getUser } from "~/packages/services/Api/utils/TokenStore"
import { checkApiPermission } from "./Permission"


export const checkAdminApiPermission = (QueryFunc: IQuery): boolean => {
  const user = getUser()
  if (!user) return false
  if (user.is_superuser) return true
  else if (!QueryFunc.__permission) return false
  return checkApiPermission(QueryFunc.__permission, user.permissions)
}
