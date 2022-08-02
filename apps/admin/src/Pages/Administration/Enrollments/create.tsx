import { Card, Col, Row, Steps } from "antd"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { useState } from "react"
import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
//import { getEnrollmentFormMeta } from "~/Component/Feature/Enrollments/FormMeta/EnrollmentFormMeta"

const { Step } = Steps

const meta: IField[] = [
  {
    fieldName: "store",
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
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
    onDependencyChange: (value, { loadOptions }) => { loadOptions?.({ params: { store: value?.store } }) },
  },
  {
    fieldName: "related_product",
    label: "Related Product",
    inputType: DROPDOWN,
    refLookupService: ProductQueries.getList,
    displayKey: "title",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    dependencies: ['product'],
    onDependencyChange: (value, { loadOptions }) => { loadOptions?.({ params: { id: value?.product } }) },
  },
]

const meta1: IField[] = [
  {
    fieldName: "first_name",
    label: "First Name",
    inputType: TEXT,
    disabled: true,
    initialValue: "Admin"
  },
  {
    fieldName: "last_name",
    label: "Last Name",
    inputType: TEXT,
    disabled: true,
    initialValue: "Admin"
  },
  {
    fieldName: "email",
    label: "Email",
    inputType: TEXT,
    disabled: true,
    initialValue: "admin@gmail.com"
  },
  {
    fieldName: "country",
    label: "Country",
    inputType: DROPDOWN,
    options: [
      { label: "Bangladesh", value: "bd" },
      { label: "USA", value: "usa" },
    ],
  },
]

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(0)
  return (
    <>
      <Card
        title={
          <Row>
            <Col flex="auto">
              <SidebarMenuTargetHeading level={1} targetID="navigation">
                Create an Enrollment
              </SidebarMenuTargetHeading>
            </Col>
            <Col flex="none">
              <HelpButton helpKey={'CreateOrder'} />
            </Col>
          </Row>
        }
        bodyStyle={{ padding: "0" }}
      />
      <Row>
        <Col md={4}>
          <Card style={{ marginTop: "10px" }}>
            <Steps direction="vertical" size="small" current={currentStep} onChange={(current) => setCurrentStep(current)}>
              <Step title="Product" />
              <Step title="You" />
              <Step title="Student" />
              <Step title="Registration" />
              <Step title="Additional Info" />
              <Step title="Invoice" />
              <Step title="Payment" />
            </Steps>
          </Card>
        </Col>
        <Col md={20}>
          {currentStep === 0 ?
            <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
              <MetaDrivenForm
                meta={meta}
                onApplyChanges={(values) => setCurrentStep(1)}
                isWizard
                applyButtonLabel="Continue"
                showFullForm
                showClearbutton={false}
              />
            </Card>
            : currentStep === 1 ?
              <Card style={{ margin: "10px 0 0 10px" }} title={"Your Information"}>
                <MetaDrivenForm
                  meta={meta1}
                  onApplyChanges={(values) => console.log(values)}
                  isWizard
                  applyButtonLabel="Continue"
                  showFullForm
                  showClearbutton={false}
                />
              </Card>
              : null}
        </Col>
      </Row>
    </>
  )
}
