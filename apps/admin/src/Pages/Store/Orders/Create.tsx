import { Card, Col, notification, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { useCallback, useEffect, useMemo, useState } from "react"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Steppers } from "~/Component/Feature/Orders/Create/Steppers"
import { StudentDataStep } from "~/Component/Feature/Orders/Create/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Orders/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Orders/Create/ProductDataStep"
import { RegistrationDataStep } from "~/Component/Feature/Orders/Create/RegistrationDataStep"
import { AdditionalRegistrationDataStep } from "~/Component/Feature/Orders/Create/AdditionalRegistrationDataStep"
import { InvoiceDataStep } from "~/Component/Feature/Orders/Create/InvoiceDataStep"
import { PaymentDataStep } from "~/Component/Feature/Orders/Create/PaymentDataStep"
import { StepNames } from "~/Component/Feature/Orders/Create/common"
import { StoreDataStep } from "~/Component/Feature/Orders/Create/StoreDataStep"

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(StepNames.StoreInformation)
  const [isProcessing, setIsProcessing] = useState(false)
  const [storeData, setStoreData] = useState<Record<string, any>>()
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const registrationProductData = useMemo(() => productData.filter(i => i.unit === "registration"), [productData])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()

  const hasValidStoreData = !!storeData
  const hasValidProductData = !!productData.length
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = studentData.length >= Math.max(...registrationProductData.map(i => i.quantity))
  const hasValidRegistrationData = registrationProductData.every(i => i.quantity === registrationData.find(j => j.product === i.id)?.students.length)

  useEffect(() => {
    setRegistrationData(registrationData => {
      return registrationData.reduce((a, c) => {
        if (registrationProductData.some(p => p.id === c.product)) {
          c.students = c.students.filter((id: any) => studentData.some(student => student.id === id))
          a.push(c)
        }
        return a
      }, []) as Record<string, any>[]
    })
  }, [registrationProductData, studentData])

  const handleStepChange = useCallback((current) => {
    setCurrentStep(current)
  }, [])

  const generateCartDetailsPayload = useCallback(() => {
    return [...productData.reduce((a, c) => {
      for (const i of (c.related_products || [])) {
        a.push({
          product_id: i.id,
          quantity: i.quantity,
          is_related: true,
          related_to: c.id,
          student_email: "",
          is_reservation: false
        })
      }
      if (c.unit === "seat" || c.unit === "unit") {
        a.push({
          product_id: c.id,
          quantity: c.quantity,
          is_related: false,
          related_to: "",
          student_email: "",
          is_reservation: c.unit === "seat"
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
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
      purchaser_info: {
        first_name: purchaserData?.first_name,
        last_name: purchaserData?.last_name,
        primary_email: purchaserData?.email,
        purchasing_for: {
          type: purchaserData?.purchasing_for,
          ref: purchaserData?.company
        }
      }
    }
    setIsProcessing(true)
    const resp = await EnrollmentQueries.create({ data: payload })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    } else {
      notification.error({ message: "Something went wrong!" })
    }
  }, [generateCartDetailsPayload, generateStudentDetailsPayload, storeData, purchaserData, reset])

  return (
    <>
      {orderRef ?
        <Alert
          className="mb-20"
          type="success"
          message={"Success"}
          description={`Order creation was successful (Order ID: ${orderRef}).`}
          onClose={() => setOrderRef(undefined)}
        />
        : null}
      <Card
        title={
          <Row>
            <Col flex="auto">
              <SidebarMenuTargetHeading level={1} targetID="navigation">
                Create an Order
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
          <Steppers
            currentStep={currentStep}
            onChange={handleStepChange}
            hasValidStoreData={hasValidStoreData}
            hasValidProductData={hasValidProductData}
            hasValidPurchaserData={hasValidPurchaserData}
            hasValidStudentData={hasValidStudentData}
            hasRegistrationProduct={!!registrationProductData.length}
            hasValidRegistrationData={hasValidRegistrationData}
          />
        </Col>
        <Col md={18} lg={20} xs={24}>
          {currentStep === StepNames.StoreInformation ?
            <StoreDataStep
              storeData={storeData}
              setStoreData={setStoreData}
              setCurrentStep={setCurrentStep}
            />
            : (currentStep === StepNames.ProductInformation && storeData) ?
              <ProductDataStep
                storeData={storeData}
                productData={productData}
                setProductData={setProductData}
                setCurrentStep={setCurrentStep}
                hasRegistrationProduct={!!registrationProductData.length}
              />
              : (currentStep === StepNames.PurchaserInformation && storeData) ?
                <PurchaserDataStep
                  storeData={storeData}
                  purchaserData={purchaserData}
                  setPurchaserData={setPurchaserData}
                  setCurrentStep={setCurrentStep}
                />
                : (currentStep === StepNames.StudentInformation && storeData) ?
                  <StudentDataStep
                    storeData={storeData}
                    studentData={studentData}
                    setStudentData={setStudentData}
                    setCurrentStep={setCurrentStep}
                    isValid={hasValidStudentData}
                  />
                  : currentStep === StepNames.RegistrationInformation ?
                    <RegistrationDataStep
                      registrationProductData={registrationProductData}
                      studentData={studentData}
                      registrationData={registrationData}
                      setRegistrationData={setRegistrationData}
                      setCurrentStep={setCurrentStep}
                      isValid={hasValidRegistrationData}
                    />
                    : currentStep === StepNames.AdditionalRegistrationInformation ?
                      <AdditionalRegistrationDataStep
                        registrationProductData={registrationProductData}
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
                            loading={isProcessing}
                          />
                          : null}
        </Col>
      </Row>
    </>
  )
}
