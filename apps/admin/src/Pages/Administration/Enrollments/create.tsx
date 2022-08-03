import { Button, Card, Checkbox, Col, Form, Row, Steps } from "antd"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { MetaDrivenForm } from "~/packages/components/Form/MetaDrivenForm"
import { useCallback, useState } from "react"
import { DROPDOWN, IField, TEXT } from "~/packages/components/Form/common"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"
import { ProductQueries } from "~/packages/services/Api/Queries/AdminQueries/Products"
import { ResponsiveTable } from "~/packages/components/ResponsiveTable"
import Title from "antd/lib/typography/Title"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { getUser } from "~/packages/services/Api/utils/TokenStore"
import { StudentQueries } from "~/packages/services/Api/Queries/AdminQueries/Students"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import Text from "antd/lib/typography/Text"
import { FormInput } from "~/packages/components/Form/FormInput"
//import { getEnrollmentFormMeta } from "~/Component/Feature/Enrollments/FormMeta/EnrollmentFormMeta"

const { Step } = Steps

const meta1: IField[] = [
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
    onDependencyChange: (value, { loadOptions }) => {
      loadOptions?.({ params: { store: value?.store } })
    },
  },
  // {
  //   fieldName: "related_product",
  //   label: "Related Product",
  //   inputType: DROPDOWN,
  //   refLookupService: ProductQueries.getList,
  //   displayKey: "title",
  //   valueKey: "id",
  //   rules: [{ required: true, message: "This field is required!" }],
  //   dependencies: ['product'],
  //   onDependencyChange: (value, { loadOptions }) => {
  //     loadOptions?.({ params: { id: value?.product } })
  //   },
  // },
]

