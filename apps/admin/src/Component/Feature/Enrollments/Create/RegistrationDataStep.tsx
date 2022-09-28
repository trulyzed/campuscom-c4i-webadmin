import { Button, Card, Checkbox, Col, Divider, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { StepNames } from "./common"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { useCallback } from "react"

interface IRegistrationDataStepProps {
  productData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  setRegistrationData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const RegistrationDataStep = ({
  productData,
  studentData,
  registrationData,
  setRegistrationData,
  setCurrentStep,
}: IRegistrationDataStepProps) => {
  const handleStudentSelect = useCallback((values: CheckboxValueType[], product) => {
    setRegistrationData((registrationData: any) => {
      const adjustedData = [...registrationData]
      const matchedProduct = adjustedData.find(a => a.product === product)
      if (matchedProduct) matchedProduct.students = values
      else adjustedData.push({ product, students: values })
      return adjustedData.filter(i => i.students?.length)
    })
  }, [setRegistrationData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Who will Attend the Class"}>
      <Row>
        <Col flex={"auto"}>
          {productData.filter(i => i.unit === "registration").map(product => (
            <div key={product.id} style={{ marginBottom: '15px' }}>
              <Title level={4}>"{product.title}" registration information</Title>
              <Checkbox.Group defaultValue={registrationData.find(registration => registration.product === product.id)?.students} onChange={(values) => handleStudentSelect(values, product.id)} options={studentData.map(student => ({ label: student.name, value: student.id }))} />
              <Divider />
            </div>
          ))}
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} disabled={!registrationData.length} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.AdditionalRegistrationInformation)} />
        </Col>
      </Row>
    </Card>
  )
}
