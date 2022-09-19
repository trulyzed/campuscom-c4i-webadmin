import { Card, Col, Row, Steps } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { useCallback, useEffect, useState } from "react"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { StudentDataStep } from "~/Component/Feature/Enrollments/Create/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Enrollments/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Enrollments/Create/ProductDataStep"
import { RegistrationDataStep } from "~/Component/Feature/Enrollments/Create/RegistrationDataStep"
import { AdditionalRegistrationDataStep } from "~/Component/Feature/Enrollments/Create/AdditionalRegistrationDataStep"
import { InvoiceDataStep } from "~/Component/Feature/Enrollments/Create/InvoiceDataStep"
import { PaymentDataStep } from "~/Component/Feature/Enrollments/Create/PaymentDataStep"
import { StepNames } from "~/Component/Feature/Enrollments/Create/common"

const { Step } = Steps

export const Create = () => {
  const [store, setStore] = useState()
  const [currentStep, setCurrentStep] = useState(StepNames.ProductInformation)
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [reservationData, setReservationData] = useState<Record<string, any>>()
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()

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

  const handleStepChange = useCallback((current) => {
    setCurrentStep(current)
  }, [])

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

  const reset = useCallback(() => {
    setCurrentStep(StepNames.ProductInformation)
    setStore(undefined)
    setProductData([])
    setStudentData([])
    setRegistrationData([])
    setInvoiceData(undefined)
    setCouponCode(undefined)
  }, [])

  const handleSubmit = useCallback(async (values) => {
    const payload = {
      store,
      product_ids: productData.map(p => p.id),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
    }
    const resp = await EnrollmentQueries.create({ data: payload })
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    }
  }, [generateCartDetailsPayload, generateStudentDetailsPayload, productData, store, reset])

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
        <Col md={6} lg={4} xs={24}>
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
        <Col md={18} lg={20} xs={24}>
          {currentStep === StepNames.ProductInformation ?
            <ProductDataStep
              productData={productData}
              setStore={setStore}
              setProductData={setProductData}
              setCurrentStep={setCurrentStep}
            />
            : currentStep === StepNames.YourInformation ?
              <PurchaserDataStep
                setPurchaserData={setPurchaserData}
                setCurrentStep={setCurrentStep}
              />
              : (currentStep === StepNames.StudentInformation && store) ?
                <StudentDataStep
                  store={store}
                  purchaserData={purchaserData}
                  reservationData={reservationData}
                  studentData={studentData}
                  setReservationData={setReservationData}
                  setStudentData={setStudentData}
                  setCurrentStep={setCurrentStep}
                />
                : currentStep === StepNames.RegistrationInformation ?
                  <RegistrationDataStep
                    productData={productData}
                    studentData={studentData}
                    registrationData={registrationData}
                    setRegistrationData={setRegistrationData}
                    setCurrentStep={setCurrentStep}
                  />
                  : currentStep === StepNames.AdditionalRegistrationInformation ?
                    <AdditionalRegistrationDataStep
                      productData={productData}
                      studentData={studentData}
                      registrationData={registrationData}
                      setCurrentStep={setCurrentStep}
                    />
                    : (currentStep === StepNames.Invoice && store) ?
                      <InvoiceDataStep
                        store={store}
                        invoiceData={invoiceData}
                        couponCode={couponCode}
                        registrationData={registrationData}
                        generateCartDetailsPayload={generateCartDetailsPayload}
                        setInvoiceData={setInvoiceData}
                        setCouponCode={setCouponCode}
                        setCurrentStep={setCurrentStep}
                      />
                      : currentStep === StepNames.PaymentInformation ?
                        <PaymentDataStep
                          onSubmit={handleSubmit}
                        />
                        : null}
        </Col>
      </Row>
    </>
  )
}
