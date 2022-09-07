import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderDateTime } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { notification, Tag } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StoreDomainConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/StoreDomainConfigurations"
import { getStoreDomainConfigurationFormMeta } from "~/Component/Feature/Stores/FormMeta/DomainConfigurationFormMeta"
import { convertToString } from "@packages/utilities/lib/mapper"
import { renderJson } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const renderStoreDomainConfigurationStatus = (status: string, duration: number): JSX.Element | string => {
  return status && (duration === 0 || duration) ? <Tag color={status === 'danger' ? '#f50' : status === 'warning' ? '#d46b08' : '#87d068'}>{duration} day(s) remaining</Tag> : ''
}

export const getStoreDomainConfigurationDetailsMeta = (storeDomainConfiguration: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StoreDomainConfigurationQueries.update({ ...data, params: { id: storeDomainConfiguration.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreDomainConfigurationQueries.update])

  const summaryInfo: CardContainer = {
    title: `Domain Configuration: ${storeDomainConfiguration.domain}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Domain Configuration`}
        formMeta={getStoreDomainConfigurationFormMeta(storeDomainConfiguration)}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...storeDomainConfiguration, config: convertToString(storeDomainConfiguration.config) }}
        buttonLabel={`Update Domain Configuration`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Domain', value: storeDomainConfiguration.domain, },
      { label: 'Certificate Upload Date', value: storeDomainConfiguration.upload_at, render: renderDateTime },
      { label: 'Certificate Expires On', value: storeDomainConfiguration.expiry_at, render: renderDateTime },
      { label: 'Config', value: storeDomainConfiguration.config, render: renderJson },
      { label: 'Note', value: storeDomainConfiguration.note, },
      { label: 'Expiry Status', value: storeDomainConfiguration.expiry_status, render: (text: any) => renderStoreDomainConfigurationStatus(text, storeDomainConfiguration.expiry_days) },
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
      helpKey: "storeDomainConfigurationSummaryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: storeDomainConfiguration.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Domain Configuration Title - ${storeDomainConfiguration.domain}`,
    tabs: tabMetas
  }
}
