import { Card, Col, notification, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
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
import { eventBus } from "@packages/utilities/lib/EventBus"
import { useWatchDataChange } from "./Utils/useWatchDataChange"

interface ICreateOrderProps {
  title?: ReactNode
  registrationDetails?: Record<string, any>
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
}

export const CreateOrder = ({
  title = "Create an Order",
  registrationDetails,
  refreshEventName,
}: ICreateOrderProps) => {
  const { steps } = useSteps(!!registrationDetails)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderDetails, setOrderDetails] = useState<Record<string, any>>()
  const [storeData, setStoreData] = useState<Record<string, any>>()
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const registrationProductData = useMemo(() => productData.filter(i => i.unit === "registration"), [productData])
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [additionalRegistrationData, setAdditionalRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [paymentData, setPaymentData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const hasValidStoreData = !!storeData
  const hasValidProductData = !!productData.length
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = studentData.length >= Math.max(...registrationProductData.map(i => i.quantity))
  const hasValidRegistrationData = registrationProductData.every(i => i.quantity === registrationData.find(j => j.product === i.id)?.students.length)
  const hasValidAdditionalRegistrationData = !!additionalRegistrationData.length
  useWatchDataChange({ storeData, registrationProductData, studentData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData, isRegistration: !!registrationDetails })
  const { generateCartDetailsPayload, generatePayload } = usePayloadGenerator({
    storeData,
    purchaserData,
    productData,
    studentData,
    registrationData,
    additionalRegistrationData,
    paymentData,
    ...registrationDetails?.token && {
      options: {
        reservationToken: registrationDetails.token
      }
    }
  })

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

  // Initialize data for seat registration
  useEffect(() => {
    if (registrationDetails) {
      setStoreData({ store: registrationDetails.store.id })
      setPurchaserData({
        first_name: registrationDetails.purchaser.first_name,
        last_name: registrationDetails.purchaser.last_name,
        email: registrationDetails.purchaser.primary_email,
        purchaser: registrationDetails.purchaser.id,
        purchasing_for: registrationDetails.purchaser.purchasing_for?.type,
        company: registrationDetails.purchaser.purchasing_for?.ref,
        ...Object.keys(registrationDetails.purchaser.extra_info || {}).reduce((a, c) => {
          a[`profile_question__${c}`] = (registrationDetails.purchaser.extra_info as Record<string, any>)[c]
          return a
        }, {} as Record<string, any>)
      })
      setProductData([
        {
          id: registrationDetails.product.id,
          title: registrationDetails.product.name,
          quantity: 1,
          order_type: "registration",
          product_type: "section",
          unit: "registration",
          related_products: []
        }
      ])
    }
  }, [registrationDetails])

  const handleStudentDataChange = useCallback((value) => {
    setStudentData(value)
    if (registrationDetails) {
      setRegistrationData([{
        product: registrationDetails.product.id,
        students: (value as any[]).map(i => i.id)
      }])
    }
  }, [registrationDetails])

  const reset = useCallback(() => {
    setCurrentStep(0)
    setStoreData(undefined)
    setProductData([])
    setPurchaserData(undefined)
    setStudentData([])
    setRegistrationData([])
    setAdditionalRegistrationData([])
    setInvoiceData(undefined)
    setPaymentData(undefined)
    setCouponCode(undefined)
  }, [])

  const publishEvents = useCallback(() => {
    if (Array.isArray(refreshEventName)) {
      refreshEventName.forEach(i => {
        eventBus.publish(i)
      })
    } else if (typeof refreshEventName === "string") eventBus.publish(refreshEventName, {})
  }, [refreshEventName])

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true)
    const resp = await OrderQueries.create({ data: generatePayload() })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      publishEvents()
      reset()
    } else {
      notification.error({ message: "Something went wrong!" })
    }
  }, [generatePayload, publishEvents, reset])

  // Submit payload when payment data changes
  useEffect(() => {
    if (!paymentData) return
    handleSubmit()
    // eslint-disable-next-line
  }, [paymentData])

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
                {title}
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
                    singleOnly={!!registrationDetails}
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
                            paymentData={paymentData}
                            setPaymentData={setPaymentData}
                            loading={isProcessing}
                          />
                          : null}
        </Col>
      </Row>
    </>
  )
}
