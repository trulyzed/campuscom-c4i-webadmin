import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"
import { getCourseSharingContractListTableColumns } from "~/TableSearchMeta/CourseSharingContract/CourseSharingContractListTableColumns"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserQueries } from "~/packages/services/Api/Queries/AdminQueries/Users"
import { renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { StoreFormMeta } from "~/Component/Feature/Stores/FormMeta/StoreFormMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { IdentityProviderTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/IdentityProviderTaggingFormMeta"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"

export const getStoreDetailsMeta = (store: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StoreQueries.update({ ...data, params: { id: store.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [StoreQueries.update])

  const addIdentityProvider = QueryConstructor(((data) => StoreQueries.tagIdentityProvider({ ...data, data: { ...data?.data, store: store.id } }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
    }
    return resp
  })), [StoreQueries.tagIdentityProvider])

  const summaryInfo: CardContainer = {
    title: `Store: ${store.name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Store`}
        formMeta={StoreFormMeta}
        formSubmitApi={updateEntity}
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
      tabTitle: "Identity Providers",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            ...getIdentityProviderListTableColumns().columns,
            {
              title: "Action",
              dataIndex: "store_identity_provider_id",
              render: (text) => (
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_STORE_IDENTITY_PROVIDER_TAB"
                  onClickRemove={() => StoreQueries.untagIdentityProvider({ data: { ids: [text] } })}
                />
              )
            },
          ],
          searchFunc: IdentityProviderQueries.getListByStore,
          searchParams: { store__id: store.id },
          refreshEventName: "REFRESH_STORE_IDENTITY_PROVIDER_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Identity Provider`}
              formMeta={IdentityProviderTaggingFormMeta}
              formSubmitApi={addIdentityProvider}
              buttonLabel={`Add Identity Provider`}
              iconType="create"
              refreshEventName={'REFRESH_STORE_IDENTITY_PROVIDER_TAB'}
            />
          ]
        }
      },
      helpKey: "identityProviderTab"
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
          ...getUserListTableColumns(),
          searchParams: { store_id: store.id },
          searchFunc: UserQueries.getListByStore,
          refreshEventName: "REFRESH_COURSE_STORE_USER_TAB",
        }
      },
      helpKey: "storeUserTab"
    },
  ]

  return {
    pageTitle: `Store Title - ${store.name}`,
    tabs: tabMetas
  }
}
