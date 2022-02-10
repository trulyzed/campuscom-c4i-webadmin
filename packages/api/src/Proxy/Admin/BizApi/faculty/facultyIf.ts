import ApiMethodFactory, { Iconfig } from "../../../../utils/ApiMethodFactory"

export const config: Iconfig = {
  EndPoint: "api/bizApiServlet",
  Service: "com.jenzabar.jxntm.server.bizapi.faculty.FacultyIF",
  Module: "hir",
  Actions: {
    searchFaculties: "searchFaculties",
    findSectionRoster: "findSectionRoster"
  }
}

export default ApiMethodFactory(config)
