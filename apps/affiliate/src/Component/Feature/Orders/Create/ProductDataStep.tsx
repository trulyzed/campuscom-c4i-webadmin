import { useState } from "react"
import { Button, Card, Col, Row } from "antd"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { CUSTOM_FIELD, DROPDOWN, IField, MULTI_RADIO, NUMBER } from "@packages/components/lib/Form/common"
import { Steps } from "./Utils/types"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { INPUT_OPTIONS } from "~/Configs/input"
import { RelatedProductInput } from "./RelatedProductInput"
import { IApiResponse } from "@packages/services/lib/Api/utils/Interfaces"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { mapToPayloadDateTime } from "@packages/utilities/lib/mapper"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"


interface IProductDataStepProps {
  storeData: Record<string, any>
  productData: Record<string, any>[]
  setProductData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
  hasRegistrationProduct: boolean
  singleProduct?: boolean
  onlySectionProducts?: boolean
  onlyRegistrationProducts?: boolean
  noQuantityInput?: boolean
  noRelatedProducts?: boolean
}

export const ProductDataStep = ({
  storeData,
  productData,
  setProductData,
  steps,
  currentStep,
  setCurrentStep,
  hasRegistrationProduct,
  singleProduct,
  onlySectionProducts,
  onlyRegistrationProducts,
  noQuantityInput,
  noRelatedProducts,
}: IProductDataStepProps) => {
  const [loading, setLoading] = useState(false)

  const addProduct = QueryConstructor((data) => {
    if (!singleProduct && productData.some(i => (i.id === data?.data.product) && (i.order_type === data?.data.order_type))) {
      return Promise.resolve({
        code: 404,
        data: null,
        error: [{ message: "Product combination already chosen" }],
        success: false
      } as IApiResponse)
    }
    const relatedProducts = Object.keys(data?.data || {}).reduce((a, c) => {
      const relatedProductId = c.split('related_product_quantity__')[1]
      const relatedProductTitle = data?.data[`related_product_title__${relatedProductId}`]
      if (relatedProductId && data?.data[c]) a.push({
        id: relatedProductId,
        title: relatedProductTitle,
        quantity: data?.data[c],
      })
      return a
    }, [] as any[])
    setLoading(true)
    return ProductQueries.getSingle({ params: { id: data?.data.product } }).then(resp => {
      if (resp.success) {
        const orderType = data?.data.order_type || "registration"
        const unitType = resp.data.product_type !== "section" ? "unit" : orderType
        const newProductData = {
          title: resp.data.title,
          id: resp.data.id,
          quantity: data?.data.quantity,
          order_type: orderType,
          product_type: resp.data.product_type,
          unit: unitType,
          ...resp.data.product_type === "section" && { related_products: relatedProducts, }
        }
        setProductData(singleProduct ? [newProductData] : [...productData, newProductData])
      }
      return resp
    }).finally(() => setLoading(false))
  }, [OrderQueries.create])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
      {singleProduct ?
        <MetaDrivenForm
          className="form--with-html-label"
          meta={getMeta(storeData?.store, onlySectionProducts, onlyRegistrationProducts, noQuantityInput, noRelatedProducts)}
          onApplyChanges={(values) => addProduct({ data: values }).then((resp) => resp.success && setCurrentStep(currentStep + 1))}
          isWizard
          applyButtonLabel="Continue"
          showFullForm
          showClearbutton={false}
          stopProducingQueryParams
          initialFormValue={{
            ...singleProduct ? productData?.[0] : undefined,
            product: singleProduct ? productData?.[0]?.id : undefined,
            product_type: onlySectionProducts ? "section" : undefined,
            order_type: onlyRegistrationProducts ? "registration" : undefined
          }}
          loading={loading}
          disableContainerLoader
        />
        :
        <Row>
          <Col xs={24}>
            <ResponsiveTable
              columns={[
                {
                  title: 'Product',
                  dataIndex: 'title',
                  sorter: (a: any, b: any) => a.title - b.title
                },
                {
                  title: 'Product Type',
                  dataIndex: 'product_type',
                  sorter: (a: any, b: any) => a.product_type - b.product_type
                },
                {
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  sorter: (a: any, b: any) => a.quantity - b.quantity
                },
                {
                  title: 'Unit',
                  dataIndex: 'unit',
                  sorter: (a: any, b: any) => a.unit - b.unit
                },
                {
                  title: 'Action',
                  dataIndex: "action",
                  render: (_, record: any) => (
                    <ContextAction
                      type="delete"
                      tooltip="Delete Product"
                      onClick={() => setProductData(productData.filter(i => !(i.id === record.id && i.order_type === record.order_type)))}
                    />
                  )
                },
              ]}
              actions={[
                <MetaDrivenFormModalOpenButton
                  formTitle={`Add Item`}
                  formMeta={getMeta(storeData?.store)}
                  formSubmitApi={addProduct}
                  buttonLabel={`Add Item`}
                />
              ]}
              dataSource={productData}
              rowKey={record => `${record.id}__${record.order_type}`}
              expandedRowColumns={[
                {
                  title: 'Related Product',
                  dataIndex: "title",
                },
                {
                  title: 'Quantity',
                  dataIndex: "quantity",
                }
              ]}
              expandedRowDataIndex={'related_products'}
              hidePagination
              hideSettings
            />
          </Col>
          <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
            <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(hasRegistrationProduct ? (currentStep + 1) : steps.Invoice)} />
          </Col>
        </Row>
      }
    </Card>
  )
}

