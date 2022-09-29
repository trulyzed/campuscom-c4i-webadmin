import { Card, Steps } from "antd"
import { StepNames } from "./common"

const Step = Steps.Step

interface ISteppersProps {
  currentStep: StepNames
  onChange: (step: any) => void
  hasRegistrationProduct: boolean
}

export const Steppers = ({ currentStep, onChange, hasRegistrationProduct }: ISteppersProps) => {
  return (
    <Card style={{ marginTop: "10px" }}>
      <Steps direction="vertical" size="small" current={currentStep} onChange={onChange}>
        <Step title="Store" />
        <Step title="Purchaser" />
        <Step title="Product" />
        <Step title="Student" disabled={!hasRegistrationProduct} />
        <Step title="Registration" disabled={!hasRegistrationProduct} />
        <Step title="Additional Info" disabled={!hasRegistrationProduct} />
        <Step title="Invoice" />
        <Step title="Payment" />
      </Steps>
    </Card>
  )
}