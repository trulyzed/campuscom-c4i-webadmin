import { notification } from "antd"
import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"
import { CREATE_SUCCESSFULLY, UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getDiscountProgramFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/DiscountProgramFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderBoolean, renderDateTime, renderLink } from "@packages/components/lib/ResponsiveTable"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { getDiscountProgramUsageHistoryListTableColumns } from "~/TableSearchMeta/DiscountProgramUsageHistory/DiscountProgramUsageHistoryListTableColumns"
import { getProductTaggingFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/ProductTaggingFormMeta"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getDiscountProgramDetailsMeta = (discountProgram: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => DiscountProgramQueries.update({ ...data, params: { id: discountProgram.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: UPDATE_SUCCESSFULLY })
    }
    return resp
  })), [DiscountProgramQueries.update])

  const addProduct = QueryConstructor(((data) => DiscountProgramQueries.tagProduct({ ...data, data: { ...data?.data, discount_program: discountProgram.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
    }
    return resp
  })), [DiscountProgramQueries.tagProduct])

  const summaryInfo: CardContainer = {
    title: `Discount Program: ${discountProgram.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Discount Program`}
        formMeta={getDiscountProgramFormMeta()}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...discountProgram, store: discountProgram.store.id }}
        defaultFormValue={{ discountProgramId: discountProgram.id }}
        buttonLabel={`Update Discount Program`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <ContextAction
        tooltip="Delete Discount Program"
        type="delete"
        redirectTo="/administration/discount-program"
        queryService={QueryConstructor(() => DiscountProgramQueries.delete({ data: { ids: [discountProgram.id] } }), [DiscountProgramQueries.delete])}
      />
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ],
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${discountProgram.store.id}`, discountProgram.store.name) },
      { label: 'Title', value: discountProgram.title },
      { label: 'Discount Amount', value: discountProgram.discount_amount },
      { label: 'Type', value: discountProgram.type },
      { label: 'Code', value: discountProgram.code },
      { label: 'Max Limit', value: discountProgram.max_limit },
      { label: 'Usage Limit', value: discountProgram.usage_limit },
      { label: 'Profile Usage Limit', value: discountProgram.profile_usage_limit, },
      { label: 'Start Date', value: discountProgram.start_date, render: renderDateTime },
      { label: 'End Date', value: discountProgram.end_date, render: renderDateTime },
      { label: 'Is Stackable', value: discountProgram.is_stackable, render: renderBoolean },
      { label: 'Is Published', value: discountProgram.is_published, render: renderBoolean },
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
      helpKey: "discountProgramSummaryTab"
    },
    {
      tabTitle: "Products",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            ...getProductListTableColumns().columns,
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_PRODUCT_TAB"
                  queryService={QueryConstructor(() => DiscountProgramQueries.untagProduct({ data: { discount_program: discountProgram.id, products: [text] } }), [DiscountProgramQueries.untagProduct])}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getList,
          searchParams: { discount_program: discountProgram.id },
          refreshEventName: "REFRESH_PRODUCT_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Product`}
              formMeta={getProductTaggingFormMeta(discountProgram.id)}
              formSubmitApi={addProduct}
              buttonLabel={`Add Product`}
              refreshEventName={'REFRESH_PRODUCT_TAB'}
            />
          ]
        }
      },
      helpKey: "productTab"
    },
    {
      tabTitle: "Usage Histories",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getDiscountProgramUsageHistoryListTableColumns(),
          searchParams: { discount_program: discountProgram.id },
        }
      },
      helpKey: "discountProgramUsageHistoryTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: discountProgram.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Discount Program Title - ${discountProgram.title}`,
    tabs: tabMetas
  }
}
