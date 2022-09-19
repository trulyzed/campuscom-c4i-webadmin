import { Button, Card, Col, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { StepNames } from "./common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"

interface IProductDataStepProps {
  productData: Record<string, any>[]
  setStore: (...args: any[]) => void
  setProductData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const ProductDataStep = ({
  productData,
  setStore,
  setProductData,
  setCurrentStep,
}: IProductDataStepProps) => {
  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
      <Row>
        <Col xs={24}>
          <MetaDrivenForm
            meta={meta}
            onApplyChanges={async (values) => {
              const { data } = await ProductQueries.getSingle({ params: { id: values.product } })
              setProductData([...productData, data])
              setStore(values.store)
            }}
            isWizard
            applyButtonLabel="Add Product"
            showFullForm
            showClearbutton={false}
            stopProducingQueryParams
            resetOnSubmit
          />
        </Col>
        <Col xs={24}>
          <ResponsiveTable
            title={() => <Title level={5}>Selected Products</Title>}
            columns={[
              {
                title: 'Product',
                dataIndex: 'title',
                sorter: (a: any, b: any) => a.title - b.title
              },
              {
                title: 'Store',
                dataIndex: 'store',
                render: (text) => text?.name,
                sorter: (a: any, b: any) => a.store?.name - b.store?.name
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
            dataSource={productData}
            rowKey={"id"}
            hidePagination
            hideSettings
          />
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.YourInformation)} />
        </Col>
      </Row>
    </Card>
  )
}

const meta: IField[] = [
  {
    fieldName: "store",
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    autoSelectDefault: true
  },
  {
    fieldName: "product",
    label: "Product",
    inputType: DROPDOWN,
    refLookupService: ProductQueries.getList,
    displayKey: "title",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['store'],
    onDependencyChange: (value, { loadOptions }) => {
      loadOptions?.({ params: { store: value?.store } })
    },
  },
]