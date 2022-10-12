import { Button, Card, Col, notification, Row, Space } from "antd"
import Title from "antd/lib/typography/Title"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { DROPDOWN, IField } from "@packages/components/lib/Form/common"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StudentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Students"
import { StepNames } from "./common"
import { useCallback, useState } from "react"

interface IStudentDataStepProps {
  storeData: Record<string, any>
  studentData: Record<string, any>[]
  profileQuestions: IField[]
  setStudentData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
  isValid: boolean
}

export const StudentDataStep = ({
  storeData,
  studentData,
  profileQuestions,
  setStudentData,
  setCurrentStep,
  isValid,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStudentDataChange = useCallback(async (value) => {
    const { profile, ...formValues } = value
    if (studentData.some(i => i.id === profile)) {
      notification.warning({ message: "Student already chosen" })
      return
    }
    setIsProcessing(true)
    const resp = await StudentQueries.getSingle({ params: { id: profile } })
    setIsProcessing(false)
    if (resp.success) setStudentData([
      {
        id: resp.data.id,
        first_name: resp.data.first_name,
        last_name: resp.data.last_name,
        name: resp.data.name,
        primary_email: resp.data.primary_email,
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
            meta={[
              ...getMeta(storeData?.store),
              ...profileQuestions
            ]}
            onApplyChanges={handleStudentDataChange}
            isWizard
            applyButtonLabel={"Add Student"}
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
                    onClick={() => setStudentData(studentData.filter(i => i.id !== record.id))}
                  />
                )
              },
            ]}
            dataSource={studentData}
            rowKey={"id"}
            hidePagination
            hideSettings
          />
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Space>
            <Button style={{ marginTop: "20px", }} disabled={!isValid} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.RegistrationInformation)} />
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
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
]