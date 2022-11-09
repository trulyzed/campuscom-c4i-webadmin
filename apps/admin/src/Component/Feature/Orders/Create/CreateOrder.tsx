import { Col, notification, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Stepper } from "~/Component/Feature/Orders/Create/Stepper"
import { StudentDataStep } from "~/Component/Feature/Orders/Create/StudentDataStep/StudentDataStep"
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
import { useWatchDataChange } from "./Utils/useWatchDataChange"
import { triggerEvents } from "@packages/utilities/lib/EventBus"
import { SeatBlockQueries } from "@packages/services/lib/Api/Queries/AdminQueries/SeatBlocks"
import { useInitialize } from "./Utils/useInitialize"
import { FormError } from "@packages/components/lib/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"

interface ICreateOrderProps {
  title?: ReactNode
  reservationDetails?: Record<string, any>
  swapRegistration?: boolean
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
}

export const CreateOrder = ({
  title = "Create an Order",
  reservationDetails,
  swapRegistration,
  refreshEventName,
}: ICreateOrderProps) => {
  const { steps } = useSteps(reservationDetails ? "REGISTRATION" : "CREATE_ORDER")
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
  const [couponCode, setCouponCode] = useState<string>()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const [formErrors, setFormErrors] = useState<ISimplifiedApiErrorMessage[]>()
  const hasValidStoreData = !!storeData
  const hasValidProductData = !!productData.length
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = studentData.length >= Math.max(...registrationProductData.map(i => i.quantity))
  const hasValidRegistrationData = registrationProductData.every(i => i.quantity === registrationData.find(j => j.product === i.id)?.students.length)
  const hasValidAdditionalRegistrationData = !!additionalRegistrationData.length
  const { generatePaymentSummaryPayload, generatePayload } = usePayloadGenerator({ storeData, purchaserData, productData, studentData, registrationData, additionalRegistrationData, paymentData, couponCode, reservationDetails })

  useInitialize({ storeData, productData, setOrderDetails, setStoreData, setPurchaserData, setProductData, reservationDetails, orderType: reservationDetails ? "REGISTRATION" : "CREATE_ORDER" })
  useWatchDataChange({ storeData, registrationProductData, studentData, setPurchaserData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData, reservationDetails })

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

  const handleSubmit = useCallback(async () => {
    setIsProcessing(true)
    const resp = await (swapRegistration ? SeatBlockQueries.swapRegistration : OrderQueries.create)({ data: generatePayload() })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      if (refreshEventName) triggerEvents(refreshEventName)
      if (reservationDetails) {
        notification.success({
          message: swapRegistration ? "Successfully swapped" : "Successfully enrolled",
          description: `Order creation was successful (Order ID: ${resp.data.order_ref}).`,
          duration: 0
        })
      }
      reset()
    } else {
      setFormErrors(resp.error)
    }
  }, [generatePayload, swapRegistration, reservationDetails, refreshEventName, reset])

  // Submit payload when payment data changes
  useEffect(() => {
    if (!paymentData) return
    handleSubmit()
    // eslint-disable-next-line
  }, [paymentData])

  return (
    <>
      <Row>
        <Col md={24} xs={24} className={'mt-15'}>
          <SidebarMenuTargetHeading level={2}>
            {title}
          </SidebarMenuTargetHeading>
        </Col>
      </Row>
      {orderRef ?
        <Alert
          className="mt-10"
          type="success"
          message={"Success"}
          description={`Order creation was successful (Order ID: ${orderRef}).`}
          onClose={() => setOrderRef(undefined)}
        />
        : null}
      {(swapRegistration && reservationDetails?.profile) ?
        <Alert
          message={"Following student will be removed"}
          description={`${reservationDetails.profile.name} (${reservationDetails.profile.email})`}
          type={"warning"}
          className={"mt-20"}
        />
        : null}
      {!isProcessing && formErrors?.length ? <FormError errorMessages={formErrors} /> : null}
      <Row>
        <Col md={6} lg={4} xs={24}>
          <Stepper
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
                    setStudentData={setStudentData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    isValid={hasValidStudentData}
                    singleOnly={!!reservationDetails}
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
                          generatePaymentSummaryPayload={generatePaymentSummaryPayload}
                        />
                        : currentStep === steps.PaymentInformation ?
                          <PaymentDataStep
                            invoiceData={invoiceData}
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
