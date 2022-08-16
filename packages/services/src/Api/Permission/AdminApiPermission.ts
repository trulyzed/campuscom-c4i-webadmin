import { IQuery } from "~/Api/Queries/AdminQueries/Proxy/types"
import { getUser } from "~/Api/utils/TokenStore"
import { checkApiPermission } from "./Permission"

export const checkAdminApiPermission = (QueryFunc: IQuery): boolean => {
  const user = getUser()

  if (!user) return false
  if (user.is_superuser) return true
  if (!QueryFunc.__permissions.length) return false

  if (QueryFunc.__permissions.some((permission) => !checkApiPermission(permission, user.permissions))) return false
  else return true
}
