import { IField } from "@packages/components/lib/Form/common"
import { FormFields } from "@packages/components/lib/Form/MetaDrivenForm"
import { Button, Card, Col, Form, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { useCallback } from "react"
import { StepNames } from "./common"

interface IAdditionalRegistrationDataStepProps {
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  registrationQuestions: { product: string; meta: IField[] }[]
  setAdditionalRegistrationData: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
}

export const AdditionalRegistrationDataStep = ({
  registrationProductData,
  studentData,
  registrationData,
  registrationQuestions,
  setAdditionalRegistrationData,
  setCurrentStep,
}: IAdditionalRegistrationDataStepProps) => {
  const [formInstance] = Form.useForm()

  const handleSubmit = useCallback(() => {
    formInstance
      .validateFields()
      .then((values) => {
        console.log(values, registrationData)
        const getRegistrationQuestionValues = (productID: string, studentID: string) => Object.keys(values).reduce((a, c) => {
          console.log(c, productID, studentID)
          if (c.includes("registration_question__") && c.includes(productID) && c.includes(studentID)) {
            a = {
              ...a,
              id: studentID,
              registration_question_values: {
                ...a.registration_question_values,
                [c.split("__")[1]]: values[c]
              }
            }
          }
          return a
        }, {} as Record<string, any>)

        setAdditionalRegistrationData(registrationData.map(i => ({
          product: i.product,
          students: i.students.map((s: any) => getRegistrationQuestionValues(i.product, s))
        })))
        setCurrentStep(StepNames.Invoice)
      })
  }, [formInstance, registrationData, setCurrentStep, setAdditionalRegistrationData])

  const getRegistrationQuestionsMeta = useCallback((productID: string, studentID: string) => {
    const meta = registrationQuestions.find(i => i.product === productID)?.meta || []
    return meta.map(i => ({
      ...i,
      fieldName: `registration_question__${i.fieldName}__${productID}__${studentID}`,
    }))
  }, [registrationQuestions])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Additional Registration Information"}>
      <Row>
        <Col flex={"auto"}>
          <Form
            //layout={"horizontal"}
            form={formInstance}
            style={{
              background: "white",
              borderRadius: "4px",
            }}
          >
            {registrationData.map((registration, idx: number) => registration.students.length ? (
              <Card key={registration.product} style={{ marginBottom: "30px" }}>
                <Title style={{ fontFamily: "AvertaLight", marginBottom: "20px" }} italic level={4}>"{registrationProductData.find(product => product.id === registration.product)?.title}" registration information</Title>
                {registration.students.map((student: any, idx2: number) =>
                  <Card key={student} style={{ margin: "0 5px", marginBottom: "15px" }}>
                    <Title level={5}>{studentData.find(s => s.id === student)?.name}</Title>
                    <div style={{ marginTop: "30px" }}>
                      <FormFields
                        formInstance={formInstance}
                        meta={getRegistrationQuestionsMeta(registration.product, student)}
                        dependencyValue={{}}
                      />
                    </div>
                    {/* {idx2 !== (registration.students.length - 1) ? <Divider /> : null} */}
                  </Card>
                )}
              </Card>
            ) : null)}
          </Form>
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={handleSubmit} />
        </Col>
      </Row>
    </Card>
  )
}
