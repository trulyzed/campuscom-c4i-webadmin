import { Button, Card, Col, Divider, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { StepNames } from "./common"

interface IAdditionalRegistrationDataStepProps {
  productData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  setCurrentStep: (step: StepNames) => void
}

export const AdditionalRegistrationDataStep = ({
  productData,
  studentData,
  registrationData,
  setCurrentStep,
}: IAdditionalRegistrationDataStepProps) => {

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Additional Registration Information"}>
      <Row>
        <Col flex={"auto"}>
          {registrationData.map(registration => (
            <div key={registration.product} style={{ marginBottom: '20px' }}>
              <Title level={4}>"{productData.find(product => product.id === registration.product)?.title}" registration information</Title>
              <div>
                {registration.students.map((student: any) =>
                  <div key={student}>
                    <Title level={5}>{studentData.find(s => s.id === student)?.name}</Title>
                  </div>
                )}
              </div>
              <Divider />
            </div>
          ))}
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.Invoice)} />
        </Col>
      </Row>
    </Card>
  )
}
