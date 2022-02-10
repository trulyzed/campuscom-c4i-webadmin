import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "RefLookupService",
  Module: "hir",
  Actions: {
    getList: "getList",
    createRefRecord: "createRefRecord",
    getRefRecord: "getRefRecord",
    removeRefRecord: "removeRefRecord",
    updateRefRecord: "updateRefRecord"
  }
}
export default ApiMethodFactory(config)
