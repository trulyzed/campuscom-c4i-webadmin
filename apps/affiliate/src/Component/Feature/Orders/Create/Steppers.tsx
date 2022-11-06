import { Card, Steps as AntdSteps } from "antd"
import { Steps } from "./Utils/types"

const Step = AntdSteps.Step

interface ISteppersProps {
  steps: Record<keyof typeof Steps, number>
  currentStep: number
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
  steps,
  currentStep,
  onChange,
  hasValidStoreData,
  hasValidProductData,
  hasValidPurchaserData,
  hasValidStudentData,
  hasRegistrationProduct,
  hasValidRegistrationData,
  hasValidAdditionalRegistrationData,
}: ISteppersProps) => {
  const disablePurchaserDataStep = !hasValidStoreData
  const disableProductDataStep = !hasValidPurchaserData || disablePurchaserDataStep
  const disableStudentDataStep = disableProductDataStep || !hasRegistrationProduct
  const disableRegistrationDataStep = !hasRegistrationProduct || !hasValidStudentData
  const disableAdditionalRegistrationDataStep = !hasRegistrationProduct || !hasValidStudentData || !hasValidRegistrationData
  const disableInvoiceDataStep = !hasValidProductData || (hasRegistrationProduct && (disableAdditionalRegistrationDataStep || !hasValidAdditionalRegistrationData))
  const disablePaymentDataStep = disableInvoiceDataStep
  const stepsList: { key: keyof typeof steps; title: string; disabled: boolean; }[] = Object.keys(steps).reduce((a, c) => {
    const key = c as keyof typeof steps
    let title: string | undefined
    let disabled: boolean | undefined

    switch (key) {
      case "StoreInformation":
        title = "Store"
        disabled = false
        break
      case "PurchaserInformation":
        title = "Purchaser"
        disabled = disablePurchaserDataStep
        break
      case "ProductInformation":
        title = "Product"
        disabled = disableProductDataStep
        break
      case "StudentInformation":
        title = "Student"
        disabled = disableStudentDataStep
        break
      case "RegistrationInformation":
        title = "Registration"
        disabled = disableRegistrationDataStep
        break
      case "AdditionalRegistrationInformation":
        title = "Additional Info"
        disabled = disableAdditionalRegistrationDataStep
        break
      case "Invoice":
        title = "Invoice"
        disabled = disableInvoiceDataStep
        break
      case "PaymentInformation":
        title = "Payment"
        disabled = disablePaymentDataStep
        break
    }
    if (title !== undefined && disabled !== undefined && !isNaN(steps[key])) {
      a.push({
        key,
        title,
        disabled,
      })
    }
    return a
  }, [] as { title: string; disabled: boolean; key: keyof typeof steps }[])

  return (
    <Card style={{ marginTop: "10px" }}>
      <AntdSteps direction="vertical" size="small" current={currentStep} onChange={onChange}>
        {stepsList.map(i => (
          <Step key={i.key} title={i.title} disabled={i.disabled} />
        ))}
      </AntdSteps>
    </Card>
  )
}