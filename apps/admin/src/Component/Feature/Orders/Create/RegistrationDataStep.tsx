import { Button, Card, Checkbox, Col, Divider, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { StepNames } from "./common"
import { CheckboxValueType } from "antd/lib/checkbox/Group"
import { useCallback } from "react"
import pluralize from "pluralize"

interface IRegistrationDataStepProps {
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  setRegistrationData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
  isValid: boolean
}

export const RegistrationDataStep = ({
  registrationProductData,
  studentData,
  registrationData,
  setRegistrationData,
  setCurrentStep,
  isValid,
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
          {registrationProductData.map(product => (
            <div key={product.id} style={{ marginBottom: '15px' }}>
              <Title level={4} style={{ fontFamily: "AvertaLight", marginBottom: "10px" }}>"{product.title}" registration information</Title>
              <div style={{ marginTop: 0, marginLeft: "5px" }}>
                <Title level={5} style={{ marginBottom: "20px" }}>Choose {product.quantity} {pluralize("student", product.quantity)}</Title>
                <Checkbox.Group defaultValue={registrationData.find(registration => registration.product === product.id)?.students} onChange={(values) => handleStudentSelect(values, product.id)} options={studentData.map(student => ({ label: student.name, value: student.id }))} />
              </div>
              <Divider />
            </div>
          ))}
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} disabled={!isValid} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.AdditionalRegistrationInformation)} />
        </Col>
      </Row>
    </Card>
  )
}
