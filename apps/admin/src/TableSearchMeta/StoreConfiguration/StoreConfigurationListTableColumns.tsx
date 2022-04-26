import { message } from "antd"
import { renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { IconButton } from "~/packages/components/Form/Buttons/IconButton"
import { StoreConfigQueries } from "~/packages/services/Api/Queries/AdminQueries/StoreConfigs"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { ConfigurationTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ConfigurationTaggingFormMeta"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { StoreQueries } from "~/packages/services/Api/Queries/AdminQueries/Stores"

const updateStoreConfiguration = QueryConstructor(((data) => StoreQueries.updateConfiguration({ ...data }).then(resp => {
  if (resp.success) {
    message.success(UPDATE_SUCCESSFULLY)
  }
  return resp
})), [StoreQueries.updateConfiguration])

export const storeConfigurationListTableColumns: TableColumnType = [
  {
    title: 'Entity Name',
    dataIndex: 'entity_name',
    render: (text: any, record: any) => record.id ? renderLink(`/store/configuration/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.entity_name - b.entity_name
  },
  {
    title: 'Entity Type',
    dataIndex: 'entity_type',
    sorter: (a: any, b: any) => a.entity_type - b.entity_type
  },
  {
    title: "Action",
    key: "action",
    render: (record: any) => (
      <>
        <MetaDrivenFormModalOpenButton
          formTitle={`Edit Store Configuration`}
          formMeta={ConfigurationTaggingFormMeta}
          formSubmitApi={QueryConstructor((data) => updateStoreConfiguration({ ...data, params: { ...data?.params, id: record.id } }), [StoreQueries.updateConfiguration])}
          initialFormValue={{ ...record, config_value: JSON.stringify(record.config_value) }}
          buttonLabel={`Edit Store Configuration`}
          iconType="edit"
          refreshEventName={'REFRESH_PAGE'}
        />
        <IconButton
          toolTip="Delete Store Configuration"
          iconType="remove"
          onClickRemove={() => StoreConfigQueries.delete({ data: { id: [record.id] } })}
          refreshEventName="REFRESH_PAGE"
        />
      </>
    )
  }
]

export const getStoreConfigurationListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: storeConfigurationListTableColumns,
    searchFunc: QueryConstructor((params) => StoreConfigQueries.getList(params), [StoreConfigQueries.getList]),
    refreshEventName: 'REFRESH_STORE_CONFIGURATION_LIST'
  }
}
