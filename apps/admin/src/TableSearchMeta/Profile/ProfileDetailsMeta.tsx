import React, { useState } from "react"
import { IDetailsMeta, IDetailsTabMeta } from "~/packages/components/Page/DetailsPage/Common"
import { CardContainer, IDetailsSummary } from "~/packages/components/Page/DetailsPage/DetailsPageInterfaces"
import { Button, Card, Col, Form, Row } from "antd"
import { Modal } from "~/packages/components/Modal/Modal"
import { FormInput } from "~/packages/components/Form/FormInput"


const ChangePassword = () => {
  const [showModal, setShowModal] = useState(false)
  const [formInstance] = Form.useForm()
  const submitNewPassword = () => {
    formInstance.validateFields().then((formValue) => {
      console.log(formValue)
      setShowModal(false)
    })
  }
  return (
    <>
      <Button type="primary" onClick={() => setShowModal(!showModal)}>Change Password</Button>
      {showModal && (
        <Modal width="1000px">
          <Card title="Change Password">
            <Form id="passwordChangeForm" form={formInstance}>
              <FormInput
                formInstance={formInstance}
                label={"Current Password"}
                type="password"
                fieldName={"CurrentPassword"}
              />
              <FormInput formInstance={formInstance} label={"New Password"} type="password" fieldName={"NewPassword"} />
              <FormInput
                formInstance={formInstance}
                label={"Verify Password"}
                type="password"
                fieldName={"VerifyPassword"}
              />
              <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
                <Col>
                  <Button type="primary" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" form="passwordChangeForm" onClick={() => submitNewPassword()}>
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Modal>
      )}
    </>
  )
}

export const getProfileMeta = (userInfo: { [key: string]: any }): IDetailsMeta => {
  const tabMetas: IDetailsTabMeta[] = []
  const personalInfo: CardContainer = {
    title: userInfo.fullname,
    cardActions: [<ChangePassword />],
    contents: [
      { label: "First Name", value: userInfo.first_name, render: undefined },
      { label: "Last Name", value: userInfo.last_name, render: undefined },
      { label: "Email", value: userInfo.email, render: undefined },
      // {
      //   label: "Roles",
      //   value: userInfo.Email,
      //   render: (text) => (
      //     <div style={{ display: "flex", flexFlow: "wrap" }}>
      //       {userInfo.Roles.map((x: any, i: number) => (
      //         <span
      //           key={i}
      //           style={{
      //             border: "1px solid",
      //             backgroundColor: "lightgray",
      //             padding: "3px",
      //             marginLeft: "5px",
      //             borderRadius: "10px"
      //           }}
      //         >
      //           {x}
      //         </span>
      //       ))}
      //     </div>
      //   )
      // }
    ]
  }

  const demographySummaryMeta: IDetailsSummary = {
    summary: [{ groupedContents: [personalInfo] }]
  }
  tabMetas.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: demographySummaryMeta,
    helpKey: "personDemographicTab"
  })

  return { pageTitle: "User Profile", tabs: tabMetas }
}
