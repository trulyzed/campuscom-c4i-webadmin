import { IApiResponse } from "~/packages/services/Api/utils/Interfaces"

export const checkApiPermission = (
  FunctionParameter: (Params?: any) => Promise<any> | any,
  APIPermission: {
    Action: string
    Service: string
  }[],
  PermissionOverrideApis: { Action: string }[] = []
): boolean => {
  let permission = false

  if (APIPermission && APIPermission.length > 0 && !!FunctionParameter.name) {
    const indexFound = [...APIPermission, ...PermissionOverrideApis].findIndex((x) => {
      return x.Action === FunctionParameter.name
    })
    permission = indexFound >= 0
  }
  if (process.env.NODE_ENV === "development" && (!permission || !FunctionParameter.name)) {
    console.error(`
      **************************************************
      ${FunctionParameter.name} does not have permission
      **************************************************
      ${FunctionParameter}
      ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    `)
    invalidFuncCheck(FunctionParameter)
  }
  return permission
}

export const invalidFuncCheck = (fn: (Params: { [key: string]: any }) => Promise<IApiResponse>) => {
  const funcNameIsInvalid = !fn.name || fn.name === "getDetailsPageContent" || fn.name === "searchFunc"
  if (process.env.NODE_ENV === "development" && funcNameIsInvalid) throw new Error(`Details Page does not have a valid getDetailsPageContent function, check console for details`)
}
