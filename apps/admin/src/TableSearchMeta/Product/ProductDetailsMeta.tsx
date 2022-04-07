import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { ProductFormMeta } from "~/Component/Feature/Products/FormMeta/ProductFormMeta"
import { REFRESH_PAGE } from "@packages/utilities/lib/EventBus"
import { renderJson, renderThumb } from "~/packages/components/ResponsiveTable/tableUtils"

export const getProductDetailsMeta = (product: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => ProductQueries.update({ ...data, params: { id: product.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [ProductQueries.update])

  const checkout_url = `${process.env.REACT_APP_ENROLLMENT_URL}/${product?.store?.url_slug}?product=${product?.id}&guest=true`

  const summaryInfo: CardContainer = {
    title: `Product: ${product.title}`,
    cardActions: product.product_type === 'miscellaneous' ? [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Product`}
        formMeta={ProductFormMeta}
        formSubmitApi={updateEntity}
        initialFormValue={{ ...product, store: product.store.id, content: JSON.stringify(product.content) }}
        defaultFormValue={{ productId: product.id }}
        buttonLabel={`Update Product`}
        iconType="edit"
        refreshEventName={REFRESH_PAGE}
      />,
      // <ResourceRemoveLink ResourceID={Resource.ResourceID} />
    ] : undefined,
    contents: [
      { label: 'Store', value: renderLink(`/administration/store/${product.store.id}`, product.store.name), },
      { label: 'Title', value: product.title },
      { label: 'Type', value: product.product_type },
      { label: 'Tax Code', value: product.tax_code },
      { label: 'Fee', value: product.fee },
      { label: 'Minimum Fee', value: product.minimum_fee },
      { label: 'Image', value: renderThumb(product.image, "Product's image") },
      { label: 'Content', value: renderJson(product.content) },
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
