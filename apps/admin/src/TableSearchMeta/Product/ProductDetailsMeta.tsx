import { message } from "antd"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { renderLink } from "~/packages/components/ResponsiveTable"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { UPDATE_SUCCESSFULLY, CREATE_SUCCESSFULLY } from "~/Constants"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { ProductFormMeta } from "~/Component/Feature/Products/FormMeta/ProductFormMeta"
import { REFRESH_PAGE } from "~/packages/utils/EventBus"
import { renderThumb, renderActiveStatus } from "~/packages/components/ResponsiveTable/tableUtils"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { getRelatedProductTaggingFormMeta } from '~/Component/Feature/Products/FormMeta/RelatedProductTaggingFormMeta'
import { SummaryTablePopover } from "~/packages/components/Popover/SummaryTablePopover"
import { AuditTrailSearchMeta } from "~/TableSearchMeta/AuditTrails/AuditTrailSearchMeta"
import { getAuditTrailListTableColumns } from "~/TableSearchMeta/AuditTrails/AuditTrailListTableColumns"

export const getProductDetailsMeta = (product: { [key: string]: any }): IDetailsMeta => {
  const updateEntity = QueryConstructor(((data) => ProductQueries.update({ ...data, params: { id: product.id } }).then(resp => {
    if (resp.success) {
      message.success(UPDATE_SUCCESSFULLY)
    }
    return resp
  })), [ProductQueries.update])

  const addRelatedProducts = (relationType: string) => QueryConstructor(((data) => ProductQueries.tagRelatedProducts({ ...data, data: { ...data?.data, product: product.id, related_product_type: relationType } }).then(resp => {
    if (resp.success) {
      message.success(CREATE_SUCCESSFULLY)
    }
    return resp
  })), [ProductQueries.tagRelatedProducts])

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
          <SummaryTablePopover card={{
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
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_STANDALONE_PRODUCT_TAB"
                  onClickRemove={() => ProductQueries.untagRelatedProduct({ data: { ids: [text] } })}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getRelatedProductList,
          searchParams: { product: product.id, related_product_type: 'standalone' },
          refreshEventName: "REFRESH_STANDALONE_PRODUCT_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Standalone Products`}
              formMeta={getRelatedProductTaggingFormMeta(product.id, 'standalone')}
              formSubmitApi={addRelatedProducts('standalone')}
              buttonLabel={`Add Standalone Product`}
              iconType="create"
              refreshEventName={'REFRESH_STANDALONE_PRODUCT_TAB'}
            />
          ]
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
                <IconButton
                  iconType="remove"
                  toolTip="Remove"
                  refreshEventName="REFRESH_REGISTRATION_PRODUCT_TAB"
                  onClickRemove={() => ProductQueries.untagRelatedProduct({ data: { ids: [text] } })}
                />
              )
            },
          ],
          searchFunc: ProductQueries.getRelatedProductList,
          searchParams: { product: product.id, related_product_type: 'registration' },
          refreshEventName: "REFRESH_REGISTRATION_PRODUCT_TAB",
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Registration Products`}
              formMeta={getRelatedProductTaggingFormMeta(product.id, 'registration')}
              formSubmitApi={addRelatedProducts('registration')}
              buttonLabel={`Add Registration Product`}
              iconType="create"
              refreshEventName={'REFRESH_REGISTRATION_PRODUCT_TAB'}
            />
          ]
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
