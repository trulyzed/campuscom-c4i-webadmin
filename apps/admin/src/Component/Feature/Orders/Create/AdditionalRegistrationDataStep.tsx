import { DROPDOWN, IField, MULTI_RADIO, TEXT, TEXTAREA } from "@packages/components/lib/Form/common"
import { FormFields } from "@packages/components/lib/Form/MetaDrivenForm"
import { Button, Card, Col, Divider, Form, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { StepNames } from "./common"

interface IAdditionalRegistrationDataStepProps {
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  setCurrentStep: (step: StepNames) => void
}

export const AdditionalRegistrationDataStep = ({
  registrationProductData,
  studentData,
  registrationData,
  setCurrentStep,
}: IAdditionalRegistrationDataStepProps) => {
  const [formInstance] = Form.useForm()
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
                <Title style={{ fontFamily: "AvertaLight", marginBottom: "20px" }} level={4}>"{registrationProductData.find(product => product.id === registration.product)?.title}" registration information</Title>
                {registration.students.map((student: any, idx2: number) =>
                  <div key={student} style={{ marginTop: "15px", margin: "0 5px" }}>
                    <Title level={5}>{studentData.find(s => s.id === student)?.name}</Title>
                    <div style={{ marginTop: "20px" }}>
                      <FormFields
                        formInstance={formInstance}
                        meta={[
                          ...idx === 0 ? [{
                            fieldName: `test2__${idx2}`,
                            label: "Can you afford This Course?",
                            inputType: MULTI_RADIO,
                            options: [
                              { label: "Yes", value: "y" },
                              { label: "No", value: "n" },
                            ],
                          }] as IField[] : [
                            {
                              fieldName: `age__${idx2}`,
                              label: "Waht is your age?",
                              inputType: TEXT,
                            }
                          ] as IField[],
                          ...idx === 0 ? [{
                            fieldName: `country__${idx2}`,
                            label: "Select your country",
                            options: [
                              { label: "Bangladesh", value: "bd" },
                              { label: "USA", value: "usa" },
                            ],
                            inputType: DROPDOWN,
                          }] as IField[] : [
                            {
                              fieldName: `test__${idx2}`,
                              label: "Type your address",
                              inputType: TEXTAREA,
                            }
                          ] as IField[]
                        ]}
                        dependencyValue={{}}
                      />
                    </div>
                    {idx2 !== (registration.students.length - 1) ? <Divider /> : null}
                  </div>
                )}
              </Card>
            ) : null)}
          </Form>
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.Invoice)} />
        </Col>
      </Row>
    </Card>
  )
}
