import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { IField, TEXT } from "@packages/components/lib/Form/common"

interface IPaymentDataStepProps {
  onSubmit: (values: { [key: string]: any }) => void
}

export const PaymentDataStep = ({
  onSubmit
}: IPaymentDataStepProps) => {
  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Payment Details"}>
      <MetaDrivenForm
        meta={meta}
        onApplyChanges={onSubmit}
        isWizard
        applyButtonLabel="Submit"
        showFullForm
        showClearbutton={false}
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