import { renderDate, renderLink, TableColumnType } from "~/packages/components/ResponsiveTable"
import { ITableMeta } from "~/packages/components/ResponsiveTable/ITableMeta"
import { SectionQueries } from "~/packages/services/Api/Queries/AdminQueries/Sections"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"

export const sectionListTableColumns: TableColumnType = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: any, record: any) => record.id ? renderLink(`/institute/section/${record.id}`, text) : text,
    sorter: (a: any, b: any) => a.name - b.name
  },
  {
    title: 'Course',
    dataIndex: 'course',
    sorter: (a: any, b: any) => a.course - b.course,
    render: (text: any, record: any) => renderLink(`/institute/course/${text.id}`, text.title),
  },
  {
    title: 'Final Enrollment Date',
    dataIndex: 'registration_deadline',
    sorter: (a: any, b: any) => a.registration_deadline - b.registration_deadline,
    render: (text: any, record: any) => renderDate(text)
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    sorter: (a: any, b: any) => a.fee - b.fee,
    render: (text: any, record: any) => text
  },
  {
    title: 'Number of Seat',
    dataIndex: 'seat_capacity',
    sorter: (a: any, b: any) => a.seat_capacity - b.seat_capacity,
    render: (text: any, record: any) => text
  },
  {
    title: 'Available Seat',
    dataIndex: 'available_seat',
    sorter: (a: any, b: any) => a.available_seat - b.available_seat,
    render: (text: any, record: any) => text
  },
]

export const getSectionListTableColumns = (isModal = false): ITableMeta => {
  return {
    columns: sectionListTableColumns,
    searchFunc: QueryConstructor((params) => SectionQueries.getPaginatedList(params), [SectionQueries.getList]),
  }
}
