import { notification } from "antd"
import { ImportTaskFormMeta } from "~/Component/Feature/ImportTasks/FormMeta/ImportTaskFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { ImportTaskQueries } from "@packages/services/lib/Api/Queries/AdminQueries/ImportTasks"
import { getImportTaskListTableColumns } from "~/TableSearchMeta/ImportTasks/ImportTaskListTableColumns"
import { ImportTaskSearchMeta } from "~/TableSearchMeta/ImportTasks/ImportTaskSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const createEntity = QueryConstructor(((data) => ImportTaskQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      window.location.href = "?pagination=1"
    }
    return resp
  })), [ImportTaskQueries.create])

  return (
    <SearchPage
      title={"Import Tasks"}
      meta={ImportTaskSearchMeta}
      tableProps={{
        ...getImportTaskListTableColumns(),
        actions: [
          <MetaDrivenFormModalOpenButton
            formTitle={`Create Task`}
            formMeta={ImportTaskFormMeta}
            formSubmitApi={createEntity}
            buttonLabel={`Create Task`}
            iconType="create"
            refreshEventName={"REFRESH_IMPORT_TASK"}
          />
        ]
      }}
    />
  )
}
