import ApiMethodFactory from "../../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.person.PersonIF",
  Module: "hir",
  Actions: {
    searchPersons: "searchPersons",
    findPreferredEmail: "findPreferredEmail"
  }
}

export default ApiMethodFactory(config)
