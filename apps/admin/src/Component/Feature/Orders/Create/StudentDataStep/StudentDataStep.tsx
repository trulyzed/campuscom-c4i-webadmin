import { Fragment, useCallback, useMemo, useState } from "react"
import { Button, Card, Col, notification, Row, Space } from "antd"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { renderBoolean, ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { IField } from "@packages/components/lib/Form/common"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { Steps } from "~/Component/Feature/Orders/Create/Utils/types"
import { UploadBulkStudentData } from "./UploadBulkStudentData"
import { StudentForm } from "./StudentForm"
import { LookupOpenButton } from "@packages/components/lib/Modal/LookupModal/LookupOpenButton"
import { getContactListTableColumns } from "~/TableSearchMeta/Contact/ContactListTableColumns"
import { ContactSearchMeta } from "~/TableSearchMeta/Contact/ContactSearchMeta"


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
  canSearchStudents?: boolean
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
  canSearchStudents,
  autoSetRegistrationData,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSelectStudents = useCallback((data?: any[]) => {
    if (!data) return
    setStudentData((prevVal: any[]) => ([
      ...data.filter(i => prevVal.findIndex(j => j.primary_email === i.primary_email) < 0).map(i => ({
        id: i.id,
        first_name: i.first_name,
        last_name: i.last_name,
        name: i.name,
        primary_email: i.primary_email,
      })),
      ...prevVal
    ]))
  }, [setStudentData])

  const actions = useMemo(() => {
    return [
      ...canSearchStudents ? [
        <LookupOpenButton
          title={"Search Students"}
          formTitle={"Search Students"}
          tooltip={"Search Students"}
          onSubmit={handleSelectStudents}
          meta={ContactSearchMeta}
          columns={getContactListTableColumns().columns}
          searchFunc={getContactListTableColumns().searchFunc}
          isArray
        />
      ] : [],
      ...canUploadBulk ? [<UploadBulkStudentData setStudentData={setStudentData} />] : [],
    ]
  }, [canSearchStudents, canUploadBulk, setStudentData, handleSelectStudents])

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
      {canSearchStudents ? null :
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
        <Space>
          {actions.map((i, idx) => (
            <Fragment key={idx}>
              {i}
            </Fragment>
          ))}
        </Space>
        : null}
      <Row>
        <Col xs={24}>
          <ResponsiveTable
            tableTitle="Selected Students"
            columns={[
              {
                title: 'Student',
                dataIndex: 'name',
                sorter: (a: any, b: any) => a.name - b.name
              },
              {
                title: 'Upload',
                dataIndex: 'id',
                render: (text) => renderBoolean(!text),
                sorter: (a: any, b: any) => a.id - b.id
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
            hideSettings
          />
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
