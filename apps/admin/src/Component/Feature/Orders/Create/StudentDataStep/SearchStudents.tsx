import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { TEXT } from "@packages/components/lib/Form/common"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { Button } from "antd"
import { getContactListTableColumns } from "~/TableSearchMeta/Contact/ContactListTableColumns"

interface ISearchStudentsProps {
  storeData: Record<string, any>
}

export const SearchStudents = ({
  storeData
}: ISearchStudentsProps) => {
  return (
    <ContextAction
      tooltip="Search Students"
      buttonType="primary"
      text="Search Students"
      modalProps={{
        title: "Search Students",
        content: <SearchPage
          searchTitle="Filter Students"
          meta={[
            {
              label: "First Name",
              inputType: TEXT,
              fieldName: "first_name__icontains",
            },
            {
              label: "Last Name",
              inputType: TEXT,
              fieldName: "last_name__icontains",
            },
            {
              label: "Email",
              inputType: TEXT,
              fieldName: "primary_email__icontains",
            }
          ]}
          tableProps={{
            ...getContactListTableColumns(),
            searchParams: {
              profile_stores__store: storeData.store
            },
            hideSettings: true,
            rowSelection: {
              type: "checkbox",
              onChange: (selectedRowKeys: React.Key[], selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
            },
          }}
          hideHeading
          stopProducingQueryParams
          initSearchAtMount
        />,
        closeEventName: `CREATE_BULK_ENROLLMENT`,
        actions: [
          <Button>Select</Button>
        ]
      }}
    />
  )
}