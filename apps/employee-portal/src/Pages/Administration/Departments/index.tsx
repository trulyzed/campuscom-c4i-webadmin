import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getDepartmentFormMeta } from "~/Component/Feature/Departments/FormMeta/DepartmentFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { DepartmentQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Departments"
import { getDepartmentListTableColumns } from "~/TableSearchMeta/Department/DepartmentListTableColumns"
import { DepartmentSearchMeta } from "~/TableSearchMeta/Department/DepartmentSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => DepartmentQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/department/${resp.data.id}`)
    }
    return resp
  })), [DepartmentQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Departments"}
        meta={DepartmentSearchMeta}
        tableProps={{
          ...getDepartmentListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Department`}
              formMeta={getDepartmentFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Department`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
