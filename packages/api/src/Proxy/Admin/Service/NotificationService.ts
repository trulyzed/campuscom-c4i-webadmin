import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "notificationService",
  Module: "hir",
  Actions: {
    sendEmail: "sendEmail"
  }
}

export default ApiMethodFactory(config)
