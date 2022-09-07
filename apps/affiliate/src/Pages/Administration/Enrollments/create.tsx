import { Button, Card, Checkbox, Col, Divider, Form, Popover, Row, Steps } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { useCallback, useEffect, useState } from "react"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { ProductQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Products"
import { renderAmount, ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import Title from "antd/lib/typography/Title"
import { getUser } from "@packages/services/lib/Api/utils/TokenStore"
import { ContactQueries as AffiliateContactQueries } from "@packages/services/lib/Api/Queries/AffiliateQueries/Contacts"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import Text from "antd/lib/typography/Text"
// import { FormInput } from "@packages/components/Form/FormInput"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { checkAdminApiPermission } from "@packages/services/lib/Api/Permission/AdminApiPermission"
import { ApiPermissionAction, ApiPermissionClass } from "@packages/services/lib/Api/Enums/Permission"

//import { getEnrollmentFormMeta } from "~/Component/Feature/Enrollments/FormMeta/EnrollmentFormMeta"

const { Step } = Steps

enum StepNames {
  ProductInformation,
  YourInformation,
  StudentInformation,
  RegistrationInformation,
  AdditionalRegistrationInformation,
  Invoice,
  PaymentInformation
}

const meta1: IField[] = [
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

const meta6: IField[] = [
  {
    fieldName: "coupon",
    label: "Coupon",
    inputType: TEXT,
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
  const [store, setStore] = useState()
  const [currentStep, setCurrentStep] = useState(StepNames.ProductInformation)
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>(getUser() as Record<string, any>)
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [formInstance] = Form.useForm()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const createWithPurchaserInfo = checkAdminApiPermission([{ operation: ApiPermissionClass.CreateEnrollmentWithPurchserInfo, action: ApiPermissionAction.Write }])

  const meta2: IField[] = [
    {
      fieldName: "first_name",
      label: "First Name",
      inputType: TEXT,
      disabled: !createWithPurchaserInfo,
      rules: [{ required: true, message: "This field is required!" }]
    },
    {
      fieldName: "last_name",
      label: "Last Name",
      inputType: TEXT,
      disabled: !createWithPurchaserInfo,
      rules: [{ required: true, message: "This field is required!" }]
    },
    {
      fieldName: "email",
      label: "Email",
      inputType: TEXT,
      disabled: !createWithPurchaserInfo,
      rules: [{ required: true, message: "This field is required!" }]
    },
  ]

  const handleStepChange = useCallback((current) => {
    setCurrentStep(current)
  }, [])

  const handleStudentSelect = useCallback((values: CheckboxValueType[], product) => {
    setRegistrationData(registrationData => {
      const adjustedData = [...registrationData]
      const matchedProduct = adjustedData.find(a => a.product === product)
      if (matchedProduct) matchedProduct.students = values
      else adjustedData.push({ product, students: values })
      return adjustedData
    })
  }, [])

  const generatePurchaserDetailsPayload = useCallback(() => {
    const data: any = purchaserData ? { ...purchaserData, primary_email: purchaserData.email } : undefined
    if (data) delete data["email"]
    return data
  }, [purchaserData])

  const generateCartDetailsPayload = useCallback(() => {
    return registrationData.map(registration => ({
      product_id: registration.product,
      quantity: registration.students.length,
      is_related: false,
      related_to: "",
      student_email: ""
    }))
  }, [registrationData])

  const generateStudentDetailsPayload = useCallback(() => {
    return registrationData.reduce((a, c) => {
      c.students.forEach((studentId: any) => {
        a.push({
          product_id: c.product,
          profile_id: studentId,
        })
      })
      return a
    }, [])
  }, [registrationData])

  const getPaymentSummary = useCallback(async () => {
    const payload = {
      cart_details: generateCartDetailsPayload(),
      store,
      coupon_codes: couponCode ? [couponCode] : [],
    }
    const resp = await EnrollmentQueries.getPaymentSummary({ data: payload })
    setInvoiceData(!resp.data?.message ? resp.data : undefined)
  }, [couponCode, store, generateCartDetailsPayload])

  const reset = useCallback(() => {
    setCurrentStep(StepNames.ProductInformation)
    setStore(undefined)
    setProductData([])
    setStudentData([])
    setRegistrationData([])
    setInvoiceData(undefined)
    setCouponCode(undefined)
    formInstance.resetFields()
  }, [formInstance])

  const handleSubmit = useCallback(async (values) => {
    const payload = {
      store,
      product_ids: productData.map(p => p.id),
      purchaser_info: generatePurchaserDetailsPayload(),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
    }
    const resp = await (createWithPurchaserInfo ? EnrollmentQueries.createWithPurchaserInfo : EnrollmentQueries.create)({ data: payload })
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    }
  }, [generatePurchaserDetailsPayload, generateCartDetailsPayload, generateStudentDetailsPayload, productData, createWithPurchaserInfo, store, reset])

  useEffect(() => {
    getPaymentSummary()
  }, [registrationData, couponCode, getPaymentSummary])

  useEffect(() => {
    setRegistrationData(registrationData => {
      return registrationData.reduce((a, c) => {
        if (productData.some(p => p.id === c.product)) {
          c.students = c.students.filter((id: any) => studentData.some(student => student.id === id))
          a.push(c)
        }
        return a
      }, []) as Record<string, any>[]
    })
  }, [productData, studentData])

  return (
    <>
      {orderRef ?
        <Alert
          className="mb-20"
          type="success"
          message={"Success"}
          description={`Order creation was successful (Order reference: ${orderRef}).`}
          onClose={() => setOrderRef(undefined)}
        />
        : null}
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
            <Steps direction="vertical" size="small" current={currentStep} onChange={handleStepChange}>
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
          {currentStep === StepNames.ProductInformation ?
            <Card style={{ margin: "10px 0 0 10px" }} title={"Product Summary"}>
              <Row>
                <Col md={24}>
                  <MetaDrivenForm
                    meta={meta1}
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
                <Col span={6} offset={18} style={{ textAlign: "right" }}>
                  <Button style={{ marginTop: "20px", }} disabled={!productData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.YourInformation)} />
                </Col>
              </Row>
            </Card>
            : currentStep === StepNames.YourInformation ?
              <Card style={{ margin: "10px 0 0 10px" }} title={"Your Information"}>
                <MetaDrivenForm
                  meta={meta2}
                  onApplyChanges={(values) => {
                    setPurchaserData(values)
                    setCurrentStep(StepNames.StudentInformation)
                  }}
                  isWizard
                  applyButtonLabel="Continue"
                  showFullForm
                  showClearbutton={false}
                  stopProducingQueryParams
                  initialFormValue={createWithPurchaserInfo ? purchaserData : getUser() as Record<string, any>}
                />
              </Card>
              : currentStep === StepNames.StudentInformation ?
                <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
                  <Row>
                    <Col md={24}>
                      <MetaDrivenForm
                        meta={[
                          {
                            fieldName: "profile",
                            label: "Student",
                            inputType: DROPDOWN,
                            refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: store } }), [ContactQueries.getLookupData]),
                            displayKey: "name",
                            valueKey: "id",
                            rules: [{ required: true, message: "This field is required!" }]
                          },
                        ]}
                        onApplyChanges={async (values) => {
                          const { data } = await AffiliateContactQueries.getSingle({ params: { id: values.profile } })
                          setStudentData([...studentData, data])
                        }}
                        isWizard
                        applyButtonLabel="Add Student"
                        showFullForm
                        showClearbutton={false}
                        stopProducingQueryParams
                        resetOnSubmit
                      />
                    </Col>
                    <Col md={24}>
                      <ResponsiveTable
                        title={() => <Title level={5}>Selected Students</Title>}
                        columns={[
                          {
                            title: 'Student',
                            dataIndex: 'name',
                            sorter: (a: any, b: any) => a.name - b.name
                          },
                          {
                            title: 'Action',
                            dataIndex: "action",
                            render: (_, record: any) => (
                              <ContextAction
                                type="delete"
                                tooltip="Delete Profile"
                                onClick={() => setStudentData(studentData.filter(i => i.id !== record.id))}
                              />
                            )
                          },
                        ]}
                        dataSource={studentData}
                        rowKey={"id"}
                        hidePagination
                        hideSettings
                      />
                    </Col>
                    <Col span={6} offset={18} style={{ textAlign: "right" }}>
                      <Button style={{ marginTop: "20px", }} disabled={!studentData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.RegistrationInformation)} />
                    </Col>
                  </Row>
                </Card>
                : currentStep === StepNames.RegistrationInformation ?
                  <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
                    <Row>
                      <Col flex={"auto"}>
                        {productData.map(product => (
                          <div key={product.id} style={{ marginBottom: '15px' }}>
                            <Title level={4}>"{product.title}" registration information</Title>
                            <Checkbox.Group defaultValue={registrationData.find(registration => registration.product === product.id)?.students} onChange={(values) => handleStudentSelect(values, product.id)} options={studentData.map(student => ({ label: student.name, value: student.id }))} />
                            <Divider />
                          </div>
                        ))}
                      </Col>
                      <Col span={6} offset={18} style={{ textAlign: "right" }}>
                        <Button style={{ marginTop: "20px", }} disabled={!registrationData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.AdditionalRegistrationInformation)} />
                      </Col>
                    </Row>
                  </Card>
                  : currentStep === StepNames.AdditionalRegistrationInformation ?
                    <Card style={{ margin: "10px 0 0 10px" }} title={"Additional Registration Information"}>
                      <Row>
                        <Col flex={"auto"}>
                          {registrationData.map(registration => (
                            <div key={registration.product} style={{ marginBottom: '20px' }}>
                              <Title level={4}>"{productData.find(product => product.id === registration.product)?.title}" registration information</Title>
                              <Form form={formInstance}>
                                {registration.students.map((student: any) =>
                                  <div key={student}>
                                    <Title level={5}>{studentData.find(s => s.id === student)?.name}</Title>
                                    {/* <div style={{ marginTop: "20px" }}>
                                      <FormInput fieldName="test" label={"Type related completed courses"} formInstance={formInstance} />
                                    </div> */}
                                  </div>
                                )}
                              </Form>
                              <Divider />
                            </div>
                          ))}
                        </Col>
                        <Col span={6} offset={18} style={{ textAlign: "right" }}>
                          <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.Invoice)} />
                        </Col>
                      </Row>
                    </Card>
                    : currentStep === StepNames.Invoice ?
                      <Card style={{ margin: "10px 0 0 10px" }} title={"Invoice"}>
                        <Row>
                          {invoiceData ?
                            <Col flex={"auto"}>
                              {
                                invoiceData.products.map((product: any) => (
                                  <div key={product.id}>
                                    <Row>
                                      <Col md={8}><Text strong>{product.title}</Text></Col>
                                      <Col md={8} style={{ textAlign: "right" }}>{renderAmount(product.item_price)} x {product.quantity}</Col>
                                      <Col md={8} style={{ textAlign: "right" }}>
                                        <div>
                                          {renderAmount(product.total_amount)}
                                          {product.total_discount ?
                                            <Popover title={<Text strong>Total Discount {renderAmount(product.total_discount)}</Text>} trigger={"hover"} content={product.discounts.map((d: any) => <p key={d.code}><Text code>{d.code}</Text> {renderAmount(d.amount)}</p>)}>
                                              <span className="glyphicon glyphicon-info-sign ml-2 cursor-pointer" />
                                            </Popover> : null
                                          }
                                        </div>
                                        <div>{product.total_discount ? <Text type="danger" delete>{renderAmount(product.price)}</Text> : null}</div>
                                      </Col>
                                    </Row>
                                    {product.related_products.map((relatedProduct: any) => (
                                      <Row key={relatedProduct.id}>
                                        <Col md={8}><Text>+ {relatedProduct.title}</Text></Col>
                                        <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.item_price)} x {relatedProduct.quantity}</Col>
                                        <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.price)}</Col>
                                      </Row>
                                    ))}
                                    <Divider />
                                  </div>
                                ))
                              }
                              <Row>
                                <Col md={8} style={{ textAlign: "right" }}>
                                  <MetaDrivenForm
                                    meta={meta6}
                                    onApplyChanges={(values) => setCouponCode(values.coupon)}
                                    isWizard
                                    applyButtonLabel="Apply"
                                    showFullForm
                                    isVertical
                                    isModal
                                    stopProducingQueryParams
                                    initialFormValue={{ coupon: couponCode }}
                                  />
                                </Col>
                                <Col md={16} style={{ textAlign: "right" }}>
                                  <div>Sub-total {renderAmount(invoiceData.subtotal)}</div>
                                  <div>Total Discount (-) {renderAmount(invoiceData.total_discount)}</div>
                                  <div style={{ marginTop: "10px" }}><Text strong>Total Payable {renderAmount(invoiceData.total_payable)}</Text></div>
                                </Col>
                              </Row>
                            </Col>
                            : null}
                          <Col span={6} offset={18} style={{ textAlign: "right" }}>
                            <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.PaymentInformation)} />
                          </Col>
                        </Row>
                      </Card>
                      : currentStep === StepNames.PaymentInformation ?
                        <Card style={{ margin: "10px 0 0 10px" }} title={"Payment Details"}>
                          <MetaDrivenForm
                            meta={meta7}
                            onApplyChanges={handleSubmit}
                            isWizard
                            applyButtonLabel="Submit"
                            showFullForm
                            showClearbutton={false}
                            stopProducingQueryParams
                          />
                        </Card>
                        : null}
        </Col>
      </Row>
    </>
  )
}
