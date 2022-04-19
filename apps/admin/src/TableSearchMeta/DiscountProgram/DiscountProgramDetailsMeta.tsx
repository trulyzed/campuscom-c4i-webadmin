import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { DiscountProgramQueries } from "~/packages/services/Api/Queries/AdminQueries/DiscountPrograms"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { DiscountProgramFormMeta } from "~/Component/Feature/DiscountPrograms/FormMeta/DiscountProgramFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderBoolean, renderDateTime, renderLink } from "~/packages/components/ResponsiveTable"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { getProductListTableColumns } from "~/TableSearchMeta/Product/ProductListTableColumns"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { getDiscountProgramUsageHistoryListTableColumns } from "~/TableSearchMeta/DiscountProgramUsageHistory/DiscountProgramUsageHistoryListTableColumns"

export const getDiscountProgramDetailsMeta = (discountProgram: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => DiscountProgramQueries.update({ ...data, params: { id: discountProgram.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [DiscountProgramQueries.update])

  const summaryInfo: CardContainer = {
    title: `Discount Program: ${discountProgram.title}`,
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Discount Program`}
        formMeta={DiscountProgramFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...discountProgram, store: discountProgram.store.id }}
        defaultFormValue={{ discountProgramId: discountProgram.id }}
        buttonLabel={`Update Discount Program`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      <IconButton
        toolTip="Delete Discount Program"
        iconType="remove"
        redirectTo="/administration/discount-program"
        onClickRemove={() => DiscountProgramQueries.delete({ data: { ids: [discountProgram.id] } })}
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
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_PRODUCT_TAB"
                  onClickRemove={() => DiscountProgramQueries.untagProduct({ data: { discount_program: discountProgram.id, products: [text] } })}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getList,
          searchParams: { discount_program: discountProgram.id },
          refreshEventName: "REFRESH_PRODUCT_TAB",
          actions: [
            // <MetaDrivenFormModalOpenButton
            //   formTitle={`Add Identity Provider`}
            //   formMeta={IdentityProviderTaggingFormMeta}
            //   formSubmitApi={addIdentityProvider}
            //   buttonLabel={`Add Identity Provider`}
            //   iconType="create"
            //   refreshEventName={'REFRESH_STORE_IDENTITY_PROVIDER_TAB'}
            // />
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
  ]

  return {
    pageTitle: `Discount Program Title - ${discountProgram.title}`,
    tabs: tabMetas
  }
}