const getMeta = (storeId: string, onlySectionProducts?: boolean, onlyRegistrationProducts?: boolean, noQuantityInput?: boolean, noRelatedProducts?: boolean): IField[] => (
  [
    {
      fieldName: "product_type",
      label: "Product Type",
      inputType: DROPDOWN,
      options: onlySectionProducts ? [
        { value: 'section', label: 'Section' }
      ] : INPUT_OPTIONS.PRODUCT_TYPE?.filter(i => i.value !== "certificate" && i.value !== "membership"),
    },
    {
      fieldName: "product",
      label: "Product",
      inputType: DROPDOWN,
      refLookupService: QueryConstructor((params) => ProductQueries.getList({
        ...params,
        params: { ...params?.params, store: storeId, active_status: "True", available_quantity__gt: 0, store_course_section__section__registration_deadline__gte: mapToPayloadDateTime(new Date()) }
      }), [ProductQueries.getList]),
      displayKey: "title",
      valueKey: "id",
      rules: [{ required: true, message: "This field is required!" }],
      dependencies: ['product_type'],
      onDependencyChange: (value, { loadOptions }) => {
        loadOptions?.({ params: { product_type: value?.product_type } })
      },
    },
    {
      fieldName: "order_type",
      label: "Order Type",
      inputType: MULTI_RADIO,
      options: onlyRegistrationProducts ?
        [{ label: "Registration", value: "registration" }]
        : [
          { label: "Registration", value: "registration" },
          { label: "Seat", value: "seat" }
        ],
      rules: [{ required: true, message: "This field is required!" }],
      dependencies: ['product_type'],
      onDependencyChange: (value, { toggleField }) => {
        toggleField?.(value?.product_type === "section")
      },
    },
    ...noQuantityInput ? [] : [{
      fieldName: "quantity",
      label: "Quantity",
      inputType: NUMBER,
      rules: [{ required: true, message: "This field is required!" }],
    }] as IField[],
    ...noRelatedProducts ? [] : [{
      fieldName: "related_product",
      label: "Related Product",
      inputType: CUSTOM_FIELD,
      customFilterComponent: (props) => <RelatedProductInput {...props} store={storeId} relationType={"standalone"} />,
      dependencies: ['product', 'product_type'],
      onDependencyChange: (value, { toggleField }) => {
        toggleField?.(value?.product_type === "section" && !!value?.product)
      },
    }] as IField[],
  ]
)
