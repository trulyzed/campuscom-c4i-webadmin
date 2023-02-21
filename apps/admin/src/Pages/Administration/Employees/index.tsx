import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { getEmployeeListTableColumns } from "~/TableSearchMeta/Employee/EmployeeListTableColumns"
import { EmployeeSearchMeta } from "~/TableSearchMeta/Employee/EmployeeSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { EmployeeQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Employees"
import { getEmployeeFormMeta } from "~/Component/Feature/Employees/FormMeta/EmployeeFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => EmployeeQueries.create({ ...data, data: { ...data?.data, companies: [data?.data.companies] } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/administration/employee/${resp.data.employee_profile_id}`)
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
