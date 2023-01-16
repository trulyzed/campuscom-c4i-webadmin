import { Form, type FormInstance } from "antd"
import { TEXTAREA } from "@packages/components/lib/Form/common"
import { FormFields } from "@packages/components/lib/Form/MetaDrivenForm"

interface ISessionFormProps {
  formInstance: FormInstance
  show: boolean
}

export const SessionForm = ({
  show,
  formInstance
}: ISessionFormProps) => {
  return show ? (
    <Form form={formInstance}>
      <FormFields
        formInstance={formInstance}
        meta={[
          {
            label: 'Remarks',
            inputType: TEXTAREA,
            fieldName: 'remarks',
            colSpan: 12
          }
        ]}
        dependencyValue={{}}
        isVertical
      />
    </Form>
  ) : null
}