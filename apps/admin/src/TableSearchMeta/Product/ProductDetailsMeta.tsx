import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"

export const getProductDetailsMeta = (product: { [key: string]: any }): IDetailsMeta => {
  const checkout_url = `${process.env.REACT_APP_ENROLLMENT_URL}/${product?.store?.url_slug}?product=${product?.id}&guest=true`

  const summaryInfo: CardContainer = {
    title: `Product: ${product.title}`,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${product.store.id}`, product.store.name), },
      { label: 'Title', value: product.title },
      { label: 'Type', value: product.product_type },
      { label: 'Tax Code', value: product.tax_code },
      { label: 'Fee', value: product.fee },
      { label: 'Minimum Fee', value: product.minimum_fee },
      { label: 'Image', value: product.image },
      { label: 'Content', value: JSON.stringify(product.content) },
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
  ]

  return {
    pageTitle: `Product Title - ${product.title}`,
    tabs: tabMetas
  }
}
