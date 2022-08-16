import React, { useState } from "react"
import { Button, Card, Form } from "antd"
import { Redirect, RouteProps } from "react-router-dom"
import { IDeviceView, useDeviceViews } from "~/Hooks/useDeviceViews"
import { IconButton } from "~/Form/Buttons/IconButton"
import { zIndexLevel } from "~/zIndexLevel"
import { Modal } from "~/Modal/Modal"
import { FormDropDown } from "~/Form/FormDropDown"

const MasterlookupComponentFunctionality = (props: { routes: RouteProps[], closeModal?: () => void; desktop: boolean }) => {
  const [formInstance] = Form.useForm()
  const [redirectTo, setRedirectTo] = useState<string>()
  // const [isOpen, setIsOpen] = useState(false)

  const goToPage = (value: string) => {
    setRedirectTo(value)
    setTimeout(() => {
      setRedirectTo(undefined)
      formInstance.resetFields()
      props.closeModal && props.closeModal()
    }, 0)
  }
  return (
    <>
      {redirectTo && <Redirect to={redirectTo} />}
      <Form form={formInstance} style={{ marginRight: "20px", marginTop: "16px" }} className={"master-look-up"}>
        <FormDropDown
          label={""}
          placeholder={"Jump To Page"}
          fieldName="JumpTo"
          labelColSpan={0}
          wrapperColSpan={24}
          onSelectedItems={goToPage}
          options={props.routes.filter((x) => x && x.path !== undefined)
            .filter((x) => !x.path?.includes(":"))
            .map((x) => ({ ...x, name: (x.path as string).split("/").join(" ") } as any))
            .map((x) => ({ label: x.name, value: x.path }))}
          formInstance={formInstance}
        />
        {/* <Form.Item
          label={<span style={{ color: props.desktop ? "white" : "black", marginTop: "-8px" }}>Jump To Page</span>}
          name={"JumpTo"}
          labelCol={{ flex: 6 }}
          wrapperCol={{ flex: 18 }}
        >
          <Select
            // aria-label="Select Page name from drop down to quick jump to a page"
            onChange={goToPage}
            showSearch
            aria-expanded={isOpen}
            onDropdownVisibleChange={(open: boolean) => setIsOpen(open)}
          >
            {AppRoutes.filter((x) => x && x.path !== undefined)
              .filter((x) => !x.path?.includes(":"))
              .map((x) => ({ ...x, name: (x.path as string).split("/").join(" ") } as any))
              .map((x, i) => (
                <Select.Option key={i} value={x.path as string}>
                  {x.name as string}
                </Select.Option>
              ))}
          </Select>
        </Form.Item> */}
      </Form>
    </>
  )
}

export const MasterLookupComponent = (props: { routes: RouteProps[] }) => {
  const [showModal, setShowModal] = useState(false)

  const [desktop, setDesktop] = useState(false)
  useDeviceViews((deviceViews: IDeviceView) => {
    setDesktop(deviceViews.desktop)
  })

  const closeModal = () => {
    setTimeout(() => {
      setShowModal(false)
    }, 0)
  }

  return (
    <>
      {!desktop && (
        <>
          <IconButton
            iconType="search"
            toolTip="Jump To Page"
            onClick={() => {
              setShowModal(true)
            }}
            buttonType="default"
          />
          {showModal && (
            <Modal closeModal={() => setShowModal(false)} width="1000px" zIndex={zIndexLevel.loginModal}>
              <Card title="Quick Search" actions={[<Button onClick={closeModal}>Close</Button>]}>
                <MasterlookupComponentFunctionality routes={props.routes} closeModal={closeModal} desktop={desktop} />
              </Card>
            </Modal>
          )}
        </>
      )}
      {desktop && <MasterlookupComponentFunctionality routes={props.routes} desktop={desktop} />}
    </>
  )
}
