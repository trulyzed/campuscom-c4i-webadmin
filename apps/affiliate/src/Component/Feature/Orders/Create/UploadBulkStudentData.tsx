import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { PermissionWrapper } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const UploadBulkStudentData = () => {
  return (
    <MetaDrivenFormModalOpenButton
      buttonLabel="Upload Bulk"
      formMeta={[
        {
          fieldName: 'file',
          label: 'File',
          inputType: 'FILE',
          accept: '.csv'
        }
      ]}
      formTitle={"Upload bulk student data"}
      formSubmitApi={PermissionWrapper(() => Promise.resolve({
        code: 200,
        data: undefined,
        success: true,
        error: false
      }), [{ is_public: true }])}
      buttonType={"ghost"}
    />
  )
}