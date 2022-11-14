import { ReactNode, useCallback, useMemo, useState } from "react"
import { Col, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Stepper } from "~/Component/Feature/Orders/Create/Stepper"
import { StudentDataStep } from "~/Component/Feature/Orders/Create/StudentDataStep/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Orders/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Orders/Create/ProductDataStep"
import { SummaryDataStep } from "./SummaryDataStep"
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
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const [formErrors, setFormErrors] = useState<ISimplifiedApiErrorMessage[]>()
  const hasValidStoreData = !!storeData
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = !!studentData.length
  const hasValidProductData = !!productData.length
  const hasValidRegistrationData = hasValidProductData
  const { generatePayload } = usePayloadGenerator({ storeData, purchaserData, productData, studentData, registrationData })

  useInitialize({ storeData, productData, setOrderDetails, setStoreData, setPurchaserData, setProductData, orderType: 'CREATE_BULK_ENROLLMENT' })
  useWatchDataChange({ storeData, registrationProductData, studentData, setPurchaserData, setProductData, setStudentData, setRegistrationData, singleProduct: true })

  const reset = useCallback(() => {
    setCurrentStep(0)
    setStoreData(undefined)
    setProductData([])
    setPurchaserData(undefined)
    setStudentData([])
    setRegistrationData([])
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
                  : (currentStep === steps.Summary && storeData) ?
                    <SummaryDataStep
                      storeData={storeData}
                      productData={productData}
                      studentData={studentData}
                      steps={steps}
                      onSubmit={handleSubmit}
                      loading={isProcessing}
                    />
                    : null}
        </Col>
      </Row>
    </>
  )
}
