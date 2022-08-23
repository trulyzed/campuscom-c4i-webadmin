import { useState } from "react"
import { Redirect } from "react-router-dom"
import { notification } from "antd"
import { TransactionBatchFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/TransactionBatchFormMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { getTransactionBatchListTableColumns } from "~/TableSearchMeta/TransactionBatches/TransactionBatchListTableColumns"
import { TransactionBatchSearchMeta } from "~/TableSearchMeta/TransactionBatches/TransactionBatchSearchMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"

export const List = () => {
  const [redirectAfterCreate, setRedirectAfterCreate] = useState(String)

  const createEntity = QueryConstructor(((data) => TransactionBatchQueries.create({ ...data }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      setRedirectAfterCreate(`/storefront-data/transaction-batch/${resp.data.id}`)
    }
    return resp
  })), [TransactionBatchQueries.create])

  return (
    <>
      {redirectAfterCreate && <Redirect to={redirectAfterCreate} />}
      <SearchPage
        title={"Transaction Batches"}
        meta={TransactionBatchSearchMeta}
        tableProps={{
          ...getTransactionBatchListTableColumns(),
          actions: [
            <MetaDrivenFormModalOpenButton
              formTitle={`Add Transaction Batch`}
              formMeta={TransactionBatchFormMeta}
              formSubmitApi={createEntity}
              buttonLabel={`Add Transaction Batch`}
              iconType="create"
            />
          ]
        }}
      />
    </>
  )
}
