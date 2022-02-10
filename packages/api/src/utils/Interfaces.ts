export interface ApiConfig {
  baseURL?: undefined | string
  url?: string
  method?: string
  headers?: any
  params?: any
  data?: any
  responseType?: any
}

export enum ErrorType {
  GLOBAL,
  CUSTOM
}

export type RoleType =
  | "everybody"
  | "administrator"
  | "registrar"
  | "academicStaff"
  | "seniorAcademicStaff"
  | "bursar"
  | "coordinator"
  | "retail"
  | "developer"
  | "override"
  | "registrar2"
  | "bursar2"
  | "readonly"

export interface IBaseUser {}
export interface IUser extends IBaseUser {
  Email: string
  UserID: string
  FirstName: string
  Roles: RoleType[]
  LastName: string
  MiddleName: string
  APIPermission: { Action: string; Service: string }[]
}

export interface IFaculty extends IBaseUser {
  Name: string
  Email: string
  PersonID: number
  SortName: string
  StudentID: number
  StudentSerialNum: string
  FacultyID: number
  FacultySerialNum: string
  AccountID: number
  AccountName: string
  AccountTypeID: number
  ERPID: string
  Roles: RoleType[]
  TNCAccepted: boolean
  APIPermission: {
    Action: string
    Service: string
  }[]
}
export interface IStudent extends IBaseUser {
  Name: string
  Email: string
  PersonID: number
  SortName: string
  StudentID: number
  StudentSerialNum: string
  FacultyID: number
  FacultySerialNum: string
  AccountID: number
  AccountName: string
  AccountTypeID: number
  ERPID: string
  Roles: RoleType[]
  TNCAccepted: boolean
  APIPermission: {
    Action: string
    Service: string
  }[]
}

export interface IApiResponse {
  code: number
  data: any
  error: any
  success: boolean
  cacheEntryTime?: number
}

export const RESPONSE_TYPE = {
  EXCEL: "__downloadDataAsEXCEL",
  CSV: "__downloadDataAsCSV",
  PDF: "__downloadDataAsPDF"
}
