import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

interface IStudentFormProps {
  storeData: Record<string, any>
  profileQuestions: IField[]
  loading: boolean
  singleOnly?: boolean
  hasStudent: boolean
  onChange: (values: { [key: string]: any }) => void
}

export const StudentForm = ({
  storeData,
  profileQuestions,
  loading,
  singleOnly,
  hasStudent,
  onChange,
}: IStudentFormProps) => {
  return (
    <MetaDrivenForm
      className="form--with-html-label"
      meta={[
        ...getMeta(storeData?.store),
        ...profileQuestions
      ]}
      onApplyChanges={onChange}
      isWizard
      applyButtonLabel={"Add Student"}
      disableApplyButton={singleOnly ? hasStudent : undefined}
      showFullForm
      showClearbutton={false}
      loading={loading}
      stopProducingQueryParams
      disableContainerLoader
      resetOnSubmit
    />
  )
}

const getMeta = (store: string): IField[] => [
  {
    fieldName: "profile",
    label: "Student",
    inputType: DROPDOWN,
    refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: store } }), [ContactQueries.getLookupData]),
    displayKey: "name",
    valueKey: "primary_email",
    rules: [{ required: true, message: "This field is required!" }],
  },
]