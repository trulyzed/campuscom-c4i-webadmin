import { BOOLEAN, CUSTOM_FIELD, DROPDOWN, IField, IGeneratedField, NUMBER } from "@packages/components/lib/Form/common"
import { StoreQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Stores"
import { Table } from "antd"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
// import { getResourceType } from "~/ApiServices/Service/RefLookupService"

export const getCertificatePublishingFormMeta = (): IField[] => [
  {
    label: "Store",
    inputType: DROPDOWN,
    fieldName: "store",
    refLookupService: StoreQueries.getLookupData,
    displayKey: "name",
    valueKey: "id",
    rules: [{ required: true, message: "This field is required!" }],
    defaultPreferenceIndex: 'default_store',
    labelColSpan: 10,
    colSpan: 10
  },
  {
    label: 'Enrollment Ready',
    fieldName: 'enrollment_ready',
    inputType: BOOLEAN,
    labelColSpan: 20,
    colSpan: 6,
  },
  {
    label: 'Is Published',
    fieldName: 'is_published',
    inputType: BOOLEAN,
    labelColSpan: 20,
    colSpan: 4,
  },
  {
    label: 'Is Featured',
    fieldName: 'is_featured',
    inputType: BOOLEAN,
    labelColSpan: 20,
    colSpan: 4,
  },
  {
    label: 'Price',
    fieldName: 'price',
    inputType: NUMBER,
    rules: [{ required: true, message: "This field is required!" }],
  },
  {
    label: "Courses",
    inputType: CUSTOM_FIELD,
    fieldName: "courses",
    customFilterComponent: (props: IGeneratedField) => (
      <Table
        dataSource={props.formInstance.getFieldValue('courses') as any[]}
        bordered={true}
        pagination={false}
        columns={[
          {
            title: 'Course',
            dataIndex: 'title',
            render: (value, record) => renderLink(`/course-provider/course/${record.id}`, value)
          },
        ]}
        rowKey={'id'}
      />
    )
  },
]
