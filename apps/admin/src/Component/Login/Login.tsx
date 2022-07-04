import { useState } from "react"
import { Form, Button, Card, Typography, Input } from "antd"
import { Error } from "~/Component/Error"
import { Store } from "antd/lib/form/interface"
import { Redirect } from "react-router"
import { setLoginInfo } from "~/packages/services/Api/utils/TokenStore"
import { eventBus } from "~/packages/utils/EventBus"
import { LOGGED_IN_SUCCESSFULLY, REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { IUser } from "~/packages/services/Api/utils/Interfaces"
import { login } from "~/packages/services/AuthService"

interface IFormState {
  username: string
  password: string
}

const INITIAL_FORM_VALUES: IFormState = {
  username: "",
  password: ""
}

enum EnumLoading {
  PENDING,
  INPROGRESS
}

export function Login(props: {
  globalErrorMessage?: null | string
  modal?: boolean
  page?: boolean
  redirect?: (url: string) => void
}) {
  const [loading, setloading] = useState(EnumLoading.PENDING)
  const [redirect, setRedirect] = useState<string>()
  const [error, setError] = useState<string>()
  const onFinish = async (values: Store) => {
    const { username, password } = values as IFormState
    setloading(EnumLoading.INPROGRESS)
    setError(undefined)
    const response = await login({ username, password })

    setloading(EnumLoading.PENDING)
    if (props.page) {
      if (response && response.success) {
        eventBus.publishSimilarEvents(/REFRESH.*/i)
        eventBus.publish(SHOW_LOGIN_MODAL, false)
        eventBus.publish(REDIRECT_TO_LOGIN, false)

        if (props.redirect) setRedirect("/")
      }
    }
    if (response.success) {
      setLoginInfo({ token: response.data.access, user: response.data.userData as IUser })
      eventBus.publish(LOGGED_IN_SUCCESSFULLY, response.data.userData)
    }
    else if (Array.isArray(response.error) && response.error.length > 0) {
      setError(response.error[0].message)
    }
  }

  const { globalErrorMessage } = props
  const modalProps = {
    title: "Login required",
    description: "Your session has been timed out, please login again"
  }
  return (
    <Card style={{ minWidth: "300px" }}>
      {props.modal && (
        <>
          <Card.Meta title={modalProps.title} />
          <Typography.Title className={"login-modal__message"} level={5} style={{ marginTop: "20px" }}>
            {modalProps.description}
          </Typography.Title>
        </>
      )}
      {Boolean(globalErrorMessage) && <Error>{globalErrorMessage}</Error>}
      {redirect && <Redirect to={redirect} />}
      <Form
        layout="vertical"
        name="basic"
        hideRequiredMark
        className="login-form"
        initialValues={INITIAL_FORM_VALUES}
        onFinish={onFinish}
      >
        <Form.Item
          {...{
            label: "Username",
            name: "username",
            rules: [{ required: true, message: "Please input your username!" }]
          }}
        >
          <Input aria-label="User Name" />
        </Form.Item>

        <Form.Item
          {...{
            label: "Password",
            name: "password",
            rules: [{ required: true, message: "Please input your password!" }]
          }}
        >
          <Input aria-label="password" type="password" />
        </Form.Item>

        {error && <p style={{ color: "darkred", textAlign: "center" }}>{error}</p>}
        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" loading={loading === EnumLoading.INPROGRESS}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
