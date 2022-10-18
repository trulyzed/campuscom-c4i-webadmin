import { useState } from "react"
import { Card } from "antd"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { DROPDOWN, IField, TEXT } from "@packages/components/lib/Form/common"
import { CompanyQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Companies"
import { Steps } from "./Utils/types"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"

interface IPurchaserDataStepProps {
  storeData: Record<string, any>
  purchaserData?: Record<string, any>
  profileQuestions: IField[]
  setPurchaserData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
}

export const PurchaserDataStep = ({
  storeData,
  purchaserData,
  profileQuestions,
  setPurchaserData,
  currentStep,
  setCurrentStep,
}: IPurchaserDataStepProps) => {
  const [selectedPurchaser, setSelectedPurchaser] = useState<Record<string, any>>({ ...purchaserData })

  const meta: IField[] = [
    {
      label: "Purchaser",
      inputType: DROPDOWN,
      fieldName: "purchaser",
      refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: storeData.store } }), [ContactQueries.getLookupData]),
      onSelectedItems: (value, _, lookupData) => {
        const matchedData = lookupData?.find(i => i.id === value)
        setSelectedPurchaser({
          ...selectedPurchaser,
          purchaser: value,
          first_name: matchedData.first_name,
          last_name: matchedData.last_name,
          email: matchedData.primary_email,
        })
      },
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
      refLookupService: QueryConstructor(() => CompanyQueries.getLookupData({ params: { store: storeData.store } }), [CompanyQueries.getLookupData]),
      displayKey: "name",
      valueKey: "id",
      dependencies: ["purchasing_for"],
      onDependencyChange: (value, { toggleField }) => {
        toggleField?.(value?.purchasing_for === "company")
      },
      rules: [{ required: true, message: "This field is required!" }]
    },
    ...profileQuestions
  ]

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Purchaser Information"}>
      <MetaDrivenForm
        className="form--with-html-label"
        meta={meta}
        onApplyChanges={(values) => {
          setPurchaserData(values)
          setCurrentStep(currentStep + 1)
        }}
        isWizard
        applyButtonLabel="Continue"
        showFullForm
        showClearbutton={false}
        stopProducingQueryParams
        initialFormValue={selectedPurchaser}
      />
    </Card>
  )
}
