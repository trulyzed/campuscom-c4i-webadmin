import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { StepNames } from "./common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"

interface IStoreDataStepProps {
  storeData?: Record<string, any>
  setStoreData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const StoreDataStep = ({
  storeData,
  setStoreData,
  setCurrentStep,
}: IStoreDataStepProps) => {
  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Store Information"}>
      <MetaDrivenForm
        meta={meta}
        onApplyChanges={(values) => {
          setStoreData(values)
          setCurrentStep(StepNames.PurchaserInformation)
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