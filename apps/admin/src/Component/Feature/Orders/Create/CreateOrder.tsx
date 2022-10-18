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
import { StoreDataStep } from "~/Component/Feature/Orders/Create/StoreDataStep"
import { parseQuestionsMeta } from "@packages/components/lib/Utils/parser"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { usePayloadGenerator } from "~/Component/Feature/Orders/Create/Utils/usePayloadGenerator"
import { useSteps } from "~/Component/Feature/Orders/Create/Utils/useSteps"

interface ICreateOrderProps {
  tokenRegistrationDetails?: Record<string, any>
}

export const CreateOrder = ({
  tokenRegistrationDetails,
}: ICreateOrderProps) => {
  const { steps } = useSteps(!!tokenRegistrationDetails)
  const [currentStep, setCurrentStep] = useState<number>(0)
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
    if (tokenRegistrationDetails) {
      setStoreData({ store: tokenRegistrationDetails.store.id })
      setPurchaserData({
        first_name: tokenRegistrationDetails.purchaser.first_name,
        last_name: tokenRegistrationDetails.purchaser.last_name,
        email: tokenRegistrationDetails.purchaser.primary_email,
        purchaser: tokenRegistrationDetails.purchaser.id,
        purchasing_for: tokenRegistrationDetails.purchaser.purchasing_for?.type,
        company: tokenRegistrationDetails.purchaser.purchasing_for?.ref,
        ...Object.keys(tokenRegistrationDetails.purchaser.extra_info).reduce((a, c) => {
          a[`profile_question__${c}`] = (tokenRegistrationDetails.purchaser.extra_info as Record<string, any>)[c]
          return a
        }, {} as Record<string, any>)
      })
      setProductData([
        {
          id: tokenRegistrationDetails.product.id,
          title: tokenRegistrationDetails.product.name,
          quantity: 1,
          order_type: "registration",
          product_type: "section",
          unit: "registration",
          related_products: []
        }
      ])
    }
  }, [tokenRegistrationDetails])

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
    setCurrentStep(0)
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

  const handleStudentDataChange = useCallback((value) => {
    setStudentData(value)
    if (tokenRegistrationDetails) {
      setRegistrationData([{
        product: tokenRegistrationDetails.product.id,
        students: (value as any[]).map(i => i.id)
      }])
    }
  }, [tokenRegistrationDetails])

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
            steps={steps}
            currentStep={currentStep}
            onChange={setCurrentStep}
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
          {currentStep === steps.StoreInformation ?
            <StoreDataStep
              steps={steps}
              storeData={storeData}
              setStoreData={setStoreData}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
            : (currentStep === steps.ProductInformation && storeData) ?
              <ProductDataStep
                steps={steps}
                storeData={storeData}
                productData={productData}
                setProductData={setProductData}
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                hasRegistrationProduct={!!registrationProductData.length}
              />
              : (currentStep === steps.PurchaserInformation && storeData) ?
                <PurchaserDataStep
                  steps={steps}
                  storeData={storeData}
                  purchaserData={purchaserData}
                  profileQuestions={parseQuestionsMeta((orderDetails?.profile_questions || []).filter((i: any) => i.respondent_type === "purchaser"), "profile_question__")}
                  setPurchaserData={setPurchaserData}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                />
                : (currentStep === steps.StudentInformation && storeData) ?
                  <StudentDataStep
                    steps={steps}
                    storeData={storeData}
                    studentData={studentData}
                    profileQuestions={parseQuestionsMeta((orderDetails?.profile_questions || []).filter((i: any) => i.respondent_type === "student"), "profile_question__")}
                    setStudentData={handleStudentDataChange}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    isValid={hasValidStudentData}
                    singleOnly={!!tokenRegistrationDetails}
                  />
                  : currentStep === steps.RegistrationInformation ?
                    <RegistrationDataStep
                      steps={steps}
                      registrationProductData={registrationProductData}
                      studentData={studentData}
                      registrationData={registrationData}
                      setRegistrationData={setRegistrationData}
                      currentStep={currentStep}
                      setCurrentStep={setCurrentStep}
                      isValid={hasValidRegistrationData}
                    />
                    : currentStep === steps.AdditionalRegistrationInformation ?
                      <AdditionalRegistrationDataStep
                        steps={steps}
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
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                      />
                      : (currentStep === steps.Invoice && storeData) ?
                        <InvoiceDataStep
                          steps={steps}
                          storeData={storeData}
                          invoiceData={invoiceData}
                          couponCode={couponCode}
                          setInvoiceData={setInvoiceData}
                          setCouponCode={setCouponCode}
                          currentStep={currentStep}
                          setCurrentStep={setCurrentStep}
                          generateCartDetailsPayload={generateCartDetailsPayload}
                        />
                        : currentStep === steps.PaymentInformation ?
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
