import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { getCartItemListTableColumns } from "~/TableSearchMeta/CartItem/CartItemListTableColumns"

export const getOrderDetailsMeta = (order: { [key: string]: any }): IDetailsMeta => {
  const basicInfo: CardContainer = {
    title: `Order: ${order.order_ref}`,
    contents: [
      { label: 'Store', value: order.store, render: (text: any) => text.name },
      { label: 'Student', value: order.profile, render: (text: any) => `${text.first_name} ${text.last_name}` },
      { label: 'Enrollment Date', value: order.datetime },
      { label: 'Status', value: order.cart_status },
      { label: 'Extended amount', value: order.gross_amount },
      { label: 'Discount amount', value: order.total_discount },
      { label: 'Tax amount', value: order.tax_amount },
    ]
  }

  const purchaserInfo: CardContainer = {
    title: 'Purchaser',
    contents: [
      { label: 'First Name', value: order.purchaser_info.first_name, },
      { label: 'Last Name', value: order.purchaser_info.last_name, },
      { label: 'Email', value: order.purchaser_info.primary_email },
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [basicInfo, purchaserInfo]
  }

  const tabMetas: IDetailsTabMeta[] = [
    {
      tabTitle: "Summary",
      tabType: "summary",
      tabMeta: summaryMeta,
      helpKey: "orderSummaryTab"
    },
    {
      tabTitle: "Invoice",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          ...getCartItemListTableColumns(order.id),
          searchParams: { id: order.id },
          refreshEventName: "REFRESH_DISABILITES_TAB",
        }
      },
      helpKey: "invoiceTab"
    },
  ]

  return {
    pageTitle: `Order Title - ${order.order_ref}`,
    tabs: tabMetas
  }
}
