export enum PermissionContext {
  Store = "Store",
  CourseProvider = "Course Provider"
}

export enum ApiPermissionAction {
  Read = "r",
  Write = "w",
  Delete = "d"
}

export enum ApiPermissionClass {
  AddableMembershipProgramDiscount = "AddableMembershipProgramDiscountView",
  AttachmentDownload = "AttachmentDownloadView",
  ApiKey = "CourseProviderAPIKeyView",
  AuditTrail = "UserAuditTrailViewSet",
  Campus = "CourseProviderSiteModelViewSet",
  Career = "OccupationModelViewSet",
  CareerRecommendation = "CareerRecommendation",
  CareerSuggested = "CareerSuggested",
  Cart = "CartViewSet",
  CartItem = "CartItemViewSet",
  CartItemDiscount = "CartItemDiscountViewSet",
  CartItemProfile = "CartItemProfileViewSet",
  Certificate = "CertificateViewSet",
  CertificateCourse = "CertificateCourseView",
  CertificateEnrollment = "CertificateEnrollmentViewSet",
  ChangePassword = "ChangePasswordView",
  Contact = "ContactViewSet",
  ContactGroup = "ContactGroupViewSet",
  ContactGroupProfile = "ContactGroupProfileViewSet",
  Course = "CourseViewSet",
  CourseBySubject = "CourseBySubjectView",
  Company = "StoreCompanyViewSet",
  CompanyCustomRole = "CompanyCustomRoleViewSet",
  CompanyUser = "CompanyUserViewSet",
  Coupon = "CouponViewSet",
  CouponUsage = "CouponUsageView",
  CourseEnrollment = "CourseEnrollmentViewSet",
  CourseProvider = "CourseProviderViewSet",
  CoursePublishingStore = "SharedCoursesView",
  CourseSharingContract = "CourseSharingContractViewSet",
  CreatableOrderDetails = "EnrollmentProductDetailsView",
  CreatableOrderPaymentSummary = "PaymentSummaryView",
  CreateOrder = "CreateEnrollmentView",
  CustomRole = "CustomRoleViewSet",
  CustomUser = "CustomUserViewSet",
  DeleteCertificateCourse = "DeleteCertificateCoursesView",
  DeleteCompany = "DeleteCompanyViewSet",
  DeleteContactGroupProfile = "DeleteContactGroupProfileView",
  DeleteMembershipProgram = "DeleteMembershipProgramView",
  DeleteMembershipProgramDiscount = "DeleteMembershipProgramDiscountView",
  DeleteMembershipProgramParticipant = "DeleteMembershipProgramParticipantView",
  DeletePaymentQuestion = "DeletePaymentQuestionView",
  DeleteProfileQuestion = "DeleteProfileQuestionView",
  DeleteRegistrationQuestion = "DeleteRegistrationQuestionView",
  DeleteRelatedProduct = "DeleteRelatedProductView",
  DeleteQuestion = "DeleteQuestionBankView",
  DeleteSchedule = "DeleteScheduleViewSet",
  DeleteCoupon = "DeleteCouponView",
  DeleteDiscountProgram = "DeleteDiscountProgramView",
  DeleteDiscountRule = "DeleteDiscountRuleView",
  DeleteStoreFeaturedCareer = "DeleteFeaturedCareersView",
  DeleteStoreIdentityProvider = "DeleteStoreIdentityProviderView",
  DeleteStorePaymentGateway = "DeleteStorePaymentGatewayView",
  DeleteStudent = "DeleteProfile",
  DeleteTransactionBatch = "DeleteTransactionBatchView",
  DiscountProgram = "DiscountProgramViewSet",
  DiscountProgramUsageHistory = "DiscountProgramUsageView",
  DiscountRule = "DiscountRuleViewSet",
  DownloadTransactionBatch = "DownloadTransactionBatchView",
  ExternalEntity = "ExternalEntityViewSet",
  FailedMQ = "failed_messages_list",
  GlobalConfiguration = "GlobalConfigurationViewSet",
  IdentityProvider = "IdentityProviderViewSet",
  ImportTask = "ImportTaskViewSet",
  Instructor = "InstructorModelViewSet",
  MembershipProgram = "MembershipProgramViewSet",
  MembershipProgramDiscount = "MembershipProgramDiscountViewSet",
  MembershipProgramParticipant = "MembershipProgramParticipantViewSet",
  MFAActivate = "MFAActivateView",
  MFADeactivate = "MFADeactivateView",
  ParticipantByMembershipProgram = "ParticipantByMembershipProgramViewSet",
  Payment = "PaymentViewSet",
  PaymentGateway = "PaymentGatewayViewSet",
  PaymentGatewayConfig = "PaymentGatewayConfigViewSet",
  PaymentQuestion = "PaymentQuestionViewSet",
  PaymentLog = "PaymentLogViewSet",
  Permission = "PermissionViewSet",
  Persona = "PersonaView",
  Preference = "UserTableConfigurationViewSet",
  Product = "ProductViewSet",
  Profile = "ProfileViewSet",
  ProfileActivity = "GetUserActivities",
  ProfileByCareer = "ProfileByCareerView",
  ProfileCareerQuiz = "ProfileCareerQuiz",
  ProfileCommunicationMedium = "ProfileCommunicationMediumViewSet",
  ProfileEnrollment = "ProfileEnrollmentViewSet",
  ProfileLink = "ProfileLinkViewSet",
  ProfilePreference = "ProfilePreferenceViewSet",
  ProfileQuestion = "ProfileQuestionViewSet",
  ProfileSavedCareer = "ProfileSavedCareerView",
  PublishedCourse = "PublishedCourseViewSet",
  Question = "QuestionBankViewSet",
  QuizResult = "QuizResultView",
  RequeueFaliedMQ = "message_requeue",
  RequeueImport = "import_requeue",
  Refund = "RefundViewSet",
  RegistrationQuestion = "RegistrationQuestionViewSet",
  RelatedProduct = "RelatedProductViewSet",
  ResetPassword = "ResetPasswordView",
  RetrieveStoreCourse = "GetStoreCourseView",
  RetrieveStoreCertificate = "GetStoreCertificateView",
  Role = "RoleViewSet",
  Schedule = "SectionSchedules",
  Seat = "SeatReservationViewSet",
  SeatBlock = "SeatBlockReservationViewSet",
  SeatRegistration = "SeatRegistrationViewSet",
  SeatToken = "SeatReservationTokenGenerationView",
  Section = "SectionViewSet",
  Skill = "OccupationSkillModelViewSet",
  Store = "StoreViewSet",
  StoreCertificate = "StoreCertificateView",
  StoreConfiguration = "StoreConfigurationViewSet",
  StoreCourse = "StoreCourseView",
  StoreCourseSubject = "CourseCatalogViewSet",
  StoreCourseSubjectTagging = "CourseCatalogTagging",
  StoreDomainConfiguration = "StoreDomainConfigurationViewSet",
  StoreEnrollment = "StoreEnrollmentViewSet",
  StoreFeaturedCareer = "StoreFeaturedCareerViewSet",
  StoreIdentityProvider = "StoreIdentityProviderViewSet",
  StorePaymentGateway = "StorePaymentGatewayViewSet",
  StoreUpdate = "StoreUpdateViewSet",
  StoreUser = "StoreUsers",
  Student = "StudentViewSet",
  Subject = "CatalogViewSet",
  TaggedCertificateCareer = "TaggedCertificateCareersView",
  TaggedCertificateCareerAndSkill = "TaggedCertificateCareersSkillsViewSet",
  TaggedCertificateSkill = "TaggedCertificateSkillsView",
  TaggedCourseCareer = "TaggedCourseCareersView",
  TaggedCourseCareerAndSkill = "TaggedCourseCareersSkillsViewSet",
  TaggedCourseSkill = "TaggedCourseSkillsView",
  Transaction = "TransactionViewSet",
  TransactionBatch = "TransactionBatchViewSet",
  TransactionReport = "TransactionReportView",
  UnlinkProfile = "UnlinkProfile",
  UpdatePaymentQuestion = "UpdatePaymentQuestionView",
  UpdateProfileQuestion = "UpdateProfileQuestionView",
  UpdateRegistrationQuestion = "UpdateRegistrationQuestionView"
}
