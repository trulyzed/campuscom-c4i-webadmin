import { Button, Card, Col, notification, Row, Space } from "antd"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionListTableColumns } from "~/TableSearchMeta/Transaction/TransactionListTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/TransactionBatchCreate/TransactionSearchMeta"
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
import { getPaymentFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/PaymentFormMeta"
import { CREATE_SUCCESSFULLY } from "~/Constants"
import { useHistory } from "react-router-dom"

enum StepNames {
  FilterTransactions,
  CreateBatch,
}

const getSummary = (data = []): Record<string, number | undefined> => {
  const summary: Record<string, number> = {
    gross_order_amount: 0,
    discount: 0,
    net_order_amount: 0,
    card_fees: 0,
    net_payment_received: 0
  }

  data.forEach((i: any) => {
    summary["gross_order_amount"] += (i["gross_order_amount"] || 0)
    summary["discount"] += (i["discount"] || 0)
    summary["net_order_amount"] += (i["net_order_amount"] || 0)
    summary["card_fees"] += (i["card_fees"] || 0)
    summary["net_payment_received"] += (i["net_payment_received"] || 0)
  })

  return summary
}

export const TransactionBatchCreatePage = () => {
  const { push: routerPush } = useHistory()
  const [currentStep, setCurrentStep] = useState(StepNames.FilterTransactions)
  const [searchData, setSearchData] = useState<{ data: any, summary: any, searchParams: any }>()
  const [isProcessing, setIsProcessing] = useState(false)
  const [batchData, setBatchData] = useState<any>()

  const handleSearch = QueryConstructor((data) => {
    reset()
    return TransactionQueries.getBatchableList({ ...data, params: { ...data?.params, payment_transactions__status: "completed", transaction_batch__isnull: "True", settlement_status: "unsettled" } }).then(resp => {
      if (resp.success) setSearchData({ data: resp.data.list, searchParams: resp.data.searchParams, summary: getSummary(resp.data.list.map((i: any) => i.cart)) })
      return {
        ...resp,
        data: resp.data?.list
      }
    })
  }, [TransactionQueries.getBatchableList])

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
      routerPush(`/transaction/settlement-batch/${batchData.id}`)
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
                <span>Your settlement batch ID is {renderLink(`/transaction/settlement-batch/${batchData.id}`, batchData.batch_ref)}</span>
              </div>
              <div>
                <span>
                  You can pay this batch later from the {renderLink(`/transaction/settlement-batch/${batchData.id}`, 'batch details')} section, or
                </span>
                <MetaDrivenFormModalOpenButton
                  formTitle={`Make Payment`}
                  formMeta={getPaymentFormMeta()}
                  formSubmitApi={makePayment}
                  displayFieldValue={{
                    batch_id: batchData.batch_ref,
                    total_net_payment_received: batchData.totals?.net_payment_received,
                    total_transactions: searchData?.data?.length
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
                meta={TransactionSearchMeta}
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
            </Col>
          </Row>
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