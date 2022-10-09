import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { DiscountProgramQueries } from "@packages/services/lib/Api/Queries/AdminQueries/DiscountPrograms"
import { StudentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Students"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

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
    {
      tabTitle: "Discounts",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: 'Title',
              dataIndex: 'discount_program',
              render: (text: any) => renderLink(`/administration/discount-program/${text.id}`, text.title),
              sorter: (a: any, b: any) => a.discount_program.title - b.discount_program.title
            },
            {
              title: 'Discount Type',
              dataIndex: 'discount_type',
              sorter: (a: any, b: any) => a.discount_type - b.discount_type
            },
            {
              title: 'Discount Amount',
              dataIndex: 'discount_amount',
              sorter: (a: any, b: any) => a.discount_amount - b.discount_amount
            },
          ],
          searchFunc: DiscountProgramQueries.getListByCartItem,
          searchParams: { cart_item: cartItem.id },
        }
      },
      helpKey: "sectionsTab"
    },
    {
      tabTitle: "Profiles",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: 'Name',
              dataIndex: 'profile',
              render: (text: any) => renderLink(`/storefront-data/student/${text.id}`, `${text.first_name} ${text.last_name}`),
              sorter: (a: any, b: any) => a.profile.first_name - b.profile.first_name
            },
            {
              title: 'Email',
              dataIndex: 'profile',
              render: (text: any) => text.primary_email,
              sorter: (a: any, b: any) => a.profile.primary_email - b.profile.primary_email
            },
          ],
          searchFunc: StudentQueries.getListByCartItem,
          searchParams: { cart_item: cartItem.id },
        }
      },
      helpKey: "sectionsTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: cartItem.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Cart Item Title - ${cartItem.product.title}`,
    tabs: tabMetas
  }
}
