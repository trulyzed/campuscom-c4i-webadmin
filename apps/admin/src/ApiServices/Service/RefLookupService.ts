import RefLookupService, { config } from "@packages/api/lib/Proxy/Admin/Service/RefLookupService"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"

import { REASON_HOLD_APPLY, REASON_HOLD_RELEASE } from "~/Constants"

export function getList(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList](Params)
}
export function createRefRecord(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RefLookupService[config.Actions.createRefRecord](Params)
}
export function getRefRecord(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getRefRecord](Params)
}
export function updateRefRecord(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RefLookupService[config.Actions.updateRefRecord](Params)
}
export function removeRefRecord(Params: { [key: string]: any }): Promise<IApiResponse> {
  return RefLookupService[config.Actions.removeRefRecord](Params)
}

export function getOfferingTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingType"
  })
}

export function getTerms(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Term"
  })
}

export function getDurationType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DurationType"
  })
}

export function getActiveTerms(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Term"
  }).then((response) => {
    if (response.success) {
      response.data = response.data.filter((x: any) => x.IsActive)
    }
    return response
  })
}

export function getOfferingStatusTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingStatusCode"
  })
}

export function getOrganizations(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Organization"
  })
}

export function getPaymentGatewayAccounts(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PaymentGatewayAccount"
  })
}
export function getPaymentTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PaymentType"
  })
}
export function getBasePaymentTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "BasePaymentType"
  })
}

export function getSectionTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionType"
  })
}

export function getSectionStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionStatusCode"
  })
}

export function getGLAccountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GLAccount"
  }).then((response) => {
    if (response.success) {
      response.data.map((x: any) => {
        x.Name = x.Name + ` (${x.Description})`
        return x
      })
    }
    return response
  })
}
export function getAccountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AccountType"
  })
}
export function getAffiliationRoleType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AffiliationRoleType"
  })
}

export function getFinancialCategoryType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialCategoryType"
  })
}

export function getFinancialBasisType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialBasisType"
  })
}

export function getFinancialType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FinancialType"
  })
}

export function getTagTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TagType"
  })
}

export function getPolicyTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingGroupPolicyType"
  })
}

export function getInstructorTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "InstructorType"
  })
}

export function getCountries(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CountryCode"
  })
}

export function getGenderTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GenderType"
  })
}

export function getMaritalStatusType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MaritalStatusType"
  })
}

export function getCitizenshipType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CitizenshipType"
  })
}

export function getReligionType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ReligionType"
  })
}

export function getRegionCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RegionCode"
  })
}

export function getEthnicityTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "EthnicityType"
  })
}

export function getInstitutionStatusTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "InstitutionStatusCode"
  })
}

export function getFiscalPeriodCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "FiscalPeriodCode"
  })
}

export function getDueDatePolicy(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DueDatePolicy"
  })
}

export function getGradeScaleType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GradeScaleType"
  })
}

export function getCreditType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CreditType"
  })
}

export function getAttendanceUnit(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AttendanceUnit"
  })
}

export function getRefundPolicyType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RefundPolicyType"
  })
}

export function getMeetingTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MeetingType"
  })
}

export function getSites(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Site"
  })
}

export function getProgramStatusCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProgramStatusCode"
  })
}

export function getProgramApplicationStatusCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProgramAppStatusCode"
  })
}

export function getProgramEnrollmentStatusCodes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProgramEnrollStatusCode"
  })
}

export function getSectionNotices(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionNoticeType"
  })
}

export function getDiscountAmountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DiscountAmountType"
  })
}

export function getQuestionEvents(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "QuestionEvent"
  })
}

export function getQuestionGroup(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "QuestionGroup"
  })
}

export function getRoomTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RoomUseType"
  })
}

export function getPreferenceValueType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "PreferenceValueType"
  })
}

export function getOPCStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OPCStatusCode"
  })
}

export function getRequestType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "RequestType"
  })
}

export function getSourceModule(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SourceModule"
  })
}

export function getSectionRosterStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SectionRosterStatusCode"
  })
}

export function getProductCategoryTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProductCategory"
  })
}

export function getTranscriptTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TranscriptType"
  })
}

export function getCommentCategories(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CommentCategory"
  })
}

export function getMeetingInformationTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MeetingInformationType"
  })
}

export function getProductTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProductType"
  })
}

export function getProductDefinitions(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ProductDefinition"
  })
}

export function getDeliveryModes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DeliveryMode"
  })
}

export function getCatalogTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CatalogType"
  })
}

export function getDiscountTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DiscountType"
  })
}

export function getOrganizationTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OrganizationType"
  })
}

export function getMembershipProgramTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MembershipProgram"
  })
}

export function getCertificateCategoryType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CertificateCategoryType"
  })
}

export function getAddressType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AddressType"
  })
}

export function getEmailType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "EmailType"
  })
}

export function getTelephoneType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TelephoneType"
  })
}

export function getSecretQuestionType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SecretQuestionType"
  })
}

export function getDisabilityType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DisabilityType"
  })
}

export function getSchoolCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SchoolCode"
  })
}

export function getCredentialType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "CredentialType"
  })
}

export function getExitReasons(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ExitReasonCode"
  })
}

export function getSystemEvent(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "SystemEvent"
  })
}

export function getReasonType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ReasonType"
  })
}

export function getTermType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "TermType"
  })
}

export function getGradeType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GradeType"
  })
}

export function getAcademicStandingType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AcademicStandingType"
  })
}

export function getStudentStatusCode(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "StudentStatusCode"
  })
}

export function getHoldType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "HoldType"
  })
}

export function getHoldReason(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Reason"
  }).then((response) => {
    if (response.success) {
      const reasonList: Array<{ [key: string]: any }> = []
      response.data.map((x: any) => {
        if (x.ReasonTypeID === REASON_HOLD_APPLY) {
          reasonList.push(x)
        }
        return reasonList
      })
      response.data = [...reasonList]
    }
    return response
  })
}

export function getReleaseReason(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Reason"
  }).then((response) => {
    if (response.success) {
      const reasonList: Array<{ [key: string]: any }> = []
      response.data.map((x: any) => {
        if (x.ReasonTypeID === REASON_HOLD_RELEASE) {
          reasonList.push(x)
        }
        return reasonList
      })
      response.data = [...reasonList]
    }
    return response
  })
}

export function getMetricType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "MetricType"
  })
}

export function getGLAccountMappingTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "GLAccountMappingType"
  })
}

export function getOfferingGroupPolicyTypes(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "OfferingGroupPolicyType"
  })
}

export function getAccountAffiliationStatus(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "AccountAffiliationStatus"
  })
}

export function getResourceType(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "ResourceType"
  })
}

export function getReason(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "Reason"
  })
}

export function getDiscountGroup(): Promise<IApiResponse> {
  return RefLookupService[config.Actions.getList]({
    LookUpName: "DiscountGroup"
  })
}
