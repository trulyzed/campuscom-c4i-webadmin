import { useCallback } from "react"
import { Button, Card, Col, Row, Space } from "antd"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { CUSTOM_FIELD, DROPDOWN, IField, MULTI_RADIO, NUMBER, TEXT } from "@packages/components/lib/Form/common"
import { Steps } from "./Utils/types"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { INPUT_OPTIONS } from "~/Configs/input"
import { RelatedProductInput } from "./RelatedProductInput"
import { IApiResponse } from "@packages/services/lib/Api/utils/Interfaces"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { mapToPayloadDateTime } from "@packages/utilities/lib/mapper"
import { LookupOpenButton } from "@packages/components/lib/Modal/LookupModal/LookupOpenButton"


interface IProductDataStepProps {
  storeData: Record<string, any>
  productData: Record<string, any>[]
  setProductData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
  hasRegistrationProduct: boolean
  onlySectionProducts?: boolean
  onlyRegistrationProducts?: boolean
  noQuantityInput?: boolean
  noRelatedProducts?: boolean
  canSearch?: boolean
}

export const ProductDataStep = ({
  storeData,
  productData,
  setProductData,
  steps,
  currentStep,
  setCurrentStep,
  hasRegistrationProduct,
  onlySectionProducts,
  onlyRegistrationProducts,
  noQuantityInput,
  noRelatedProducts,
  canSearch,
}: IProductDataStepProps) => {
  const addProduct = QueryConstructor((data) => {
    const orderType = data?.data.order_type || "registration"
    if (productData.some(i => (i.id === data?.data.product) && (i.order_type === orderType))) {
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
    return ProductQueries.getSingle({ params: { id: data?.data.product } }).then(resp => {
      if (resp.success) {
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
        setProductData([...productData, newProductData])
      }
      return resp
    })
  }, [OrderQueries.create])

  const handleSelectProducts = useCallback((data?: any[]) => {
    if (!data) return
    setProductData((prevVal: any[]) => ([
      ...data.filter(i => prevVal.findIndex(j => j.id === i.id) < 0).map(i => ({
        title: i.title,
        id: i.id,
        order_type: "registration",
        product_type: i.product_type,
        unit: i.product_type === "section" ? "registration" : "unit"
      })),
      ...prevVal
    ]))
  }, [setProductData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
      {canSearch ?
        <Row>
          <Space direction="vertical" size={"large"}>
            <Col xs={24}>
              <Space direction="vertical">
                <h2 style={{ margin: 0 }}>Search and select from existing Products</h2>
                <LookupOpenButton
                  modalTitle={"Search Products"}
                  title={"Search Products"}
                  formTitle={"Product Filters"}
                  tableTitle={"Products"}
                  tooltip={"Search Products"}
                  onSubmit={handleSelectProducts}
                  meta={[
                    {
                      label: "Title",
                      inputType: TEXT,
                      fieldName: "title__icontains",
                    },
                  ]}
                  columns={[
                    {
                      title: 'Product',
                      dataIndex: 'title',
                      sorter: (a: any, b: any) => a.title - b.title
                    },
                  ]}
                  searchFunc={QueryConstructor((params) => ProductQueries.getList({
                    ...params,
                    params: {
                      ...params?.params,
                      store: storeData.store,
                      active_status: "True",
                      available_quantity__gt: 0,
                      store_course_section__section__registration_deadline__gte: mapToPayloadDateTime(new Date()),
                      ...onlySectionProducts && { product_type: "section" }
                    }
                  }), [ProductQueries.getList])}
                  isArray
                />
              </Space>
            </Col>
          </Space>
        </Row>
        : null
      }
      <Row style={{ marginTop: "25px" }}>
        <Col xs={24}>
          <Card bodyStyle={{ padding: "5px 15px" }}>
            <ResponsiveTable
              tableTitle="Selected Products"
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
                ...noQuantityInput ? [] : [{
                  title: 'Quantity',
                  dataIndex: 'quantity',
                  sorter: (a: any, b: any) => a.quantity - b.quantity
                }],
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
              actions={canSearch ? [] : [
                <MetaDrivenFormModalOpenButton
                  formTitle={`Add Item`}
                  formMeta={getMeta(storeData?.store, onlySectionProducts, onlyRegistrationProducts, noQuantityInput, noRelatedProducts)}
                  formSubmitApi={addProduct}
                  buttonLabel={`Add Item`}
                />
              ]}
              dataSource={productData}
              rowKey={record => `${record.id}__${record.order_type}`}
              expandedRowColumns={noRelatedProducts ? undefined : [
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
              hideSettings
            />
          </Card>
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(hasRegistrationProduct ? (currentStep + 1) : steps.Invoice)} />
        </Col>
      </Row>
    </Card>
  )
}

const getMeta = (storeId: string, onlySectionProducts?: boolean, onlyRegistrationProducts?: boolean, noQuantityInput?: boolean, noRelatedProducts?: boolean): IField[] => (
  [
    ...onlySectionProducts ? [] : [{
      fieldName: "product_type",
      label: "Product Type",
      inputType: DROPDOWN,
      options: INPUT_OPTIONS.PRODUCT_TYPE?.filter(i => i.value !== "certificate" && i.value !== "membership"),
    }] as IField[],
    {
      fieldName: "product",
      label: "Product",
      inputType: DROPDOWN,
      refLookupService: QueryConstructor((params) => ProductQueries.getList({
        ...params,
        params: {
          ...params?.params,
          store: storeId,
          active_status: "True",
          available_quantity__gt: 0,
          store_course_section__section__registration_deadline__gte: mapToPayloadDateTime(new Date()),
          ...onlySectionProducts && { product_type: "section" }
        }
      }), [ProductQueries.getList]),
      displayKey: "title",
      valueKey: "id",
      rules: [{ required: true, message: "This field is required!" }],
      ...!onlySectionProducts && {
        dependencies: ['product_type'],
        onDependencyChange: (value, { loadOptions }) => {
          loadOptions?.({ params: { product_type: value?.product_type } })
        },
      }
    },
    ...onlyRegistrationProducts ? [] : [{
      fieldName: "order_type",
      label: "Order Type",
      inputType: MULTI_RADIO,
      options: [
        { label: "Registration", value: "registration" },
        { label: "Seat", value: "seat" }
      ],
      rules: [{ required: true, message: "This field is required!" }],
      dependencies: ['product_type'],
      onDependencyChange: (value, { toggleField }) => {
        toggleField?.(value?.product_type === "section")
      },
    }] as IField[],
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
