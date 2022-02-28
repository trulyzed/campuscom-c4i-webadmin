import { endpoints } from "~/ApiServices/Endpoints"
import { CallApi } from "./Api"

export const Apis = {
  [endpoints.LOGIN]: (params: { [key: string]: any }) => {
    return CallApi({
      url: endpoints.LOGIN,
      data: params,
      method: "post"
    })
  },
  [endpoints.COURSE_PROVIDER]: (params: { [key: string]: any }) => {
    return CallApi({
      url: endpoints.COURSE_PROVIDER,
      data: params,
      method: "get"
    })
  },
  [endpoints.COURSE]: (params: { [key: string]: any }) => {
    return CallApi({
      url: endpoints.COURSE,
      data: params,
      method: "get"
    })
  }
}
