import { Button, Card, Col, Row } from "antd"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { DROPDOWN, IField, MULTI_RADIO, NUMBER } from "@packages/components/lib/Form/common"
import { StepNames } from "./common"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { INPUT_OPTIONS } from "~/Configs/input"

interface IProductDataStepProps {
  productData: Record<string, any>[]
  setProductData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
  hasRegistrationProduct: boolean
}

export const ProductDataStep = ({
  productData,
  setProductData,
  setCurrentStep,
  hasRegistrationProduct,
}: IProductDataStepProps) => {
  const addProduct = QueryConstructor((data) => {
    return new Promise((resolve) => {
      ProductQueries.getSingle({ params: { id: data?.data.product } }).then(resp => {
        resolve({
          code: 200,
          data: [],
          error: undefined,
          success: true
        })
        setProductData([
          ...productData,
          {
            title: resp.data.title,
            id: resp.data.id,
            number_of_seats: data?.data.number_of_seats,
            order_type: data?.data.order_type || "registration",
          }
        ])
      })
    })
  }, [])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
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
                title: 'Order Type',
                dataIndex: 'order_type',
                sorter: (a: any, b: any) => a.order_type - b.order_type
              },
              {
                title: 'Number of Seats',
                dataIndex: 'number_of_seats',
                sorter: (a: any, b: any) => a.number_of_seats - b.number_of_seats
              },
              {
                title: 'Action',
                dataIndex: "action",
                render: (_, record: any) => (
                  <ContextAction
                    type="delete"
                    tooltip="Delete Product"
                    onClick={() => setProductData(productData.filter(i => i.id !== record.id))}
                  />
                )
              },
            ]}
            actions={[
              <MetaDrivenFormModalOpenButton
                formTitle={`Add Product`}
                formMeta={meta}
                formSubmitApi={addProduct}
                buttonLabel={`Add Product`}
              />
            ]}
            dataSource={productData}
            rowKey={"id"}
            hidePagination
            hideSettings
          />
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(hasRegistrationProduct ? StepNames.StudentInformation : StepNames.Invoice)} />
        </Col>
      </Row>
    </Card>
  )
}

const meta: IField[] = [
  {
    fieldName: "product_type",
    label: "Product Type",
    inputType: DROPDOWN,
    options: INPUT_OPTIONS.PRODUCT_TYPE
  },
  {
    fieldName: "product",
    label: "Product",
    inputType: DROPDOWN,
    refLookupService: ProductQueries.getList,
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
    options: [
      { label: "Registration", value: "registration" },
      { label: "Seat", value: "seat" }
    ],
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['product_type'],
    onDependencyChange: (value, { toggleField }) => {
      toggleField?.(value?.product_type === "section")
    },
  },
  {
    fieldName: "number_of_seats",
    label: "Number Of Seats",
    inputType: NUMBER,
    dependencies: ['order_type', 'product_type'],
    onDependencyChange: (value, { toggleField }) => {
      toggleField?.((value?.product_type === "section") && (value?.order_type === "seat"))
    },
    rules: [{ required: true, message: "This field is required!" }]
  }
]