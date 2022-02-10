import ApiMethodFactory from "../../../utils/ApiMethodFactory"

export const config = {
  EndPoint: "api/hirServlet",
  Service: "gradingService",
  Module: "hir",
  Actions: {
    saveCreditType: "saveCreditType",
    findAvailableCreditType: "findAvailableCreditType",
    createOrUpdateGradeScoreDefinition: "createOrUpdateGradeScoreDefinition",
    removeGradeScoreDefinition: "removeGradeScoreDefinition",
    submitFinalGrade: "submitFinalGrade"
  }
}

export default ApiMethodFactory(config)
