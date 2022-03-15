import { IApiPermission } from "~/packages/services/Api/utils/Interfaces"

export const checkApiPermission = (permission: IApiPermission, userPermissions: IApiPermission[]): boolean => {
  return !!userPermissions.find(g => g.operation === permission.operation && g.action === permission.action)
}