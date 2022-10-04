import { CardContainer, IDetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "@packages/components/lib/Page/DetailsPage/Common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { renderThumb, renderActiveStatus } from "@packages/components/lib/ResponsiveTable/tableUtils"
import { PopoverSummaryTable } from "@packages/components/lib/Popover/PopoverSummaryTable"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

export const getProductDetailsMeta = (product: { [key: string]: any }): IDetailsMeta => {
  const checkout_url = `${process.env.REACT_APP_ENROLLMENT_URL}/${product?.store?.url_slug}?product=${product?.id}&guest=true`

  const summaryInfo: CardContainer = {
    title: `Product: ${product.title}`,
    contents: [
      { label: 'Active Status', value: !!product.active_status, render: renderActiveStatus },
      { label: 'Store', value: renderLink(`/administration/store/${product.store.id}`, product.store.name), },
      { label: 'Title', value: product.title },
      { label: 'Type', value: product.product_type },
      { label: 'Tax Code', value: product.tax_code },
      { label: 'Fee', value: product.fee },
      { label: 'Minimum Fee', value: product.minimum_fee },
      { label: 'Image', value: renderThumb(product.image, "Product's image") },
      {
        label: 'Content', render: () => (
          <PopoverSummaryTable card={{
            title: 'Content',
            contents: [
              {
                label: 'Title',
                value: product.content?.title
              },
              {
                label: 'Image',
                value: product.content?.image ? renderThumb(product.content?.image, product.content?.image) : undefined,
              }
            ]
          }} />
        ),
      },
      { label: 'Checkout URL', value: product.product_type !== 'miscellaneous' ? renderLink(checkout_url, checkout_url, false, true) : undefined },
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
      helpKey: "productSummaryTab"
    },
    {
      tabTitle: "Standalone Products",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: 'Product Title',
              dataIndex: 'optional_product',
              render: (text: any) => renderLink(`/store/product/${text.id}`, text.name),
              sorter: (a: any, b: any) => a.optional_product.name - b.optional_product.name,
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_STANDALONE_PRODUCT_TAB"
                  queryService={QueryConstructor(() => ProductQueries.untagRelatedProduct({ data: { ids: [text] } }), [ProductQueries.untagRelatedProduct])}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getRelatedProductList,
          searchParams: { product: product.id, related_product_type: 'standalone' },
          refreshEventName: "REFRESH_STANDALONE_PRODUCT_TAB",
        }
      },
      helpKey: "productTab"
    },
    {
      tabTitle: "Registration Products",
      tabType: "table",
      tabMeta: {
        tableProps: {
          pagination: false,
          columns: [
            {
              title: 'Product Title',
              dataIndex: 'optional_product',
              render: (text: any) => renderLink(`/store/product/${text.id}`, text.name),
              sorter: (a: any, b: any) => a.optional_product.name - b.optional_product.name,
            },
            {
              title: "Action",
              dataIndex: "id",
              render: (text) => (
                <ContextAction
                  tooltip="Remove"
                  type="delete"
                  refreshEventName="REFRESH_REGISTRATION_PRODUCT_TAB"
                  queryService={QueryConstructor(() => ProductQueries.untagRelatedProduct({ data: { ids: [text] } }), [ProductQueries.untagRelatedProduct])}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getRelatedProductList,
          searchParams: { product: product.id, related_product_type: 'registration' },
          refreshEventName: "REFRESH_REGISTRATION_PRODUCT_TAB",
        }
      },
      helpKey: "productTab"
    },
    {
      tabTitle: "Activities",
      tabType: "searchtable",
      tabMeta: {
        searchMeta: AuditTrailSearchMeta,
        searchMetaName: "AuditTrailSearchMeta",
        tableProps: {
          ...getAuditTrailListTableColumns(),
          searchParams: { changes_in__id: product.id },
          refreshEventName: "REFRESH_ACTIVITY_TAB",
          pagination: false,
        }
      },
      helpKey: "activitiesTab"
    },
  ]

  return {
    pageTitle: `Product Title - ${product.title}`,
    tabs: tabMetas
  }
}
