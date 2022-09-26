import { Button, Card, Col, Row, Space } from "antd"
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
  setStudentData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const StudentDataStep = ({
  storeData,
  studentData,
  setStudentData,
  setCurrentStep,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStudentDataChange = useCallback(async (value) => {
    setIsProcessing(true)
    const { data } = await StudentQueries.getSingle({ params: { id: value.profile } })
    setIsProcessing(false)
    setStudentData([...studentData, data])
  }, [studentData, setStudentData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
      <Row>
        <Col xs={24}>
          <MetaDrivenForm
            meta={getMeta(storeData?.store)}
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
            <Button style={{ marginTop: "20px", }} disabled={!studentData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.RegistrationInformation)} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}


const getMeta = (storeData: string): IField[] => [
  {
    fieldName: "profile",
    label: "Student",
    inputType: DROPDOWN,
    refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: storeData } }), [ContactQueries.getLookupData]),
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
  },
]