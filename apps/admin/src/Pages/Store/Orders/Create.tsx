import { Card, Col, notification, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { useCallback, useEffect, useMemo, useState } from "react"
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
import { parseQuestionsMeta } from "@packages/components/lib/Utils/parser"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { usePayloadGenerator } from "~/Component/Feature/Orders/Create/Hooks/usePayloadGenerator"

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(StepNames.StoreInformation)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderDetails, setOrderDetails] = useState<Record<string, any>>()
  const [storeData, setStoreData] = useState<Record<string, any>>()
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const registrationProductData = useMemo(() => productData.filter(i => i.unit === "registration"), [productData])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [additionalRegistrationData, setAdditionalRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const hasValidStoreData = !!storeData
  const hasValidProductData = !!productData.length
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = studentData.length >= Math.max(...registrationProductData.map(i => i.quantity))
  const hasValidRegistrationData = registrationProductData.every(i => i.quantity === registrationData.find(j => j.product === i.id)?.students.length)
  const hasValidAdditionalRegistrationData = !!additionalRegistrationData.length
  const { generatePurchaserDetailsPayload, generateStudentDetailsPayload, generateRegistrationDetailsPayload, generateCartDetailsPayload } = usePayloadGenerator({
    purchaserData,
    productData,
    studentData,
    registrationData,
    additionalRegistrationData
  })

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

  const getOrderDetails = useCallback(async () => {
    if (!storeData?.store) {
      setOrderDetails(undefined)
      return
    }
    const productIds = productData.map(i => i.id)
    setIsProcessing(true)
    const resp = await OrderQueries.getCreatableOrderDetails({ data: { product_ids: productIds, store: storeData.store } })
    setIsProcessing(false)
    if (resp.success) setOrderDetails(resp.data)
    else setOrderDetails(undefined)
  }, [storeData, productData])

  useEffect(() => {
    getOrderDetails()
  }, [getOrderDetails])

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
      purchaser_info: generatePurchaserDetailsPayload(),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      registration_details: generateRegistrationDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
    }
    setIsProcessing(true)
    const resp = await OrderQueries.create({ data: payload })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    } else {
      notification.error({ message: "Something went wrong!" })
    }
  }, [generatePurchaserDetailsPayload, generateCartDetailsPayload, generateStudentDetailsPayload, generateRegistrationDetailsPayload, storeData, reset])

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
            hasValidAdditionalRegistrationData={hasValidAdditionalRegistrationData}
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
                  profileQuestions={parseQuestionsMeta((orderDetails?.profile_questions || []).filter((i: any) => i.respondent_type === "purchaser"), "profile_question__")}
                  setPurchaserData={setPurchaserData}
                  setCurrentStep={setCurrentStep}
                />
                : (currentStep === StepNames.StudentInformation && storeData) ?
                  <StudentDataStep
                    storeData={storeData}
                    studentData={studentData}
                    profileQuestions={parseQuestionsMeta((orderDetails?.profile_questions || []).filter((i: any) => i.respondent_type === "student"), "profile_question__")}
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
                        registrationQuestions={((orderDetails?.products || []) as any[]).map(i => ({
                          product: i.id,
                          meta: parseQuestionsMeta((i.registration_questions || []))
                        }))}
                        registrationProducts={((orderDetails?.products || []) as any[]).map(i => ({
                          parent: i.id,
                          products: (i.related_products as any[]).filter(i => i.relation_type === "registration")
                        }))}
                        additionalRegistrationData={additionalRegistrationData}
                        setAdditionalRegistrationData={setAdditionalRegistrationData}
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
