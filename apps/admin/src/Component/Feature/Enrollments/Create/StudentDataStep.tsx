import { Button, Card, Col, Row, Space } from "antd"
import Title from "antd/lib/typography/Title"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { BOOLEAN, DROPDOWN, TEXT } from "@packages/components/lib/Form/common"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StudentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Students"
import { StepNames } from "./common"
import { useCallback, useState } from "react"

interface IStudentDataStepProps {
  store: string
  productData: Record<string, any>[]
  purchaserData?: Record<string, any>
  reservationData?: Record<string, any>
  studentData: Record<string, any>[]
  setReservationData: (...args: any[]) => void
  setStudentData: (...args: any[]) => void
  setRegistrationData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const StudentDataStep = ({
  store,
  productData,
  purchaserData,
  reservationData,
  studentData,
  setReservationData,
  setStudentData,
  setRegistrationData,
  setCurrentStep,
}: IStudentDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const canReserve = purchaserData?.purchasing_for === "company"

  const handleStudentDataChange = useCallback(async (value) => {
    setIsProcessing(true)
    const { data } = await StudentQueries.getSingle({ params: { id: value.profile } })
    setIsProcessing(false)
    setStudentData([...studentData, data])
  }, [studentData, setStudentData])

  const handleReservationDataChange = useCallback((value) => {
    setReservationData(value)
    if (value?.is_reservation) {
      const students = [...Array(Number(value?.number_of_seats)).keys()].map((i, idx) => ({
        first_name: "",
        last_name: "",
        primary_email: "",
        id: idx,
        name: `Student ${idx + 1}`
      }))
      setStudentData(students)
      setRegistrationData(productData.map(i => ({
        product: i.id,
        students: students.map(i => i.id)
      })))
      setCurrentStep(StepNames.Invoice)
    } else {
      setStudentData([])
      setRegistrationData([])
    }
  }, [productData, setRegistrationData, setStudentData, setReservationData, setCurrentStep])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
      {(canReserve && reservationData?.is_reservation !== false) ?
        <Row>
          <Col xs={24}>
            <MetaDrivenForm
              meta={[
                {
                  fieldName: "is_reservation",
                  label: "I want to specify seat reservations",
                  inputType: BOOLEAN
                },
                {
                  fieldName: "number_of_seats",
                  label: "Number of Seats",
                  inputType: TEXT,
                  rules: [{ required: true, message: "This field is required!" }],
                  dependencies: ["is_reservation"],
                  onDependencyChange: (value, { toggleField }) => {
                    toggleField?.(value?.is_reservation)
                  }
                }
              ]}
              onApplyChanges={handleReservationDataChange}
              initialFormValue={{
                is_reservation: reservationData?.is_reservation !== undefined ? reservationData.is_reservation : true,
                number_of_seats: reservationData?.number_of_seats
              }}
              isWizard
              applyButtonLabel={"Next"}
              showFullForm
              showClearbutton={false}
              stopProducingQueryParams
              resetOnSubmit
              isVertical
            />
          </Col>
        </Row>
        : null}
      {(!canReserve || reservationData?.is_reservation === false) ?
        <Row>
          <Col xs={24}>
            <MetaDrivenForm
              meta={[{
                fieldName: "profile",
                label: "Student",
                inputType: DROPDOWN,
                refLookupService: QueryConstructor(() => ContactQueries.getLookupData({ params: { profile_stores__store: store } }), [ContactQueries.getLookupData]),
                displayKey: "name",
                valueKey: "id",
                rules: [{ required: true, message: "This field is required!" }]
              }]}
              onApplyChanges={handleStudentDataChange}
              isWizard
              applyButtonLabel={"Add Student"}
              showFullForm
              loading={isProcessing}
              showClearbutton={false}
              disableContainerLoader
              stopProducingQueryParams
              resetOnSubmit
              isVertical
            />
          </Col>
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
              {canReserve ? <Button style={{ marginTop: "20px", }} children={"Back to Reservation"} onClick={() => setReservationData(undefined)} /> : null}
              <Button style={{ marginTop: "20px", }} disabled={!studentData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.RegistrationInformation)} />
            </Space>
          </Col>
        </Row>
        : null}
    </Card>
  )
}