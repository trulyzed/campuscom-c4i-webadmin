import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "SectionService",
  Module: "hir",
  Actions: {
    findSectionInfoBySectionID: "findSectionInfoBySectionID"
  }
}

export default ApiMethodFactory(config)
