import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { SearchPage } from "~/packages/components/Page/SearchPage/SearchPage"
import { GlobalConfigurationQueries } from "~/packages/services/Api/Queries/AdminQueries/GlobalConfigurations"
import { QueryConstructor } from "~/packages/services/Api/Queries/AdminQueries/Proxy"
import { getGlobalConfigurationListTableColumns } from "~/TableSearchMeta/GlobalConfiguration/GlobalConfigurationListTableColumns"
import { GlobalConfigurationSearchMeta } from "~/TableSearchMeta/GlobalConfiguration/GlobalConfigurationSearchMeta"
import { MetaDrivenFormModalOpenButton } from "~/packages/components/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { GlobalConfigurationFormMeta } from "~/Component/Feature/GlobalConfigurations/FormMeta/GlobalConfigurationFormMeta"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => GlobalConfigurationQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/configuration/global-configuration/${resp.data.id}`)
    }
    return resp
  })), [GlobalConfigurationQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Global Configurations"}
        meta={GlobalConfigurationSearchMeta}
        tableProps={{
          ...getGlobalConfigurationListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Global Configuration`}
              formMeta={GlobalConfigurationFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Global Configuration`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
