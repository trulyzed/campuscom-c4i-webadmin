import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { StepNames } from "./common"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { useState } from "react"

interface IPurchaserDataStepProps {
  storeData: Record<string, any>
  setPurchaserData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const PurchaserDataStep = ({
  storeData,
  setPurchaserData,
  setCurrentStep,
}: IPurchaserDataStepProps) => {
  const [selectedPurchaser, setSelectedPurchaser] = useState<Record<string, any>>()

  const meta: IField[] = [
    {
      label: "Purchaser",
      inputType: DROPDOWN,
      fieldName: "purchaser",
      refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: storeData.store } }), [ContactQueries.getLookupData]),
      onSelectedItems: (value, _, lookupData) => setSelectedPurchaser(lookupData?.find(i => i.id === value)),
      displayKey: "name",
      valueKey: "id",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      fieldName: "first_name",
      label: "First Name",
      inputType: TEXT,
      disabled: true,
    },
    {
      fieldName: "last_name",
      label: "Last Name",
      inputType: TEXT,
      disabled: true,
    },
    {
      fieldName: "email",
      label: "Email",
      inputType: TEXT,
      disabled: true,
    },
    {
      fieldName: "purchasing_for",
      label: "Purchashing For",
      inputType: DROPDOWN,
      options: [
        { label: "Others", value: "others" },
        { label: "Company", value: "company" },
      ],
      rules: [{ required: true, message: "This field is required!" }]
    },
    {
      fieldName: "company",
      label: "Company",
      inputType: DROPDOWN,
      refLookupService: CompanyQueries.getLookupData,
      displayKey: "name",
      valueKey: "id",
      dependencies: ["purchasing_for"],
      onDependencyChange: (value, { toggleField }) => {
        toggleField?.(value?.purchasing_for === "company")
      },
      rules: [{ required: true, message: "This field is required!" }]
    },
    {
      fieldName: "gender",
      label: "What is your gender?",
      inputType: DROPDOWN,
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Others", value: "others" },
      ],
    },
  ]

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Purchaser Information"}>
      <MetaDrivenForm
        meta={meta}
        onApplyChanges={(values) => {
          setPurchaserData(values)
          setCurrentStep(StepNames.ProductInformation)
        }}
        isWizard
        applyButtonLabel="Continue"
        showFullForm
        showClearbutton={false}
        stopProducingQueryParams
        initialFormValue={{
          ...selectedPurchaser,
          purchaser: selectedPurchaser?.id,
          first_name: selectedPurchaser?.first_name,
          last_name: selectedPurchaser?.last_name,
          email: selectedPurchaser?.primary_email
        }}
      />
    </Card>
  )
}
