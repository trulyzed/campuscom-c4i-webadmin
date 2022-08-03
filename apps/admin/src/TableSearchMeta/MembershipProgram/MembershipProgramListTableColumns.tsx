import { ContextAction } from "~/packages/components/Actions/ContextAction"
import { renderBoolean, renderDateTime, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { MembershipProgramQueries } from "~/packages/services/Api/Queries/AdminQueries/MembershipPrograms"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const membershipProgramListTableColumns: TableColumnType = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (text: any, record: any) => renderLink(`/administration/membership-program/${record.id}`, text),
    sorter: (a: any, b: any) => a.title - b.title
  },
  {
    title: 'Store',
    dataIndex: 'store',
    render: (text: any, record: any) => renderLink(`/administration/store/${text.id}`, text.name),
    sorter: (a: any, b: any) => a.store.name - b.store.name
  },
  {
    title: 'Membership Type',
    dataIndex: 'membership_type',
    sorter: (a: any, b: any) => a.membership_type - b.membership_type
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    render: (text: any) => text ? `${text} day(s)` : undefined,
    sorter: (a: any, b: any) => a.duration - b.duration
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    render: renderDateTime,
    sorter: (a: any, b: any) => a.start_date - b.start_date
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    render: renderDateTime,
    sorter: (a: any, b: any) => a.end_date - b.end_date
  },
  {
    title: 'Is Published',
    dataIndex: 'is_published',
    render: renderBoolean,
    sorter: (a: any, b: any) => a.is_published - b.is_published
  },
  {
    title: "Action",
    dataIndex: 'action',
    render: (_, record: any) => (
      <ContextAction
        type="delete"
        queryService={QueryConstructor(() => MembershipProgramQueries.delete({ data: { ids: [record.id] } }), [MembershipProgramQueries.delete])}
        refreshEventName="REFRESH_MEMBER_PROGRAM_LIST"
      />
    )
  }
]

export const getMembershipProgramListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: membershipProgramListTableColumns,
    searchFunc: QueryConstructor((params) => MembershipProgramQueries.getPaginatedList(params), [MembershipProgramQueries.getList]),
    tableName: 'MembershipProgram',
    refreshEventName: "REFRESH_MEMBER_PROGRAM_LIST"
  }
}
