import { FormInstance, notification } from "antd"
import { MetaDrivenFormModalOpenButton } from "~/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { UserTableFilterConfigurationQueries } from "@packages/services/lib/Api/Queries/AdminQueries/UserTableFilterConfigurations"
import { SAVE_SUCCESSFULLY } from "~/Constants"
import { IFormValueMeta } from "~/Form/MetaDrivenForm"
import { eventBus } from "@packages/utilities/lib/EventBus"

export const EVENT_SAVE_FILTER = 'EVENT_SAVE_FILTER'

export const TableFilterFormOpener = (props: {
  tableName: string
  formInstance?: FormInstance
  formValueMeta?: IFormValueMeta
}) => {
  const handleSubmit = QueryConstructor((data) => {
    const values = props.formInstance?.getFieldsValue()
    const meta = Object.keys(props.formValueMeta || {}).reduce((a, c) => {
      if (values[c] !== undefined && props.formValueMeta) a = { ...a, [c]: props.formValueMeta[c] }
      return a
    }, {} as IFormValueMeta | undefined)
    return UserTableFilterConfigurationQueries.create({
      data: {
        table_name: props.tableName,
        filter: {
          title: data?.data.title,
          configurations: Object.keys(values).reduce((a, c) => {
            a[c] = values[c] === undefined ? null : values[c]
            return a
          }, {} as Record<string, any>),
          meta: Object.keys(meta || {}).length ? meta : null
        }
      }
    }).then(resp => {
      notification.success({ message: SAVE_SUCCESSFULLY })
      eventBus.publish(EVENT_SAVE_FILTER)
      return resp
    })
  }, [UserTableFilterConfigurationQueries.create])

  return (
    <MetaDrivenFormModalOpenButton
      buttonLabel="Save As"
      formMeta={[
        {
          fieldName: 'title',
          inputType: "TEXT",
          label: 'Title',
          rules: [{ required: true, message: "This field is required!" }],
          colSpan: 24,
          wrapperColSpan: 14,
          labelColSpan: 4
        },
      ]}
      formSubmitApi={handleSubmit}
      formTitle={'Save Filters As'}
      buttonSize={'small'}
    />
  )
}