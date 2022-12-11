import { Checkbox, Input, Table } from "antd"
import { ColumnsType } from "antd/lib/table"
import { IGeneratedField, SearchFieldWrapper } from "@packages/components/lib/Form/common"
import { renderLink } from "@packages/components/lib/ResponsiveTable"


export const SectionPrice = (props: IGeneratedField) => {
  const values = props.formInstance.getFieldValue('sections') as any[]
  const columns: ColumnsType<any> = [
    {
      title: 'Section',
      dataIndex: 'name',
      render: (value, record) => renderLink(`/course-provider/section/${record.id}`, value)
    },
    {
      title: 'Course Provider Fee',
      dataIndex: 'provider_fee',
    },
    {
      title: 'Section Fee *',
      dataIndex: 'fee',
      render: (_, record) => (
        <SearchFieldWrapper formItemStyle={{ margin: 0 }} {...props} label={undefined} fieldName={`fee__${record.id}`} rules={[{ required: true, message: "This field is required!" }]}>
          <Input
            type={"number"}
            disabled={props.disabled}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
          />
        </SearchFieldWrapper>
      )
    },
    {
      title: 'Token Fee',
      dataIndex: 'token_fee',
      render: (_, record) => (
        <SearchFieldWrapper formItemStyle={{ margin: 0 }} {...props} label={undefined} fieldName={`token_fee__${record.id}`}>
          <Input
            type={"number"}
            disabled={props.disabled}
            placeholder={props.placeholder}
            autoComplete={props.autoComplete}
          />
        </SearchFieldWrapper>
      )
    },
    {
      title: 'Seat Capacity',
      dataIndex: 'seat_capacity',
    },
    {
      title: 'Is Approval Required',
      dataIndex: 'is_approval_required',
      render: (text, record) => (
        <SearchFieldWrapper initialValue={!!text} formItemStyle={{ margin: 0 }} {...props} label={undefined} fieldName={`is_approval_required__${record.id}`} extraProps={{ valuePropName: "checked" }}>
          <Checkbox />
        </SearchFieldWrapper>
      )
    },
  ]

  return (
    <Table
      dataSource={values}
      bordered={true}
      pagination={false}
      columns={columns}
      rowKey={'id'}
    />
  )
}