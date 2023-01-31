import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { getEmployeeFormMeta } from "~/Component/Feature/Employees/FormMeta/EmployeeFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/EmployeePortalQueries/Employees"
import { getEmployeeListTableColumns } from "~/TableSearchMeta/Employee/EmployeeListTableColumns"
import { EmployeeSearchMeta } from "~/TableSearchMeta/Employee/EmployeeSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => EmployeeQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/employee-management/employee/${resp.data.id}`)
    }
    return resp
  })), [EmployeeQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Employees"}
        meta={EmployeeSearchMeta}
        tableProps={{
          ...getEmployeeListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Employee`}
              formMeta={getEmployeeFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Employee`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
