// import { IFaculty } from "../utils/Interfaces"
// import { getUser } from "../utils/TokenStore"
// import { checkApiPermission } from "./Permission"

export const checkInstructorApiPermission = (FunctionParameter: (Params?: any, Headers?: any) => Promise<any> | any): boolean => {
  return true

  // const faculty: IFaculty | null = getUser() as IFaculty
  // if (!faculty) return false
  // if (faculty.Roles && faculty.Roles.includes("administrator")) return true
  // return checkApiPermission(FunctionParameter, faculty.APIPermission)
}