const meta2: IField[] = [
  {
    fieldName: "first_name",
    label: "First Name",
    inputType: TEXT,
    disabled: true,
  },
  {
    fieldName: "last_name",
    label: "Last Name",
    inputType: TEXT,
    disabled: true,
  },
  {
    fieldName: "email",
    label: "Email",
    inputType: TEXT,
    disabled: true,
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

const meta3: IField[] = [
  {
    fieldName: "profile",
    label: "Profile",
    inputType: DROPDOWN,
    refLookupService: StudentQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
]

const meta7: IField[] = [
  {
    fieldName: "payment_note",
    label: "Payment Note",
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    fieldName: "payment_ref",
    label: "Payment Ref",
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
]

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [formInstance] = Form.useForm()

  const handleStudentSelect = useCallback((values: CheckboxValueType[], product) => {
    setRegistrationData(registrationData => {
      const adjustedData = [...registrationData]
      const matchedProduct = adjustedData.find(a => a.product === product)
      if (matchedProduct) matchedProduct.students = values
      else adjustedData.push({ product, students: values })

      return adjustedData
    })
  }, [])
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
              <Row>
                <Col md={24}>
                  <MetaDrivenForm
                    meta={meta1}
                    onApplyChanges={async (values) => {
                      const { data } = await ProductQueries.getSingle({ params: { id: values.product } })
                      setProductData([...productData, data])
                    }}
                    isWizard
                    applyButtonLabel="Add Product"
                    showFullForm
                    showClearbutton={false}
                    stopProducingQueryParams
                    resetOnSubmit
                  />
                </Col>
                <Col md={24}>
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
                        render: (text) => text.name,
                        sorter: (a: any, b: any) => a.store.name - b.store.name
                      },
                      {
                        title: 'Action',
                        dataIndex: "action",
                        render: (_, record: any) => (
                          <IconButton
                            toolTip="Delete Profile Question"
                            iconType="danger"
                            onClick={() => setProductData(productData.filter(i => i.id !== record.id))}
                          />
                        )
                      },
                    ]}
                    dataSource={productData}
                    rowKey={"id"}
                  />
                </Col>
                <Col span={6} offset={18} style={{ textAlign: "right" }}>
                  <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(1)} />
                </Col>
              </Row>
            </Card>
            : currentStep === 1 ?
              <Card style={{ margin: "10px 0 0 10px" }} title={"Your Information"}>
                <MetaDrivenForm
                  meta={meta2}
                  onApplyChanges={(values) => setCurrentStep(2)}
                  isWizard
                  applyButtonLabel="Continue"
                  showFullForm
                  showClearbutton={false}
                  initialFormValue={getUser() as Record<string, any>}
                />
              </Card>
              : currentStep === 2 ?
                <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
                  <Row>
                    <Col md={24}>
                      <MetaDrivenForm
                        meta={meta3}
                        onApplyChanges={async (values) => {
                          const { data } = await StudentQueries.getSingle({ params: { id: values.profile } })
                          setStudentData([...studentData, data])
                        }}
                        isWizard
                        applyButtonLabel="Add Profile"
                        showFullForm
                        showClearbutton={false}
                        stopProducingQueryParams
                        resetOnSubmit
                      />
                    </Col>
                    <Col md={24}>
                      <ResponsiveTable
                        title={() => <Title level={5}>Selected Profiles</Title>}
                        columns={[
                          {
                            title: 'Profile',
                            dataIndex: 'primary_email',
                            sorter: (a: any, b: any) => a.primary_email - b.primary_email
                          },
                          {
                            title: 'Action',
                            dataIndex: "action",
                            render: (_, record: any) => (
                              <IconButton
                                toolTip="Delete Profile Question"
                                iconType="danger"
                                onClick={() => setStudentData(studentData.filter(i => i.id !== record.id))}
                              />
                            )
                          },
                        ]}
                        dataSource={studentData}
                        rowKey={"id"}
                      />
                    </Col>
                    <Col span={6} offset={18} style={{ textAlign: "right" }}>
                      <Button style={{ marginTop: "20px", }} disabled={!studentData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(3)} />
                    </Col>
                  </Row>
                </Card>
                : currentStep === 3 ?
                  <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
                    <Row>
                      <Col>
                        {productData.map(product => (
                          <div key={product.id} style={{ marginBottom: '15px' }}>
                            <Title level={5}>"{product.title}" registration information</Title>
                            <Checkbox.Group defaultValue={registrationData.find(registration => registration.product === product.id)?.students} onChange={(values) => handleStudentSelect(values, product.id)} options={studentData.map(student => ({ label: student.primary_email, value: student.id }))} />
                          </div>
                        ))}
                      </Col>
                      <Col span={6} offset={18} style={{ textAlign: "right" }}>
                        <Button style={{ marginTop: "20px", }} disabled={!registrationData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(4)} />
                      </Col>
                    </Row>
                  </Card>
                  : currentStep === 4 ?
                    <Card style={{ margin: "10px 0 0 10px" }} title={"Additional Registration Information"}>
                      <Row>
                        <Col>
                          {registrationData.map(registration => (
                            <div key={registration.product} style={{ marginBottom: '20px' }}>
                              <Title level={4}>"{productData.find(product => product.id === registration.product)?.title}" registration information</Title>
                              <Form form={formInstance}>
                                {registration.students.map((student: any) =>
                                  <div key={student}>
                                    <Text strong>{studentData.find(s => s.id === student)?.primary_email}</Text>
                                    <div style={{ marginTop: "30px" }}>
                                      <FormInput fieldName="test" label={"Type related completed courses"} formInstance={formInstance} />
                                    </div>
                                  </div>
                                )}
                              </Form>
                            </div>
                          ))}
                        </Col>
                        <Col span={6} offset={18} style={{ textAlign: "right" }}>
                          <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(6)} />
                        </Col>
                      </Row>
                    </Card>
                    : currentStep === 6 ?
                      <Card style={{ margin: "10px 0 0 10px" }} title={"Payment Details"}>
                        <MetaDrivenForm
                          meta={meta7}
                          onApplyChanges={(values) => console.log(values)}
                          isWizard
                          applyButtonLabel="Submit"
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
