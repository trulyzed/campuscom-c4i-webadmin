import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "preferenceService",
  Module: "hir",
  Actions: {
    getPreferences: "getPreferences",
    deletePreferences: "deletePreferences",
    saveOrUpdatePreferences: "saveOrUpdatePreferences"
  }
}

export default ApiMethodFactory(config)
