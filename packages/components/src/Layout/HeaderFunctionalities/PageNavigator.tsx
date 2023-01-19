import { useMemo } from "react"
import { RouteProps, useHistory } from "react-router-dom"
import { PermissionWrapper } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { IField } from "~/Form/common"
import { MetaDrivenFormModalOpenButton } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { ButtonProps } from "antd"
import { ActionType } from "~/Actions/ContextAction"

interface IPageNavigatorProps {
  label?: string
  routes: RouteProps[]
  formTitle: string
  buttonType?: ButtonProps["type"]
  iconType?: ActionType
}

export const PageNavigator = ({
  label = "Jump To Page",
  routes,
  formTitle,
  buttonType = "link",
  iconType
}: IPageNavigatorProps) => {
  const history = useHistory()
  const options = useMemo(() => routes.filter((x) => x && x.path !== undefined)
    .filter((x) => !x.path?.includes(":"))
    .map((x) => ({ ...x, name: (x.path as string).split("/").join(" ") } as any))
    .map((x) => ({ label: x.name, value: x.path })), [routes])

  const formMeta = useMemo((): IField[] => {
    return [
      {
        fieldName: 'page',
        label: 'Jump To Page',
        inputType: 'DROPDOWN',
        options,
        rules: [{ required: true, message: "This field is required!" }]
      }
    ]
  }, [options])

  const handleSubmit = PermissionWrapper((data) => {
    if (data?.data.page) history.push(data?.data.page)
    return Promise.resolve({
      code: 200,
      data: undefined,
      error: false,
      success: true
    })
  }, [{ is_public: true }])

  return (
    <MetaDrivenFormModalOpenButton
      buttonLabel={label}
      formTitle={formTitle}
      formMeta={formMeta}
      formSubmitApi={handleSubmit}
      buttonType={buttonType}
      iconType={iconType}
    />
  )
}
