import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderJson } from "~/packages/components/ResponsiveTable/tableUtils"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { StoreConfigQueries } from "~/packages/services/Api/Queries/AdminQueries/StoreConfigs"
import { ConfigurationTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ConfigurationTaggingFormMeta"


export const getStoreConfigurationDetailsMeta = (storeConfiguration: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StoreQueries.updateConfiguration({ ...data, params: { id: storeConfiguration.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [StoreQueries.updateConfiguration])

  const summaryInfo: CardContainer = {
    title: `Store Configuration: ${storeConfiguration.entity_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Store Configuration`}
        formMeta={ConfigurationTaggingFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...storeConfiguration, config_value: JSON.stringify(storeConfiguration.config_value || undefined) }}
        defaultFormValue={{ storeConfigurationId: storeConfiguration.id }}
        buttonLabel={`Update Store Configuration`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <IconButton
        toolTip="Delete Store Configuration"
        iconType="remove"
        onClickRemove={() => StoreConfigQueries.delete({ data: { id: [storeConfiguration.id] } })}
        redirectTo={`/administration/store/${storeConfiguration.store.id}?activeTabKey=6-1`}
      />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${storeConfiguration.store.id}`, storeConfiguration.store.name), },
      { label: 'Entity Type', value: storeConfiguration.entity_type },
      { label: 'Entity Name', value: storeConfiguration.entity_name },
      { label: 'Configuration Value', value: storeConfiguration.config_value, render: renderJson },
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
      helpKey: "storeConfigurationSummaryTab"
    },
  ]

  return {
    pageTitle: `Store Configuration Title - ${storeConfiguration.entity_name}`,
    tabs: tabMetas
  }
}

