import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"

export const getCartItemDetailsMeta = (cartItem: { [key: string]: any }): IDetailsMeta => {
  const summaryInfo: CardContainer = {
    title: `CartItem: ${cartItem.product.title}`,
    contents: [
      { label: 'Order', value: renderLink(`/storefront-data/order/${cartItem.cart.id}`, cartItem.cart.order_ref) },
      { label: 'Product', value: renderLink(`/store/product/${cartItem.product.id}`, cartItem.product.title) },
      { label: 'Related To', value: cartItem.parent_product ? renderLink(`/store/product/${cartItem.parent_product.id}`, cartItem.parent_product.title) : undefined },
      { label: 'Quantity', value: cartItem.quantity },
      { label: 'Unit Price', value: cartItem.unit_price },
      { label: 'Extended Amount', value: cartItem.extended_amount },
      { label: 'Discount Amount', value: cartItem.discount_amount },
      { label: 'Sales Tax', value: cartItem.sales_tax },
      { label: 'Total Amount', value: cartItem.total_amount },
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
      helpKey: "cartItemSummaryTab"
    },
  ]

  return {
    pageTitle: `Cart Item Title - ${cartItem.product.title}`,
    tabs: tabMetas
  }
}
