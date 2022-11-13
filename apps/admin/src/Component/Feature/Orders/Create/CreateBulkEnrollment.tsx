import { Col, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Stepper } from "~/Component/Feature/Orders/Create/Stepper"
import { StudentDataStep } from "~/Component/Feature/Orders/Create/StudentDataStep/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Orders/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Orders/Create/ProductDataStep"
import { AdditionalRegistrationDataStep } from "~/Component/Feature/Orders/Create/AdditionalRegistrationDataStep"
import { InvoiceDataStep } from "~/Component/Feature/Orders/Create/InvoiceDataStep"
import { SummaryDataStep } from "./SummaryDataStep"
import { PaymentDataStep } from "~/Component/Feature/Orders/Create/PaymentDataStep"
import { StoreDataStep } from "~/Component/Feature/Orders/Create/StoreDataStep"
import { parseQuestionsMeta } from "@packages/components/lib/Utils/parser"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"
import { usePayloadGenerator } from "~/Component/Feature/Orders/Create/Utils/usePayloadGenerator"
import { useSteps } from "~/Component/Feature/Orders/Create/Utils/useSteps"
import { useWatchDataChange } from "./Utils/useWatchDataChange"
import { triggerEvents } from "@packages/utilities/lib/EventBus"
import { useInitialize } from "./Utils/useInitialize"
import { FormError } from "@packages/components/lib/Form/FormError"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"

interface ICreateBulkEnrollmentProps {
  title?: ReactNode
  refreshEventName?: string | symbol | symbol[] | string[] | Array<string | symbol>
}

export const CreateBulkEnrollment = ({
  title = "Create Bulk Enrollment",
  refreshEventName,
}: ICreateBulkEnrollmentProps) => {
  const { steps } = useSteps('CREATE_BULK_ENROLLMENT')
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
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = !!studentData.length
  const hasValidProductData = !!productData.length
  const hasValidRegistrationData = hasValidProductData
  const hasValidAdditionalRegistrationData = !!additionalRegistrationData.length
  const { generatePaymentSummaryPayload, generatePayload } = usePayloadGenerator({ storeData, purchaserData, productData, studentData, registrationData, additionalRegistrationData, paymentData, couponCode })

  useInitialize({ storeData, productData, setOrderDetails, setStoreData, setPurchaserData, setProductData, orderType: 'CREATE_BULK_ENROLLMENT' })
  useWatchDataChange({ storeData, registrationProductData, studentData, setPurchaserData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData, singleProduct: true })

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
    const resp = await OrderQueries.createBulk({ data: generatePayload() })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      if (refreshEventName) triggerEvents(refreshEventName)
      reset()
    } else {
      setFormErrors(resp.error)
    }
  }, [generatePayload, refreshEventName, reset])

  // Submit payload when payment data changes
  useEffect(() => {
    if (!paymentData) return
    handleSubmit()
    // eslint-disable-next-line
  }, [paymentData])

  return (
    <>
      <Row gutter={[0, 15]}>
        {title ?
          <Col md={24} xs={24} className={"mt-15"}>
            <SidebarMenuTargetHeading level={2}>
              {title}
            </SidebarMenuTargetHeading>
          </Col>
          : null}
        {orderRef ?
          <Col md={24} xs={24}>
            <Alert
              type="success"
              message={"Success"}
              description={`Order creation was successful (Order ID: ${orderRef}).`}
              onClose={() => setOrderRef(undefined)}
            />
          </Col>
          : !isProcessing && formErrors?.length ?
            <Col md={24} xs={24}><FormError errorMessages={formErrors} /></Col>
            : null}
      </Row>
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
                onlySectionProducts
                onlyRegistrationProducts
                noQuantityInput
                noRelatedProducts
                canSearch
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
                  hidePurchaseFor
                />
                : (currentStep === steps.StudentInformation && storeData) ?
                  <StudentDataStep
                    steps={steps}
                    registrationProductData={registrationProductData}
                    storeData={storeData}
                    studentData={studentData}
                    profileQuestions={[]}
                    setStudentData={setStudentData}
                    setRegistrationData={setRegistrationData}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    isValid={hasValidStudentData}
                    canUploadBulk
                    canSearch
                    autoSetRegistrationData
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
                      : (currentStep === steps.Summary && storeData) ?
                        <SummaryDataStep
                          steps={steps}
                          invoiceData={invoiceData}
                          couponCode={couponCode}
                          setInvoiceData={setInvoiceData}
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
