import React from "react"
import { Button, Card, Col, Form, Row } from "antd"
import { HelpButton } from "~/Help/HelpButton"
import { ICustomFormModal } from "~/Modal/FormModal/CustomFormModal"
import { FormError } from "~/Form/FormError"
import { generateUUID } from "@packages/utilities/lib/UUID"

export const CustomFormStructure = ({ applyButtonLabel = "Submit", ...props }: ICustomFormModal) => {
  const formId = generateUUID(props.helpKey)
  const formSubmit = () => {
    props.onFormSubmission(props.closeModal)
  }

  return (
    <Card
      title={
        <Row justify="space-between">
          <Col>{props.formTitle}</Col>
          {props.helpKey && (
            <Col>
              <HelpButton helpKey={props.helpKey} />
            </Col>
          )}
        </Row>
      }
      // actions={[
      //   <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
      //     {props.extraButtons && props.extraButtons.map((x, i) => <Col key={i}>{x}</Col>)}

      //     <Col>
      //       <Button type="primary" danger onClick={props.closeModal}>
      //         Cancel
      //       </Button>
      //     </Col>
      //     <Col>
      //       <Button type="primary" onClick={formSubmit} form={formId}>
      //         {applyButtonLabel}
      //       </Button>
      //     </Col>
      //   </Row>
      // ]}
    >
      <Form
        id={formId}
        form={props.formInstance}
        initialValues={props.initialValues}
        layout={props.layout}
        scrollToFirstError
      >
        <div
          style={{
            maxHeight: "66vh",
            overflowY: "scroll"
          }}
        >
          <FormError errorMessages={props.errorMessages} />
          {props.customForm}
        </div>
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          {props.extraButtons && props.extraButtons.map((x, i) => <Col key={i}>{x}</Col>)}

          <Col>
            <Button type="primary" danger onClick={props.closeModal}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={formSubmit} form={formId}>
              {applyButtonLabel}
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}
