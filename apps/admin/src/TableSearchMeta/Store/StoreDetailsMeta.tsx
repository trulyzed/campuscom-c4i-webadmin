import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { getCourseSharingContractListTableColumns } from "~/TableSearchMeta/CourseSharingContract/CourseSharingContractListTableColumns"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Users"
import { renderThumb } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getStoreFormMeta } from "~/Component/Feature/Stores/FormMeta/StoreFormMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { getStoreConfigurationListTableColumns } from "~/TableSearchMeta/StoreConfiguration/StoreConfigurationListTableColumns"
import { QuestionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Questions"
import { convertToString } from "@packages/utilities/lib/mapper"
import { CourseSharingContractFormMeta } from "~/Component/Feature/CourseSharingContracts/FormMeta/CourseSharingContractFormMeta"
import { CourseSharingContractQueries } from "@packages/services/lib/Api/Queries/AdminQueries/CourseSharingContracts"
import { UserFormMeta } from "~/Component/Feature/Users/FormMeta/UserFormMeta"
import { getConfigurationTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ConfigurationTaggingFormMeta"
import { getProfileQuestionTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ProfileQuestionTaggingFormMeta"
import { getPaymentQuestionTaggingFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/PaymentQuestionTaggingFormMeta"
import { getStoreDomainConfigurationFormMeta } from "~/Component/Feature/Stores/FormMeta/DomainConfigurationFormMeta"
import { StoreDomainConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/StoreDomainConfigurations"
import { getStoreDomainConfigurationListTableColumns } from "~/TableSearchMeta/StoreDomainConfiguration/StoreDomainConfigurationListTableColumns"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { NavigateTo } from "@packages/components/lib/Actions/NavigateTo"

const hasEditPermission = checkAdminApiPermission(StoreQueries.update.__permissions)

export const getStoreDetailsMeta = (store: { [key: string]: any }): IDetailsMeta => {
  const update = QueryConstructor(((data) => StoreQueries[hasEditPermission ? "update" : "updateWithoutSlug"]({ ...data, params: { id: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [hasEditPermission ? StoreQueries.update : StoreQueries.updateWithoutSlug])

  const addCourseSharingContract = QueryConstructor(((data) => CourseSharingContractQueries.create({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [CourseSharingContractQueries.create])

  const addStoreConfiguration = QueryConstructor(((data) => StoreQueries.tagConfiguration({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreQueries.tagConfiguration])

  const addDomainConfiguration = QueryConstructor(((data) => StoreDomainConfigurationQueries.create({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreDomainConfigurationQueries.create])

  const addProfileQuestion = QueryConstructor(((data) => StoreQueries.tagProfileQuestion({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreQueries.tagProfileQuestion])

  const addPaymentQuestion = QueryConstructor(((data) => StoreQueries.tagPaymentQuestion({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreQueries.tagPaymentQuestion])

  const updateUser = (user: any) => QueryConstructor(((data) => UserQueries.update({ ...data, params: { id: user.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [UserQueries.update])

  const summaryInfo: CardContainer = {
    title: `Store: ${store.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Store`}
        formMeta={getStoreFormMeta(!hasEditPermission)}
        formSubmitApi={update}
        initialFormValue={{ ...store, }}
        defaultFormValue={{ storeId: store.id }}
        buttonLabel={`Update Store`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
    ],
    contents: [
      { label: 'Name', value: store.name, render: (text: any) => text },
      { label: 'URL slug', value: store.url_slug },
      { label: 'Store URL', value: renderLink(`${process.env.REACT_APP_STOREFRONT_URL}/${store.url_slug}`, store.url_slug, false, true) },
      { label: 'GTM ID', value: store.gtm_id },
      { label: 'Logo', value: renderThumb(store.store_logo_uri, "Store's logo") },
      { label: 'Template', value: renderLink(store.template, store.template, false, true) },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [summaryInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "storeSummaryTab"
    },
    {
      tabTitle: "Course Sharing Contracts",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getCourseSharingContractListTableColumns(),
          searchParams: { store__id: store.id },
          refreshEventName: "REFRESH_COURSE_SHARING_CONTRACT_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Course Sharing Contract`}
              formMeta={CourseSharingContractFormMeta}
              formSubmitApi={addCourseSharingContract}
              buttonLabel={`Add Course Sharing Contract`}
              refreshEventName={'REFRESH_COURSE_SHARING_CONTRACT_TAB'}
            />
          ],
        }
      },
      helpKey: "courseSharingContractTab"
    },
    {
      tabTitle: "Store Users",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            ...getUserListTableColumns().columns,
            {
              title: "Action",
              render: (text, record) => (
                <MetaDrivenFormModalOpenButton
                  formTitle={`Update User`}
                  formMeta={UserFormMeta.filter(i => i.fieldName !== "password")}
                  formSubmitApi={updateUser(record)}
                  initialFormValue={{ ...record, custom_roles: record.custom_roles.map((i: any) => i.id || i), }}
                  defaultFormValue={{ userId: record.id }}
                  buttonLabel={`Update User`}
                  iconType="edit"
                  refreshEventName={REFRESH_PAGE}
                />
              )
            },
          ],
          searchParams: { store_id: store.id },
          searchFunc: UserQueries.getListByStore,
          refreshEventName: "REFRESH_COURSE_STORE_USER_TAB",
          actions: [
            <NavigateTo type="create" name="Create User" path="/administration/user" apiPermission={UserQueries.create} />
          ]
        },
      },
      helpKey: "storeUserTab"
    },
    {
      tabTitle: "Configurations",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getStoreConfigurationListTableColumns(),
          searchParams: { store__id: store.id },
          refreshEventName: "REFRESH_CONFIGURATION_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Store Configuration`}
              formMeta={getConfigurationTaggingFormMeta()}
              formSubmitApi={addStoreConfiguration}
              buttonLabel={`Add Store Configuration`}
              refreshEventName={'REFRESH_CONFIGURATION_TAB'}
            />
          ]
        }
      },
      helpKey: "configurationTab"
    },
    {
      tabTitle: "Domain Configurations",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getStoreDomainConfigurationListTableColumns(),
          searchParams: { store__id: store.id },
          refreshEventName: "REFRESH_DOMAIN_CONFIGURATION_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Domain Configuration`}
              formMeta={getStoreDomainConfigurationFormMeta()}
              formSubmitApi={addDomainConfiguration}
              buttonLabel={`Create Domain Configuration`}
              iconType="create"
              refreshEventName={'REFRESH_DOMAIN_CONFIGURATION_TAB'}
            />
          ]
        }
      },
      helpKey: "domainConfigurationTab"
    },
    {
      tabTitle: "Profile Questions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Title",
              dataIndex: "title",
              render: (text: any, record: any) => renderLink(`/administration/question/${record.question_bank}`, convertToString(text, true)),
              sorter: (a: any, b: any) => a.title - b.title
            },
            {
              title: "Type",
              dataIndex: 'question_type',
              sorter: (a: any, b: any) => a.question_type - b.question_type
            },
            {
              title: "Respondent Type",
              dataIndex: 'respondent_type',
              sorter: (a: any, b: any) => a.respondent_type - b.respondent_type
            },
            {
              title: "Action",
              dataIndex: "action",
              render: (_, record: any) => (
                <ContextAction
                  type="delete"
                  tooltip="Delete Profile Question"
                  queryService={QueryConstructor(() => QuestionQueries.untagProfileQuestion({ data: { ids: [record.id] } }), [QuestionQueries.untagProfileQuestion])}
                  refreshEventName="REFRESH_PAGE"
                />
              )
            }
          ],
          searchParams: { provider_ref: store.id, },
          searchFunc: QuestionQueries.getProfileQuestionListByStore,
          refreshEventName: "REFRESH_PROFILE_QUESTION_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Profile Question`}
              formMeta={getProfileQuestionTaggingFormMeta(store.id)}
              formSubmitApi={addProfileQuestion}
              buttonLabel={`Add Profile Question`}
              refreshEventName={'REFRESH_PROFILE_QUESTION_TAB'}
            />
          ]
        }
      },
      helpKey: "profileQuestionTab"
    },
    {
      tabTitle: "Payment Questions",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: "Title",
              dataIndex: "title",
              render: (text: any, record: any) => renderLink(`/administration/question/${record.question_bank}`, convertToString(text, true)),
              sorter: (a: any, b: any) => a.title - b.title
            },
            {
              title: "Type",
              dataIndex: 'question_type',
              sorter: (a: any, b: any) => a.question_type - b.question_type
            },
            {
              title: "Action",
              dataIndex: "action",
              render: (_, record: any) => (
                <ContextAction
                  type="delete"
                  tooltip="Delete Payment Question"
                  queryService={QueryConstructor(() => QuestionQueries.untagPaymentQuestion({ data: { ids: [record.id] } }), [QuestionQueries.untagPaymentQuestion])}
                  refreshEventName="REFRESH_PAGE"
                />
              )
            }
          ],
          searchParams: { store: store.id, },
          searchFunc: QuestionQueries.getPaymentQuestionListByStore,
          refreshEventName: "REFRESH_PAYMENT_QUESTION_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Payment Question`}
              formMeta={getPaymentQuestionTaggingFormMeta(store.id)}
              formSubmitApi={addPaymentQuestion}
              buttonLabel={`Add Payment Question`}
              refreshEventName={'REFRESH_PAYMENT_QUESTION_TAB'}
            />
          ]
        }
      },
      helpKey: "paymentQuestionTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: store.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Store Title - ${store.name}`,
    tabs: tabMetas
  }
}
