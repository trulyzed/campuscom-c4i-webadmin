import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderDateTime } from "~/packages/components/ResponsiveTable"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { message, Tag } from "antd"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StoreDomainConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/StoreDomainConfigurations"
import { getStoreDomainConfigurationFormMeta } from "~/Component/Feature/Stores/FormMeta/DomainConfigurationFormMeta"
import { convertToString } from "~/packages/utils/mapper"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"

export const renderStoreDomainConfigurationStatus = (status: string, duration: number): JSX.Element | string => {
  return status ? <Tag color={status === 'danger' ? '#f50' : status === 'warning' ? '#d46b08' : '#87d068'}>{duration} day(s) remaining</Tag> : ''
}

export const getStoreDomainConfigurationDetailsMeta = (storeDomainConfiguration: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StoreDomainConfigurationQueries.update({ ...data, params: { id: storeDomainConfiguration.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
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
  ]

  return {
    pageTitle: `Domain Configuration Title - ${storeDomainConfiguration.domain}`,
    tabs: tabMetas
  }
}
