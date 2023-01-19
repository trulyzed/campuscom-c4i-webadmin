import { useCallback } from "react"
import Papa from "papaparse"
import { CUSTOM_FIELD, IField } from "@packages/components/lib/Form/common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"


interface IUploadBulkStudentDataProps {
  setStudentData: (...args: any[]) => void
}

export const UploadBulkStudentData = ({
  setStudentData
}: IUploadBulkStudentDataProps) => {
  const handleFormSubmit = useCallback((value) => {
    if (value?.file?.[0]) {
      Papa.parse(value.file[0], {
        complete: (results) => {
          setStudentData((prevData: Record<string, any>[]) => {
            return (results.data as string[][]).reduce((a, c, idx) => {
              const [firstName, lastName, primaryEmail] = c as string[]
              if (idx > 0 && primaryEmail && !a.find(i => i.primary_email === primaryEmail)) {
                a = [{
                  name: `${lastName}, ${firstName} (${primaryEmail})`,
                  first_name: firstName,
                  last_name: lastName,
                  primary_email: primaryEmail,
                }, ...a]
              }
              return a
            }, [...prevData] as Record<string, any>[])
          })
        }
      })
    }
  }, [setStudentData])

  return (
    <MetaDrivenForm
      meta={formMeta}
      onApplyChanges={handleFormSubmit}
      applyButtonLabel={"Upload"}
      stopProducingQueryParams
      isVertical
    />
  )
}

const formMeta: IField[] = [
  {
    fieldName: 'file',
    label: 'File',
    inputType: 'FILE',
    accept: '.csv',
    rules: [{ required: true, message: "This field is required!" }],
    colSpan: 10
  },
  {
    label: 'Contact file format',
    inputType: CUSTOM_FIELD,
    fieldName: 'contact_file_format',
    customFilterComponent: () => renderLink(`${process.env.REACT_APP_CDN_URL}samples/sample-contact.csv`, 'Download Sample', false, true),
    formItemStyle: { marginBottom: '5px' },
    colSpan: 14,
    labelColSpan: 24
  },
]