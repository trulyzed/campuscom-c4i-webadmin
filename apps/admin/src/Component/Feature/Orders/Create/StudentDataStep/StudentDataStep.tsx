import { useCallback, useMemo, useState } from "react"
import { Button, Card, Col, notification, Row, Space } from "antd"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { IField, TEXT } from "@packages/components/lib/Form/common"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { Steps } from "~/Component/Feature/Orders/Create/Utils/types"
import { UploadBulkStudentData } from "./UploadBulkStudentData"
import { StudentForm } from "./StudentForm"
import { LookupOpenButton } from "@packages/components/lib/Modal/LookupModal/LookupOpenButton"
import { getContactListTableColumns } from "~/TableSearchMeta/Contact/ContactListTableColumns"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"


interface IStudentDataStepProps {
  storeData: Record<string, any>
  registrationProductData?: Record<string, any>[]
  studentData: Record<string, any>[]
  profileQuestions: IField[]
  setStudentData: (...args: any[]) => void
  setRegistrationData?: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
  isValid: boolean
  singleOnly?: boolean
  canUploadBulk?: boolean
  canSearch?: boolean
  autoSetRegistrationData?: boolean
}

export const StudentDataStep = ({
  storeData,
  registrationProductData,
  studentData,
  profileQuestions,
  setStudentData,
  setRegistrationData,
  currentStep,
  setCurrentStep,
  isValid,
  singleOnly,
  canUploadBulk,
  canSearch,
  autoSetRegistrationData,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelectStudents = useCallback((data?: any[]) => {
    if (!data) return
    setStudentData((prevVal: any[]) => ([
      ...data.filter(i => prevVal.findIndex(j => j.primary_email === i.primary_email) < 0).map(i => ({
        first_name: i.first_name,
        last_name: i.last_name,
        name: i.name,
        primary_email: i.primary_email,
        source: "From contact",
      })),
      ...prevVal
    ]))
  }, [setStudentData])

  const actions = useMemo(() => {
    return [
      ...canSearch ? [
        <Space direction="vertical">
          <h2 style={{ margin: 0 }}>Search and select from existing contacts</h2>
          <LookupOpenButton
            modalTitle={"Search Contacts"}
            title={"Search Contacts"}
            formTitle={"Contact Filters"}
            tableTitle={"Contacts"}
            tooltip={"Search Contacts"}
            onSubmit={handleSelectStudents}
            meta={[
              {
                label: "First Name",
                inputType: TEXT,
                fieldName: "first_name__icontains",
              },
              {
                label: "Last Name",
                inputType: TEXT,
                fieldName: "last_name__icontains",
              },
              {
                label: "Email",
                inputType: TEXT,
                fieldName: "primary_email__icontains",
              },
            ]}
            columns={getContactListTableColumns().columns}
            searchFunc={QueryConstructor((params) => ContactQueries.getList({
              ...params,
              params: {
                ...params?.params,
                profile_stores__store: storeData.store
              }
            }), [ContactQueries.getList])}
            isArray
          />
        </Space>
      ] : [],
      ...canUploadBulk ? [
        <Space direction="vertical" style={{ width: "100%" }}>
          <h2 style={{ margin: 0 }}>Or, upload from a file</h2>
          <UploadBulkStudentData setStudentData={setStudentData} />
        </Space>
      ] : [],
    ]
  }, [canSearch, canUploadBulk, setStudentData, handleSelectStudents, storeData.store])

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

  const handleContinue = useCallback(() => {
    if (autoSetRegistrationData && setRegistrationData && registrationProductData) {
      setRegistrationData(registrationProductData.map(i => ({
        product: i.id,
        students: studentData.map(i => i.primary_email)
      })))
    }
    setCurrentStep(currentStep + 1)
  }, [setCurrentStep, currentStep, registrationProductData, studentData, autoSetRegistrationData, setRegistrationData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
      {canSearch ? null :
        <Row>
          <Col xs={24}>
            <StudentForm
              storeData={storeData}
              profileQuestions={profileQuestions}
              loading={isProcessing}
              singleOnly={singleOnly}
              hasStudent={!!studentData.length}
              onChange={handleStudentDataChange}
            />
          </Col>
        </Row>
      }
      {actions.length ?
        <Row>
          <Space direction="vertical" size={"large"}>
            {actions.map((i, idx) => (<Col xs={24} key={idx}>{i}</Col>))}
          </Space>
        </Row>
        : null}
      <Row style={{ marginTop: "25px" }}>
        <Col xs={24}>
          <Card bodyStyle={{ padding: "5px 15px" }}>
            <ResponsiveTable
              tableTitle="Selected Students"
              columns={[
                {
                  title: 'Student',
                  dataIndex: 'name',
                  sorter: (a: any, b: any) => a.name - b.name
                },
                ...canUploadBulk ? [{
                  title: 'Source',
                  dataIndex: 'source',
                  sorter: (a: any, b: any) => a.source - b.source
                }] : [],
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
              hideSettings
            />
          </Card>
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Space>
            <Button style={{ marginTop: "20px", }} disabled={!isValid} type="primary" children={"Continue"} onClick={handleContinue} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}
