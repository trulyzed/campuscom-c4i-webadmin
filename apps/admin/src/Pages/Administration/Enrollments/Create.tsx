import { Card, Col, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { useCallback, useEffect, useState } from "react"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Steppers } from "~/Component/Feature/Enrollments/Create/Steppers"
import { StudentDataStep } from "~/Component/Feature/Enrollments/Create/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Enrollments/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Enrollments/Create/ProductDataStep"
import { RegistrationDataStep } from "~/Component/Feature/Enrollments/Create/RegistrationDataStep"
import { AdditionalRegistrationDataStep } from "~/Component/Feature/Enrollments/Create/AdditionalRegistrationDataStep"
import { InvoiceDataStep } from "~/Component/Feature/Enrollments/Create/InvoiceDataStep"
import { PaymentDataStep } from "~/Component/Feature/Enrollments/Create/PaymentDataStep"
import { StepNames } from "~/Component/Feature/Enrollments/Create/common"
import { StoreDataStep } from "~/Component/Feature/Enrollments/Create/StoreDataStep"

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(StepNames.StoreInformation)
  const [storeData, setStoreData] = useState<Record<string, any>>()
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const hasRegistrationProduct = productData.some(i => i.unit_type === "registration")

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
    const payload = [...productData.reduce((a, c) => {
      for (const i of (c.related_products || [])) {
        a.push({
          product_id: i.product_id,
          quantity: i.quantity,
          is_related: true,
          related_to: c.id,
          student_email: "",
          is_reservation: false
        })
      }
      if (c.order_type === "seat") {
        a.push({
          product_id: c.id,
          quantity: c.number_of_seats,
          is_related: false,
          related_to: "",
          student_email: "",
          is_reservation: true
        })
      }
      return a
    }, []) as Record<string, any>[], ...registrationData.map(registration => ({
      product_id: registration.product,
      quantity: registration.students.length,
      is_related: false,
      related_to: "",
      student_email: "",
      is_reservation: false
    }))]

    return payload
  }, [registrationData, productData])

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
    setCurrentStep(StepNames.StoreInformation)
    setStoreData(undefined)
    setPurchaserData(undefined)
    setProductData([])
    setStudentData([])
    setRegistrationData([])
    setInvoiceData(undefined)
    setCouponCode(undefined)
  }, [])

  const handleSubmit = useCallback(async (values) => {
    const payload = {
      store: storeData?.store,
      product_ids: productData.map(p => p.id),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
      purchaser: {
        purchasing_for: purchaserData?.purchasing_for,
        ref: purchaserData?.company
      }
    }
    const resp = await EnrollmentQueries.create({ data: payload })
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    }
  }, [generateCartDetailsPayload, generateStudentDetailsPayload, productData, storeData, purchaserData, reset])

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
          <Steppers currentStep={currentStep} onChange={handleStepChange} hasRegistrationProduct={hasRegistrationProduct} />
        </Col>
        <Col md={18} lg={20} xs={24}>
          {currentStep === StepNames.StoreInformation ?
            <StoreDataStep
              setStoreData={setStoreData}
              setCurrentStep={setCurrentStep}
            />
            : (currentStep === StepNames.ProductInformation && storeData) ?
              <ProductDataStep
                storeData={storeData}
                productData={productData}
                setProductData={setProductData}
                setCurrentStep={setCurrentStep}
                hasRegistrationProduct={hasRegistrationProduct}
              />
              : currentStep === StepNames.PurchaserInformation ?
                <PurchaserDataStep
                  setPurchaserData={setPurchaserData}
                  setCurrentStep={setCurrentStep}
                />
                : (currentStep === StepNames.StudentInformation && storeData) ?
                  <StudentDataStep
                    storeData={storeData}
                    studentData={studentData}
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
                      : (currentStep === StepNames.Invoice && storeData) ?
                        <InvoiceDataStep
                          storeData={storeData}
                          invoiceData={invoiceData}
                          couponCode={couponCode}
                          setInvoiceData={setInvoiceData}
                          setCouponCode={setCouponCode}
                          setCurrentStep={setCurrentStep}
                          generateCartDetailsPayload={generateCartDetailsPayload}
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
