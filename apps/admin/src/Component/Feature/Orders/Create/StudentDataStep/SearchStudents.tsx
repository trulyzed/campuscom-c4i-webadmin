import { ContextAction } from "@packages/components/lib/Actions/ContextAction"
import { TEXT } from "@packages/components/lib/Form/common"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
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
      modalContent={
        <SearchPage
          title="Contacts"
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
          }}
          hideHeading
          // tableFooter={
          //   currentStep === StepNames.FilterTransactions ? (
          //     <Card bodyStyle={{ textAlign: "right" }} bordered={false}>
          //       <Button type="primary" disabled={!searchData || !searchData.data.length} children={"Next"} onClick={() => setCurrentStep(StepNames.CreateBatch)} />
          //     </Card>
          //   ) : null
          // }
          stopProducingQueryParams
          initSearchAtMount
        />
      }
      modalCloseEventName={`CREATE_BULK_ENROLLMENT`}
    />
  )
}