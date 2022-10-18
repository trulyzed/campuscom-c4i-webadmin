import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { Steps } from "./Utils/types"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

interface IStoreDataStepProps {
  storeData?: Record<string, any>
  setStoreData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
}

export const StoreDataStep = ({
  storeData,
  setStoreData,
  currentStep,
  setCurrentStep,
}: IStoreDataStepProps) => {
  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Store Information"}>
      <MetaDrivenForm
        meta={meta}
        onApplyChanges={(values) => {
          setStoreData(values)
          setCurrentStep(currentStep + 1)
        }}
        isWizard
        applyButtonLabel="Continue"
        showFullForm
        showClearbutton={false}
        stopProducingQueryParams
        initialFormValue={storeData}
      />
    </Card>
  )
}


const meta: IField[] = [
  {
    fieldName: "store",
    label: "Store",
    inputType: DROPDOWN,
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }]
  },
]