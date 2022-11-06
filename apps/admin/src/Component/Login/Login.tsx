import { useContext, useState } from "react"
import { Card, Typography } from "antd"
import { useHistory } from "react-router"
import { setLoginInfo } from "@packages/services/lib/Api/utils/TokenStore"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { REDIRECT_TO_LOGIN, SHOW_LOGIN_MODAL } from "~/Constants"
import { IApiResponse, IUser } from "@packages/services/lib/Api/utils/Interfaces"
import { login } from "~/Services/AuthService"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { OTP, PASSWORD, TEXT } from "@packages/components/lib/Form/common"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { UserDataContext } from "@packages/components/lib/Context/UserDataContext"

export function Login(props: {
  modal?: boolean
  redirect?: (url: string) => void
}) {
  const history = useHistory()
  const { setUserData } = useContext(UserDataContext)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Array<ISimplifiedApiErrorMessage>>()
  const [mfaDetails, setMfaDetails] = useState<{ username: string; password: string; mfaEnabled: boolean }>()

  const handleLogin = async ({ username, password }: { username: string; password: string; }) => {
    setLoading(true)
    const response = await login({ username, password })
    setLoading(false)
    handleResponse(response, { username, password })
  }

  const validateMfa = async ({ otp }: Record<string, any>) => {
    if (!mfaDetails) return
    setLoading(true)
    const response = await login({ username: mfaDetails.username, password: mfaDetails.password, otp })
    setLoading(false)
    handleResponse(response)
  }

  const handleResponse = (response: IApiResponse, payload?: { username: string; password: string }) => {
    setError(undefined)
    if (!response.data?.access && response.data?.userData?.mfa_enabled && payload) {
      setMfaDetails({ mfaEnabled: true, ...payload })
      return
    } else if (response.success) {
      setLoginInfo({ token: response.data.access, user: response.data.userData as IUser })
      setUserData(response.data.userData)
      eventBus.publishSimilarEvents(/LOGGED_IN_SUCCESSFULLY.*/i, response.data.userData)
      eventBus.publish(SHOW_LOGIN_MODAL, false)
      eventBus.publishSimilarEvents(/REFRESH.*/i)
      eventBus.publish(REDIRECT_TO_LOGIN, false)
      if (props.redirect) history.push("/")
    } else if (Array.isArray(response.error) && response.error.length > 0) {
      setError(response.error)
    }
  }

  const modalProps = {
    title: "Login required",
    description: "Your session has been timed out, please login again"
  }
  return (
    <Card style={{ maxWidth: mfaDetails?.mfaEnabled ? "min-content" : "350px" }}>
      {props.modal && (
        <>
          <Card.Meta title={modalProps.title} />
          <Typography.Title className={"login-modal__message"} level={5} style={{ marginTop: "20px" }}>
            {modalProps.description}
          </Typography.Title>
        </>
      )}
      <MetaDrivenForm
        meta={!mfaDetails?.mfaEnabled ? [
          {
            label: "Username",
            fieldName: "username",
            inputType: TEXT,
            rules: [{ required: true, message: "This field is required!" }],
          },
          {
            label: "Password",
            fieldName: "password",
            inputType: PASSWORD,
            rules: [{ required: true, message: "This field is required!" }],
          }
        ] : [
          {
            label: "Enter Code",
            fieldName: "otp",
            inputType: OTP,
            helperText: "Open Google Authenticator app in your phone. Find the verification code of this application. Then enter the verification code below.",
            rules: [{ required: true, message: "This field is required!" }],
            otpLength: 6
          },
        ]}
        onApplyChanges={!mfaDetails?.mfaEnabled ? ({ username, password }) => handleLogin({ username, password }) : validateMfa}
        applyButtonLabel="Login"
        loading={loading}
        errorMessages={error}
        bordered={false}
        noPadding={props.modal}
        disableContainerLoader
        isVertical
        stopProducingQueryParams
      />
    </Card>
  )
}
