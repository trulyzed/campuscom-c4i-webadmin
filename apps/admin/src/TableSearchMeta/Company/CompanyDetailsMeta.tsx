import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { CompanyQueries } from "~/packages/services/Api/Queries/AdminQueries/Companies"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CompanyFormMeta } from "~/Component/Feature/Companies/FormMeta/CompanyFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getCompanyDetailsMeta = (company: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => CompanyQueries.update({ ...data, params: { id: company.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [CompanyQueries.update])

  const summaryInfo: CardContainer = {
    title: `Company: ${company.company_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Company`}
        formMeta={CompanyFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...company, store: company.store.id }}
        buttonLabel={`Update Company`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <IconButton
        toolTip="Delete Company"
        iconType="remove"
        redirectTo="/administration/company"
        onClickRemove={() => CompanyQueries.delete({ data: { ids: [company.id] } })}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${company.store.id}`, company.store.name) },
      { label: 'Company', value: company.company_name },
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
      helpKey: "companySummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: company.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Company Title - ${company.company_name}`,
    tabs: tabMetas
  }
}
