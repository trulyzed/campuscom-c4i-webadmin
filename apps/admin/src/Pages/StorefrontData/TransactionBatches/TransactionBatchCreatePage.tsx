import { Button, Card, Col, notification, Row, Space } from "antd"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { TransactionSearchMeta2 } from "~/TableSearchMeta/Transaction/TransactionSearchMeta"
import { useCallback, useState } from "react"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"
import { DetailsSummary } from "@packages/components/lib/Page/DetailsPage/DetailsSummaryTab"
import { getTransactionBatchEmphasizedSummaryMeta, getTransactionBatchSummaryMeta } from "~/TableSearchMeta/TransactionBatchCreate/TransactionBatchSummaryMeta"
import { MetaDrivenFormModalOpenButton } from "@packages/components/lib/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { PaymentFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/PaymentFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { useHistory } from "react-router-dom"

enum StepNames {
  FilterTransactions,
  CreateBatch,
}

export const TransactionBatchCreatePage = () => {
  const { push: routerPush } = useHistory()
  const [currentStep, setCurrentStep] = useState(StepNames.FilterTransactions)
  const [searchData, setSearchData] = useState<{ data: any, summary: any, searchParams: any }>()
  const [isProcessing, setIsProcessing] = useState(false)
  const [batchData, setBatchData] = useState<any>()

  const handleSearch = QueryConstructor((data) => {
    reset()
    return TransactionQueries.getList({ ...data, params: { ...data?.params, payment_transactions__status: "completed", transaction_batch__isnull: "True", settlement_status: "unsettled" } }).then(resp => {
      if (resp.success) setSearchData({ data: resp.data.list, searchParams: resp.data.searchParams, summary: resp.data.summary })
      return {
        ...resp,
        data: resp.data?.list
      }
    })
  }, [TransactionQueries.getList])

  const handleCreateBatch = useCallback(async () => {
    setIsProcessing(true)
    const filterParams: Record<string, any> = {
      course_provider: searchData?.searchParams.cart__cart_items__product__store_course_section__section__course__course_provider,
      end_date: searchData?.searchParams.payment_transactions__transaction_time__lt,
      store: searchData?.searchParams.cart__store,
      payment_transactions__status: "completed",
      settlement_status: "unsettled"
    }

    Object.keys(filterParams).forEach(key => {
      if (filterParams[key] === undefined) delete filterParams[key]
    })

    const resp = await TransactionBatchQueries.create({
      data: {
        filter_params: filterParams,
        totals: searchData?.summary
      }
    })
    setIsProcessing(false)
    if (resp.success) {
      setBatchData(resp.data)
    }
  }, [searchData])

  const reset = useCallback(() => {
    setCurrentStep(StepNames.FilterTransactions)
    setSearchData(undefined)
    setBatchData(undefined)
  }, [])

  const makePayment = QueryConstructor(((data) => TransactionBatchQueries.update({ ...data, params: { id: batchData.id } }).then(resp => {
    if (resp.success) {
      notification.success({ message: CREATE_SUCCESSFULLY })
      routerPush(`/storefront-data/settlement-batch/${batchData.id}`)
    }
    return resp
  })), [TransactionBatchQueries.update])

  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        title={
          <Row>
            <Col flex="auto">
              <SidebarMenuTargetHeading level={1} targetID="navigation">
                Create Settlement Batch
              </SidebarMenuTargetHeading>
            </Col>
            <Col flex="none">
              <HelpButton helpKey={'Create Settlement Batch'} />
            </Col>
          </Row>
        }
        bodyStyle={{ padding: "0" }}
      />
      {batchData ?
        <Alert
          className="my-10"
          type="success"
          message={"Settlement Batch Created"}
          description={
            <>
              <div>
                <span>Your settlement batch ID is {renderLink(`/storefront-data/settlement-batch/${batchData.id}`, batchData.batch_ref)}</span>
              </div>
              <div>
                <span>
                  You can pay this batch later from the {renderLink(`/storefront-data/settlement-batch/${batchData.id}`, 'batch details')} section, or
                </span>
                <MetaDrivenFormModalOpenButton
                  formTitle={`Make Payment`}
                  formMeta={PaymentFormMeta}
                  formSubmitApi={makePayment}
                  displayFieldValue={{
                    batch_id: batchData.batch_ref,
                    total_net_payment_received: batchData.totals?.net_payment_received,
                  }}
                  buttonLabel={`Pay Now`}
                  buttonSize={"small"}
                />
              </div>
            </>
          }
        />
        : null}
      <Row gutter={20} style={{ marginTop: "10px" }}>
        <Col md={24}>
          <Row>
            <Col md={24}>
              <SearchPage
                title="Unsettled Transactions"
                meta={TransactionSearchMeta2}
                tableProps={{
                  ...getTransactionListTableColumns(),
                  searchFunc: handleSearch
                }}
                hideHeading
                tableFooter={
                  currentStep === StepNames.FilterTransactions ? (
                    <Card bodyStyle={{ textAlign: "right" }} bordered={false}>
                      <Button type="primary" disabled={!searchData || !searchData.data.length} children={"Next"} onClick={() => setCurrentStep(StepNames.CreateBatch)} />
                    </Card>
                  ) : null
                }
                stopProducingQueryParams
              />
            </Col>          </Row>
          {currentStep === StepNames.CreateBatch ?
            <Row style={{ marginTop: "15px" }}>
              <Col md={24}>
                <DetailsSummary horizontal summary={getTransactionBatchSummaryMeta(searchData?.summary)} />
                <DetailsSummary horizontal summary={getTransactionBatchEmphasizedSummaryMeta(searchData?.summary)} />
              </Col>
              {!batchData ?
                <Col span={24}>
                  <Card bodyStyle={{ textAlign: "right" }} bordered={false}>
                    <Space>
                      <Button children={"Previous"} onClick={() => setCurrentStep(StepNames.FilterTransactions)} />
                      <Button loading={isProcessing} type="primary" children={"Create Batch"} onClick={handleCreateBatch} />
                    </Space>
                  </Card>
                </Col>
                : null}
            </Row>
            : null}
        </Col>
      </Row>
    </>
  )
}