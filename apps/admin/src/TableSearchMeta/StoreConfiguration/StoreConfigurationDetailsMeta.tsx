import { notification } from "antd"
import { CardContainer, IDetailsSummary, CardContents } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink, renderBoolean } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderJson } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { StoreConfigQueries } from "@packages/services/lib/Api/Queries/AdminQueries/StoreConfigs"
import { getConfigurationTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ConfigurationTaggingFormMeta"
import { PopoverSummaryTable } from "@packages/components/lib/Popover/PopoverSummaryTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"


export const getStoreConfigurationDetailsMeta = (storeConfiguration: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => StoreQueries.updateConfiguration({ ...data, params: { id: storeConfiguration.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [StoreQueries.updateConfiguration])

  const getStoreConfigurationContent = (): CardContents[] => {
    switch (storeConfiguration.entity_name) {
      case "Email Receipt":
        return [
          {
            label: 'Header',
            value: storeConfiguration.config__email_receipt__header
          },
          {
            label: 'Footer',
            value: storeConfiguration.config__email_receipt__footer
          },
          {
            label: 'Email Receipt',
            value: storeConfiguration.config__email_receipt__email_receipt,
            render: renderBoolean
          },
        ]
      case "Checkout Configuration":
        return [
          {
            label: 'Enable Purchase for Myself',
            value: storeConfiguration.config__checkout__enable_purchase_for_myself,
            render: renderBoolean
          },
          {
            label: 'Enable Purchase for Friends and Family',
            value: storeConfiguration.config__checkout__enable_purchase_for_friends_and_family,
            render: renderBoolean
          },
          {
            label: 'Enable Purchase for Both',
            value: storeConfiguration.config__checkout__enable_purchase_for_both,
            render: renderBoolean
          },
          {
            label: 'Enable Purchase for Company ',
            value: storeConfiguration.config__checkout__enable_purchase_for_company,
            render: renderBoolean
          },
          {
            label: 'Enable Profile Question',
            value: storeConfiguration.config__checkout__enable_profile_questions,
            render: renderBoolean
          },
          {
            label: 'Enable Registration Question',
            value: storeConfiguration.config__checkout__enable_registration_questions,
            render: renderBoolean
          },
          {
            label: 'Enable Standalone Product Checkout',
            value: storeConfiguration.config__checkout__enable_standalone_product_checkout,
            render: renderBoolean
          },
          {
            label: 'Enable Registration Product Checkout',
            value: storeConfiguration.config__checkout__enable_registration_product_checkout,
            render: renderBoolean
          },
          {
            label: 'Enable Multiple Product Checkout',
            value: storeConfiguration.config__checkout__enable_multiple_products_checkout,
            render: renderBoolean
          },
          {
            label: 'Enable Enrollment for Multiple Students',
            value: storeConfiguration.config__checkout__enable_enrollment_for_multiple_students,
            render: renderBoolean
          },
        ]
      case "Checkout Status Configuration":
        return [
          {
            label: 'Success Redirect Text',
            value: storeConfiguration.config__checkout_status__success_redirect_text,
          },
          {
            label: 'Success Redirect URL',
            value: storeConfiguration.config__checkout_status__success_redirect_url
          },
          {
            label: 'Failure Redirect Text',
            value: storeConfiguration.config__checkout_status__failure_redirect_text,
          },
          {
            label: 'Failure Redirect URL',
            value: storeConfiguration.config__checkout_status__failure_redirect_url
          },
        ]
      default:
        return [{ label: 'Configuration', value: storeConfiguration.configuration, render: renderJson }]
    }
  }

  const summaryInfo: CardContainer = {
    title: `Store Configuration: ${storeConfiguration.entity_name}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Store Configuration`}
        formMeta={getConfigurationTaggingFormMeta(storeConfiguration)}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...storeConfiguration, external_entity: storeConfiguration.entity_name }}
        defaultFormValue={{ storeConfigurationId: storeConfiguration.id }}
        buttonLabel={`Update Store Configuration`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Store Configuration"
        type="delete"
        queryService={QueryConstructor(() => StoreConfigQueries.delete({ data: { id: [storeConfiguration.id] } }), [StoreConfigQueries.delete])}
        redirectTo={`/administration/store/${storeConfiguration.store.id}?activeTabKey=6-1`}
      />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${storeConfiguration.store.id}`, storeConfiguration.store.name), },
      { label: 'Entity Type', value: storeConfiguration.entity_type },
      { label: 'Entity Name', value: storeConfiguration.entity_name },
      {
        label: 'Configuration', render: () => (
          <PopoverSummaryTable card={{
            title: 'Configuration',
            contents: getStoreConfigurationContent()
          }} />
        ),
      },
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
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: storeConfiguration.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Store Configuration Title - ${storeConfiguration.entity_name}`,
    tabs: tabMetas
  }
}

