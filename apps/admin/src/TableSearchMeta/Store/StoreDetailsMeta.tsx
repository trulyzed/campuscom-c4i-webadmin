import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { getIdentityProviderListTableColumns } from "~/TableSearchMeta/IdentityProvider/IdentityProviderListTableColumns"
import { IdentityProviderQueries } from "~/packages/services/Api/Queries/AdminQueries/IdentityProviders"
import { getCourseSharingContractListTableColumns } from "~/TableSearchMeta/CourseSharingContract/CourseSharingContractListTableColumns"
import { getUserListTableColumns } from "~/TableSearchMeta/User/UserListTableColumns"
import { UserQueries } from "~/packages/services/Api/Queries/AdminQueries/Users"

export const getStoreDetailsMeta = (store: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `Store: ${store.name}`,
    contents: [
      { label: 'Name', value: store.name, render: (text: any) => text },
      { label: 'URL slug', value: store.url_slug },
      { label: 'Store URL', value: renderLink(`${process.env.REACT_APP_STOREFRONT_URL}/${store.url_slug}`, store.url_slug, false, true) },
      { label: 'GTM ID', value: store.gtm_id },
      { label: 'Logo', value: store.store_logo_uri },
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
          ...getIdentityProviderListTableColumns(),
          searchFunc: IdentityProviderQueries.getListByStore,
          searchParams: { store__id: store.id },
          refreshEventName: "REFRESH_IDENTITY_PROVIDER_TAB",
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
