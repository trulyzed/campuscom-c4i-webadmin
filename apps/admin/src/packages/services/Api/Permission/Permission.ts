import { IApiPermission } from "~/packages/services/Api/utils/Interfaces"

export const checkApiPermission = (permission: IApiPermission, userPermissions: IApiPermission[]): boolean => {
  return permission.is_public || !!userPermissions.find(g => g.is_public || (g.operation === permission.operation && g.action === permission.action))
}