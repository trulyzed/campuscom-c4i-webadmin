export const endpoints = {
  ACTIVATE_MFA: "mfa/activate",
  ADDABLE_MEMBERSHIP_PROGRAM_DISCOUNTS: "addable-membership-program-discounts",
  API_KEY: "key",
  ATTACHMENT_DOWNLOAD: "attachment-download",
  AUDIT_TRAIL: "user-audit-trails",
  CAREER: "careers",
  CAREER_SAVING_STUDENT: "profiles-by-career",
  CAREER_SKILL: "occupations-skills",
  CAMPUS: "course-provider-sites",
  CART: "carts",
  CART_ITEM: "cart-item",
  CART_ITEM_DISCOUNT: "cart-item-discounts",
  CART_ITEM_PROFILE: "cart-item-profiles",
  CERTIFICATE: "certificates",
  CERTIFICATE_COURSE: "certificate-courses",
  CERTIFICATE_ENROLLMENT: "certificate-enrollments",
  CHANGE_PASSWORD: "password/change",
  CHECK_RECORD_SESSION_PERMISSION: "record-session-permission",
  COMPANY: "store-companies",
  COMPANY_CUSTOM_ROLE: "company-custom-roles",
  COMPANY_USER: "company-users",
  CONTACT: "contacts",
  CONTACT_GROUP: "contact-groups",
  CONTACT_GROUP_PROFILE: "contact-group-profiles",
  COUPON: "coupons",
  COUPON_USAGE: "coupon-usage",
  COURSE: "courses",
  COURSE_BY_SUBJECT: "courses-by-catalog",
  COURSE_CAREER_SUGGESTED: "career-suggested",
  COURSE_ENROLLMENT: "course-enrollments",
  COURSE_PROVIDER: "course-providers",
  COURSE_PUBLISHING_STORE: "course-publishing-stores",
  COURSE_RECOMMENDED_CAREER: "career-recommendation",
  COURSE_SHARING_CONTRACT: "course-sharing-contracts",
  COURSE_SHARING_CONTRACT_COURSE: "course-sharing-contract-courses",
  CREATABLE_ORDER_PAYMENT_SUMMARY: "payment-summary",
  CREATABLE_ORDER_DETAILS: "enrollment-product-details",
  CREATE_ORDER: "create-enrollment",
  CREATE_ORDER_BULK: "create-bulk-enrollment",
  CUSTOM_ROLE: "custom-roles",
  DEACTIVATE_COURSE_SHARING_CONTRACT: "deactivate-course-sharing-contracts",
  DEACTIVATE_MFA: "mfa/deactivate",
  DEACTIVATE_STORE_COURSE: "deactivate-store-courses",
  DELETE_CERTIFICATE_COURSE: "delete-certificate-courses",
  DELETE_COMPANY: "delete-store-companies",
  DELETE_CONTACT_GROUP_PROFILE: "delete-contact-group-profiles",
  DELETE_COUPON: "delete-coupons",
  DELETE_DISCOUNT_PROGRAM: "delete-discount-programs",
  DELETE_DISCOUNT_RULE: "delete-discount-rules",
  DELETE_MEMBERSHIP_PROGRAM: "delete-membership-programs",
  DELETE_MEMBERSHIP_PROGRAM_DISCOUNT: "delete-membership-program-discounts",
  DELETE_MEMBERSHIP_PROGRAM_PARTICIPANT: "delete-membership-program-participants",
  DELETE_PAYMENT_QUESTION: "delete-payment-questions",
  DELETE_PROFILE_LINK: "unlink-profile",
  DELETE_PROFILE_QUESTION: "delete-profile-questions",
  DELETE_QUESTION: "delete-question-banks",
  DELETE_REGISTRATION_QUESTION: "delete-registration-questions",
  DELETE_RELATED_PRODUCT: "delete-related-products",
  DELETE_SECTION_SCHEDULE: "delete-section-schedules",
  DELETE_STORE_FEATURED_CAREER: "delete-store-featured-careers",
  DELETE_STORE_IDENTITY_PROVIDER: "delete-store-identity-providers",
  DELETE_STORE_PAYMENT_GATEWAY: "delete-store-payment-gateways",
  DELETE_STUDENT: "delete-profile",
  DELETE_TRANSACTION_BATCH: "delete-transaction-batches",
  DISCOUNT_PROGRAM: "discount-programs",
  DISCOUNT_PROGRAM_USAGE_HISTORY: "discount-program-usage",
  DISCOUNT_RULE: "discount-rules",
  DOWNLOAD_TRANSACTION_BATCH: "download-transaction-batch",
  ERP_LOG: "erp-logs",
  EXTERNAL_ENTITY: "external-entities",
  FAILED_MQ: "failed-messages",
  GENERATE_SECRET_KEY: "generate-secret-key",
  GLOBAL_CONFIGURATION: "global-configurations",
  IDENTITY_PROVIDER: "identity-providers",
  IMPORT_TASK: "import-tasks",
  INSTRUCTOR: "instructors",
  LOGIN: "api/token",
  MEMBERSHIP_PROGRAM: "membership-programs",
  MEMBERSHIP_PROGRAM_DISCOUNT: "membership-program-discounts",
  MEMBERSHIP_PROGRAM_PARTICIPANT: "membership-program-participants",
  ORGANIZATION: "organizations",
  ORGANIZATION_TYPE: "organization-types",
  PARTICIPANT_BY_MEMBERSHIP_PROGRAM: "participants-by-membership-program",
  PAYMENT: "payments",
  PAYMENT_LOG: "payment-logs",
  PAYMENT_GATEWAY: "payment-gateways",
  PAYMENT_GATEWAY_CONFIG: "payment-gateway-configs",
  PAYMENT_QUESTION: "payment-questions",
  PRODUCT: "products",
  PROFILE_LINK: "profile-links",
  PROFILE_QUESTION: "profile-questions",
  QUESTION: "question-bank",
  QUIZ_RESULT: "quiz-result",
  REFUND: "refunds",
  REGISTRATION_QUESTION: "registration-questions",
  RELATED_PRODUCT: "related-products",
  REMOVE_ENROLLMENT: "remove-enrollment",
  REMOVE_SEAT_REGISTRATION: "remove-seat-registration",
  REQUEUE_IMPORT: "import-requeue",
  REQUEUE_FAILED_MQ: "message-requeue",
  RESET_PASSWORD: "password/reset-by-admin",
  RETRY_REFUND: "retry-refund",
  ROLE: "roles",
  SEAT: "seat-reservations",
  SEAT_BLOCK: "seat-block-reservations",
  SEAT_HISTORY: "seat-reservation-histories",
  SEAT_REGISTRATION: "seat-registrations",
  SEAT_TOKEN: "seat-reservation-token-generations",
  SECTION: "sections",
  SECTION_SCHEDULE: "schedules",
  SKILL: "skills",
  STORE: "stores",
  STORE_CERTIFICATE: "store-certificates",
  STORE_CERTIFICATE_SUBJECT: "certificate-catalogs",
  STORE_CERTIFICATE_RETRIEVE: "combined-store-certificate",
  STORE_CERTIFICATE_READY_RETRIEVE: "combined-certificate",
  STORE_CONFIGURATION: "store-configurations",
  STORE_COURSE: "store-courses",
  STORE_COURSE_SUBJECT: "course-catalogs",
  STORE_COURSE_SUBJECT_TAGGING: "course-catalog-tagging",
  STORE_COURSE_RETRIEVE: "combined-store-course",
  STORE_COURSE_READY_RETRIEVE: "combined-course",
  STORE_DOMAIN_CONFIGURATION: "store-domain-configurations",
  STORE_FEATURED_CAREER: "store-featured-careers",
  STORE_IDENTITY_PROVIDER: "store-identity-providers",
  STORE_PAYMENT_GATEWAY: "store-payment-gateways",
  STORE_UPDATE: "store-updates",
  STORE_USER: "store-users",
  STUDENT: "profiles",
  STUDENT_ACTIVITY: "user-activities",
  STUDENT_PERSONA: "profile-persona",
  STUDENT_PROFILE: "student-profiles",
  STUDENT_SAVED_CAREER: "profile-careers",
  SUBJECT: "catalogs",
  SWAP_ENROLLMENT: "swap-enrollment",
  SWAP_SEAT_REGISTRATION: "swap-seat-registration",
  TAGGED_CERTIFICATE_CAREER: "tagged-certificate-careers",
  TAGGED_CERTIFICATE_CAREER_AND_SKILL: "tagged-certificate-careers-skills",
  TAGGED_CERTIFICATE_SKILL: "tagged-certificate-skills",
  TAGGED_COURSE_CAREER: "tagged-course-careers",
  TAGGED_COURSE_CAREER_AND_SKILL: "tagged-course-careers-skills",
  TAGGED_COURSE_SKILL: "tagged-course-skills",
  TRANSACTION: "transactions",
  TRANSACTION_BATCH: "transaction-batches",
  TRANSACTION_REPORT: "transaction-report",
  UPDATE_ENROLLMENT_APPROVAL_STATUS: "update-enrollment-approval-status",
  UPDATE_PAYMENT_QUESTION: "update-payment-questions",
  UPDATE_PROFILE_QUESTION: "update-profile-questions",
  UPDATE_REGISTRATION_QUESTION: "update-registration-questions",
  USER: "users",
  USER_PREFERENCE: "user-preferences",
  USER_TABLE_CONFIGURATION: "user-table-configurations",

  // for miscellaneous, non-paginated
  ALL_AUDIT_TRAIL: "user-audit-trails?limit=1000",
  ALL_CAMPUS: "course-provider-sites?limit=1000",
  ALL_CAREER: "careers?limit=1000",
  ALL_CART: "carts?limit=1000",
  ALL_CART_ITEM_DISCOUNT: "cart-item-discounts?limit=1000",
  ALL_CART_ITEM_PROFILE: "cart-item-profiles?limit=1000",
  ALL_CERTIFICATE: "certificates?limit=1000",
  ALL_COMPANY: "store-companies?limit=1000",
  ALL_COMPANY_CUSTOM_ROLE: "company-custom-roles?limit=1000",
  ALL_COMPANY_USER: "company-users?limit=1000",
  ALL_CONTACT: "contacts?limit=1000",
  ALL_CONTACT_GROUP: "contact-groups?limit=1000",
  ALL_CONTACT_GROUP_PROFILE: "contact-group-profiles?limit=1000",
  ALL_COUPON: "coupons?limit=1000",
  ALL_COURSE: "courses?limit=1000",
  ALL_COURSE_ENROLLMENT: "course-enrollments?limit=1000",
  ALL_COURSE_BY_SUBJECT: "courses-by-catalog?limit=1000",
  ALL_COURSE_PROVIDER: "course-providers?limit=1000",
  ALL_COURSE_PUBLISHING_STORE: "course-publishing-stores?limit=1000",
  ALL_COURSE_SHARING_CONTRACT: "course-sharing-contracts?limit=1000",
  ALL_COURSE_SHARING_CONTRACT_COURSE: "course-sharing-contract-courses?limit=1000",
  ALL_CUSTOM_ROLE: "custom-roles?limit=1000",
  ALL_DISCOUNT_PROGRAM: "discount-programs?limit=1000",
  ALL_DISCOUNT_PROGRAM_USAGE_HISTORY: "discount-program-usage?limit=1000",
  ALL_DISCOUNT_RULE: "discount-rules?limit=1000",
  ALL_ERP_LOG: "erp-logs?limit=1000",
  ALL_EXTERNAL_ENTITY: "external-entities?limit=1000",
  ALL_GLOBAL_CONFIGURATION: "global-configurations?limit=1000",
  ALL_IDENTITY_PROVIDER: "identity-providers?limit=1000",
  ALL_IMPORT_TASK: "import-tasks?limit=1000",
  ALL_INSTRUCTOR: "instructors?limit=1000",
  ALL_MEMBERSHIP_PROGRAM: "membership-programs?limit=1000",
  ALL_MEMBERSHIP_PROGRAM_DISCOUNT: "membership-program-discounts?limit=1000",
  ALL_MEMBERSHIP_PROGRAM_PARTICIPANT: "membership-program-participants?limit=1000",
  ALL_ORGANIZATION: "organizations?limit=1000",
  ALL_ORGANIZATION_TYPE: "organization-types?limit=1000",
  ALL_PAYMENT: "payments?limit=1000",
  ALL_PAYMENT_GATEWAY: "payment-gateways?limit=1000",
  ALL_PAYMENT_GATEWAY_CONFIG: "payment-gateway-configs?limit=1000",
  ALL_PAYMENT_QUESTION: "payment-questions?limit=1000",
  ALL_PROFILE_QUESTION: "profile-questions?limit=1000",
  ALL_QUESTION: "question-bank?limit=1000",
  ALL_REGISTRATION_QUESTION: "registration-questions?limit=1000",
  ALL_RELATED_PRODUCT: "related-products?limit=1000",
  ALL_PAYMENT_LOG: "payment-logs?limit=1000",
  ALL_PERMISSION: "permissions?limit=1000",
  ALL_PRODUCT: "products?limit=1000",
  ALL_REFUND: "refunds?limit=1000",
  ALL_ROLE: "roles?limit=1000",
  ALL_SEAT: "seat-reservations?limit=1000",
  ALL_SEAT_BLOCK: "seat-block-reservations?limit=1000",
  ALL_SEAT_HISTORY: "seat-reservation-histories?limit=1000",
  ALL_SECTION: "sections?limit=1000",
  ALL_SECTION_SCHEDULE: "schedules?limit=1000",
  ALL_STORE: "stores?limit=1000",
  ALL_STORE_CERTIFICATE: "store-certificates?limit=1000",
  ALL_STORE_CONFIGURATION: "store-configurations?limit=1000",
  ALL_STORE_COURSE: "store-courses?limit=1000",
  ALL_STORE_COURSE_SUBJECT: "course-catalogs?limit=1000",
  ALL_STORE_DOMAIN_CONFIGURATION: "store-domain-configurations?limit=1000",
  ALL_STORE_IDENTITY_PROVIDER: "store-identity-providers?limit=1000",
  ALL_STORE_PAYMENT_GATEWAY: "store-payment-gateways?limit=1000",
  ALL_STUDENT: "profiles?limit=1000",
  ALL_SUBJECT: "catalogs?limit=1000",
  ALL_TRANSACTION: "transactions?limit=1000",
  ALL_TRANSACTION_BATCH: "transaction-batches?limit=1000",
  ALL_TRANSACTION_REPORT: "transaction-report?limit=1000",
  ALL_USER: "users?limit=1000"
}
