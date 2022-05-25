// import { message } from "antd"
import { renderDateTime, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { ScheduleQueries } from "~/packages/services/Api/Queries/AdminQueries/Schedules"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
// import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
// import { ScheduleFormMeta } from "~/Component/Feature/Schedule/FormMeta/ScheduleFormMeta"
// import { UPDATE_SUCCESSFULLY } from "~/Constants"

// const updateSchedule = QueryConstructor(((data) => ScheduleQueries.update({ ...data }).then(resp => {
//   if (resp.success) {
//     message.success(UPDATE_SUCCESSFULLY)
//   }
//   return resp
// })), [ScheduleQueries.update])

export const scheduleListTableColumns: TableColumnType = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: any, record: any) => record.id ? renderLink(`/storefront-data/schedule/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: 'Meeting Type',
    dataIndex: 'section_type',
    sorter: (a: any, b: any) => a.section_type - b.section_type
  },
  {
    title: 'Building Name',
    dataIndex: 'building_name',
    sorter: (a: any, b: any) => a.building_name - b.building_name,
  },
  {
    title: 'Room Name',
    dataIndex: 'room_name',
    sorter: (a: any, b: any) => a.room_name - b.room_name,
  },
  {
    title: 'Start At',
    dataIndex: 'start_at',
    render: (text: any, record: any) => renderDateTime(text),
    sorter: (a: any, b: any) => a.start_at - b.start_at
  },
  {
    title: 'End At',
    dataIndex: 'end_at',
    render: (text: any, record: any) => renderDateTime(text),
    sorter: (a: any, b: any) => a.end_at - b.end_at,
  },
  // {
  //   title: "Action",
  //   key: "action",
  //   render: (record: any) => (
  //     <MetaDrivenFormModalOpenButton
  //       formTitle={`Edit Schedule`}
  //       formMeta={ScheduleFormMeta}
  //       formSubmitApi={updateSchedule}
  //       initialFormValue={record}
  //       buttonLabel={`Edit Schedule`}
  //       iconType="edit"
  //       refreshEventName={'REFRESH_SCHEDULE_LIST'}
  //     />
  //   )
  // }
]

export const getScheduleListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: scheduleListTableColumns,
    searchFunc: QueryConstructor((params) => ScheduleQueries.getPaginatedList(params), [ScheduleQueries.getList]),
    refreshEventName: 'REFRESH_SCHEDULE_LIST',
    tableName: 'Schedule'
  }
}
