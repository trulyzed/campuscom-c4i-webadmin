import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { IField, TEXT } from "@packages/components/lib/Form/common"

interface IPaymentDataStepProps {
  paymentData?: Record<string, any>
  setPaymentData: (...args: any[]) => void
  loading: boolean
}

export const PaymentDataStep = ({
  paymentData,
  setPaymentData,
  loading,
}: IPaymentDataStepProps) => {
  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Payment Details"}>
      <MetaDrivenForm
        meta={meta}
        onApplyChanges={setPaymentData}
        loading={loading}
        initialFormValue={paymentData}
        isWizard
        applyButtonLabel="Submit"
        showFullForm
        showClearbutton={false}
        disableContainerLoader
        stopProducingQueryParams
      />
    </Card>
  )
}

const meta: IField[] = [
  {
    fieldName: "payment_note",
    label: "Payment Note",
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
  {
    fieldName: "payment_ref",
    label: "Payment Ref",
    inputType: TEXT,
    rules: [{ required: true, message: "This field is required!" }]
  },
]