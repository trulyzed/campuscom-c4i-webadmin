import { notification } from "antd"
import { renderLink, TableColumnType } from "@packages/components/lib/ResponsiveTable"
import { ITableMeta } from "@packages/components/lib/ResponsiveTable/ITableMeta"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { StoreConfigQueries } from "@packages/services/lib/Api/Queries/AdminQueries/StoreConfigs"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { getConfigurationTaggingFormMeta } from "~/Component/Feature/Stores/FormMeta/ConfigurationTaggingFormMeta"
import { UPDATE_SUCCESSFULLY } from "~/Constants"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { ContextAction } from "@packages/components/lib/Actions/ContextAction"

const updateStoreConfiguration = QueryConstructor(((data) => StoreQueries.updateConfiguration({ ...data }).then(resp => {
  if (resp.success) {
    notification.success({ message: UPDATE_SUCCESSFULLY })
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
    dataIndex: 'action',
    render: (_, record: any) => (
      <>
        <MetaDrivenFormModalOpenButton
          formTitle={`Edit Store Configuration`}
          formMeta={getConfigurationTaggingFormMeta(record)}
          formSubmitApi={QueryConstructor((data) => updateStoreConfiguration({ ...data, params: { ...data?.params, id: record.id } }), [StoreQueries.updateConfiguration])}
          initialFormValue={{ ...record, external_entity: record.entity_name }}
          buttonLabel={`Edit Store Configuration`}
          iconType="edit"
          refreshEventName={'REFRESH_PAGE'}
        />
        <ContextAction
          type="delete"
          tooltip="Delete Store Configuration"
          queryService={QueryConstructor(() => StoreConfigQueries.delete({ data: { id: [record.id] } }), [StoreConfigQueries.delete])}
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
    refreshEventName: 'REFRESH_STORE_CONFIGURATION_LIST',
    tableName: 'StoreConfiguration'
  }
}