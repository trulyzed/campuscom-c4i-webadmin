import { Button, Card, Col, notification, Row, Space } from "antd"
import Title from "antd/lib/typography/Title"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { IOrderType, Steps } from "./Utils/types"
import { useCallback, useMemo, useState } from "react"
import { UploadBulkStudentData } from "./UploadBulkStudentData"

interface IStudentDataStepProps {
  storeData: Record<string, any>
  studentData: Record<string, any>[]
  profileQuestions: IField[]
  setStudentData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
  isValid: boolean
  singleOnly: boolean
  type?: IOrderType
}

export const StudentDataStep = ({
  storeData,
  studentData,
  profileQuestions,
  setStudentData,
  currentStep,
  setCurrentStep,
  isValid,
  singleOnly,
  type,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const tableActions = useMemo(() => {
    return [
      ...type === 'CREATE_BULK_ENROLLMENT' ? [<UploadBulkStudentData setStudentData={setStudentData} />] : []
    ]
  }, [type, setStudentData])

  const handleStudentDataChange = useCallback(async (value) => {
    const { profile, ...formValues } = value
    if (studentData.some(i => i.primary_email === profile)) {
      notification.warning({ message: "Student already chosen" })
      return
    }
    setIsProcessing(true)
    const resp = await ContactQueries.getList({ params: { primary_email: profile } })
    const contact = resp.data?.[0]
    if (!contact) return
    setIsProcessing(false)
    if (resp.success) setStudentData([
      {
        first_name: contact.first_name,
        last_name: contact.last_name,
        name: contact.name,
        primary_email: contact.primary_email,
        ...formValues
      },
      ...studentData,
    ])
  }, [studentData, setStudentData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
      <Row>
        <Col xs={24}>
          <MetaDrivenForm
            className="form--with-html-label"
            meta={[
              ...getMeta(storeData?.store),
              ...profileQuestions
            ]}
            onApplyChanges={handleStudentDataChange}
            isWizard
            applyButtonLabel={"Add Student"}
            disableApplyButton={singleOnly ? studentData.length > 0 : undefined}
            showFullForm
            showClearbutton={false}
            loading={isProcessing}
            stopProducingQueryParams
            disableContainerLoader
            resetOnSubmit
          />
        </Col>
      </Row>
      <Row>
        <Col xs={24}>
          <ResponsiveTable
            title={() => <Title level={5}>Selected Students</Title>}
            columns={[
              {
                title: 'Student',
                dataIndex: 'name',
                sorter: (a: any, b: any) => a.name - b.name
              },
              {
                title: 'Action',
                dataIndex: "action",
                render: (_, record: any) => (
                  <ContextAction
                    type="delete"
                    tooltip="Delete Profile"
                    onClick={() => setStudentData(studentData.filter(i => i.primary_email !== record.primary_email))}
                  />
                )
              },
            ]}
            dataSource={studentData}
            rowKey={"primary_email"}
            hidePagination
            hideSettings
            actions={tableActions}
          />
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Space>
            <Button style={{ marginTop: "20px", }} disabled={!isValid} type="primary" children={"Continue"} onClick={() => setCurrentStep(currentStep + 1)} />
          </Space>
        </Col>
      </Row>
    </Card>
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