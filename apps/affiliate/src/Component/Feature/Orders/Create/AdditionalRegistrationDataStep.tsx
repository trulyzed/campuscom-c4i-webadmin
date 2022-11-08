import { CUSTOM_FIELD, IField } from "@packages/components/lib/Form/common"
import { FormFields } from "@packages/components/lib/Form/MetaDrivenForm"
import { Button, Card, Col, Form, Row } from "antd"
import Title from "antd/lib/typography/Title"
import { useCallback, useMemo } from "react"
import { Steps } from "./Utils/types"
import { RelatedProductInput } from "./RelatedProductInput"

interface IAdditionalRegistrationDataStepProps {
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  registrationQuestions: { product: string; meta: IField[] }[]
  registrationProducts: { parent: string; products: any[] }[]
  additionalRegistrationData: Record<string, any>[]
  setAdditionalRegistrationData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
}

export const AdditionalRegistrationDataStep = ({
  registrationProductData,
  studentData,
  registrationData,
  registrationQuestions,
  registrationProducts,
  additionalRegistrationData,
  setAdditionalRegistrationData,
  currentStep,
  setCurrentStep,
}: IAdditionalRegistrationDataStepProps) => {
  const [formInstance] = Form.useForm()

  const initialValues = useMemo(() => additionalRegistrationData.reduce((a, c) => {
    for (const s of c.students) {
      for (const key of Object.keys(s.registration_question_values || {})) {
        a = {
          ...a,
          [`registration_question__${key}__${c.product}__${s.id}`]: s.registration_question_values?.[key]
        }
      }
      for (const key of Object.keys(s.related_products || {})) {
        a = {
          ...a,
          [`related_product_quantity__${key}__${c.product}__${s.id}`]: s.related_products?.[key]
        }
      }
    }
    return a
  }, {}), [additionalRegistrationData])

  const handleSubmit = useCallback(() => {
    formInstance
      .validateFields()
      .then((values) => {
        const getRegistrationQuestionValues = (productID: string, studentID: string) => Object.keys(values).reduce((a, c) => {
          if (c.includes(productID) && c.includes(studentID)) {
            a = {
              ...a,
              id: studentID,
              registration_question_values: {
                ...a.registration_question_values,
                ...c.includes("registration_question__") && { [c.split("__")[1]]: values[c] }
              },
              related_products: {
                ...a.related_products,
                ...c.includes("related_product_quantity__") && { [c.split("__")[1]]: values[c] }
              }
            }
          }
          return a
        }, {} as Record<string, any>)

        setAdditionalRegistrationData(registrationData.map(i => ({
          product: i.product,
          students: i.students.map((s: any) => getRegistrationQuestionValues(i.product, s))
        })))
        setCurrentStep(currentStep + 1)
      })
  }, [formInstance, registrationData, currentStep, setCurrentStep, setAdditionalRegistrationData])

  const getRegistrationQuestionsMeta = useCallback((productID: string, studentID: string) => {
    const meta = registrationQuestions.find(i => i.product === productID)?.meta || []
    return meta.map(i => ({
      ...i,
      fieldName: `registration_question__${i.fieldName}__${productID}__${studentID}`,
      defaultValue: initialValues?.[`registration_question__${i.fieldName}__${productID}__${studentID}`]
    }))
  }, [registrationQuestions, initialValues])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Additional Registration Information"}>
      <Row>
        <Col flex={"auto"}>
          <Form
            className="form--with-html-label"
            form={formInstance}
            style={{
              background: "white",
              borderRadius: "4px",
            }}
            initialValues={initialValues}
          >
            {registrationData.map((registration, idx: number) => registration.students.length ? (
              <Card key={registration.product} style={{ marginBottom: "30px" }}>
                <Title style={{ fontFamily: "AvertaLight", marginBottom: "20px" }} italic level={4}>"{registrationProductData.find(product => product.id === registration.product)?.title}" registration information</Title>
                {registration.students.map((student: any, idx2: number) => {
                  const products = registrationProducts.find(i => i.parent === registration.product)?.products
                  const meta = [
                    ...getRegistrationQuestionsMeta(registration.product, student),
                    ...products?.length ? [{
                      fieldName: "related_product",
                      label: "Related Product",
                      inputType: CUSTOM_FIELD,
                      customFilterComponent: (props) => <RelatedProductInput {...props} relationType={"registration"} defaultRelatedProducts={products} fieldNamePrefix={`${registration.product}__${student}`} />,
                    }] as IField[] : [],
                  ]
                  return (
                    <Card key={student} style={{ margin: "0 5px", marginBottom: "15px" }} bodyStyle={{ ...!meta.length && { paddingTop: "10px", paddingBottom: "10px" } }}>
                      <Title level={5} style={{ ...!meta.length && { marginBottom: "0" } }}>{studentData.find(s => s.primary_email === student)?.name}</Title>
                      {meta.length ?
                        <div style={{ marginTop: "30px" }}>
                          <FormFields
                            formInstance={formInstance}
                            meta={meta}
                            dependencyValue={{}}
                          />
                        </div>
                        : null}
                    </Card>
                  )
                })}
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
