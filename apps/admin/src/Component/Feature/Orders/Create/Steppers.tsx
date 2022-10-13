import { Card, Steps } from "antd"
import { StepNames } from "./common"

const Step = Steps.Step

interface ISteppersProps {
  currentStep: StepNames
  onChange: (step: any) => void
  hasValidStoreData: boolean
  hasValidProductData: boolean
  hasValidPurchaserData: boolean
  hasValidStudentData: boolean
  hasRegistrationProduct: boolean
  hasValidRegistrationData: boolean
  hasValidAdditionalRegistrationData: boolean
}

export const Steppers = ({
  currentStep,
  onChange,
  hasValidStoreData,
  hasValidProductData,
  hasValidPurchaserData,
  hasValidStudentData,
  hasRegistrationProduct,
  hasValidRegistrationData,
  hasValidAdditionalRegistrationData
}: ISteppersProps) => {
  const disablePurchaserDataStep = !hasValidStoreData
  const disableProductDataStep = !hasValidPurchaserData || disablePurchaserDataStep
  const disableStudentDataStep = disableProductDataStep || !hasRegistrationProduct
  const disableRegistrationDataStep = !hasRegistrationProduct || !hasValidStudentData
  const disableAdditionalRegistrationDataStep = !hasRegistrationProduct || !hasValidStudentData || !hasValidRegistrationData
  const disableInvoiceDataStep = !hasValidProductData || (hasRegistrationProduct && (disableAdditionalRegistrationDataStep || !hasValidAdditionalRegistrationData))
  const disablePaymentDataStep = disableInvoiceDataStep

  return (
    <Card style={{ marginTop: "10px" }}>
      <Steps direction="vertical" size="small" current={currentStep} onChange={onChange}>
        <Step title="Store" />
        <Step title="Purchaser" disabled={disablePurchaserDataStep} />
        <Step title="Product" disabled={disableProductDataStep} />
        <Step title="Student" disabled={disableStudentDataStep} />
        <Step title="Registration" disabled={disableRegistrationDataStep} />
        <Step title="Additional Info" disabled={disableAdditionalRegistrationDataStep} />
        <Step title="Invoice" disabled={disableInvoiceDataStep} />
        <Step title="Payment" disabled={disablePaymentDataStep} />
      </Steps>
    </Card>
  )
}