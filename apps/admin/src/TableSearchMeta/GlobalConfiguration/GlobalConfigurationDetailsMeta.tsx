import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { GlobalConfigurationFormMeta } from "~/Component/Feature/GlobalConfigurations/FormMeta/GlobalConfigurationFormMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { GlobalConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/GlobalConfigurations"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getGlobalConfigurationDetailsMeta = (globalConfiguration: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => GlobalConfigurationQueries.update({ ...data, params: { id: globalConfiguration.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [GlobalConfigurationQueries.update])

  const summaryInfo: CardContainer = {
    title: `Global Configuration: ${globalConfiguration.label}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Global Configuration`}
        formMeta={GlobalConfigurationFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...globalConfiguration, configuration: JSON.stringify(globalConfiguration.configuration) }}
        defaultFormValue={{ globalConfigurationId: globalConfiguration.id }}
        buttonLabel={`Update Global Configuration`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Label', value: globalConfiguration.label, },
      { label: 'Configuration', value: globalConfiguration.configuration, render: renderJson },
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
      helpKey: "globalConfigurationSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: globalConfiguration.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Global Configuration Title - ${globalConfiguration.label}`,
    tabs: tabMetas
  }
}
