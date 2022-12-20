import { useState } from "react"
import { Redirect } from "react-router"
import { notification } from "antd"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getCertificateListTableColumns } from "~/TableSearchMeta/Certificate/CertificateListTableColumns"
import { CertificateSearchMeta } from "~/TableSearchMeta/Certificate/CertificateSearchMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { CertificateQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Certificates"
import { getCertificateFormMeta } from "~/Component/Feature/Certificates/FormMeta/CertificateFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => CertificateQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/course-provider/certificate/${resp.data.id}`)
    }
    return resp
  })), [CertificateQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Certificates"}
        meta={CertificateSearchMeta}

        tableProps={{
          ...getCertificateListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Create Certificate`}
              formMeta={getCertificateFormMeta()}
              formSubmitApi={createEntity}
              buttonLabel={`Create Certificate`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
