import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "aboutService",
  Module: "hir",
  Actions: {
    getAboutInfo: "getAboutInfo"
  }
}

export default ApiMethodFactory(config)
