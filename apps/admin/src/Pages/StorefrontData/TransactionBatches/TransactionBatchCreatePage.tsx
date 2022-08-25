import { Button, Card, Col, Row, Steps } from "antd"
import { SearchPage } from "@packages/components/lib/Page/SearchPage/SearchPage"
import { getTransactionListTableColumns } from "~/TableSearchMeta/TransactionBatchCreate/TransactionListTableColumns"
import { TransactionSearchMeta } from "~/TableSearchMeta/TransactionBatchCreate/TransactionSearchMeta"
import { useCallback, useState } from "react"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { getTransactionBatchRevenueCalculateFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/TransactionBatchRevenueCalculateFormMeta"
import { getDecimalValue } from "@packages/utilities/lib/util"
import { PaymentFormMeta } from "~/Component/Feature/TransactionBatches/FormMeta/PaymentFormMeta"
import { TransactionBatchQueries } from "@packages/services/lib/Api/Queries/AdminQueries/TransactionBatches"
import { renderLink } from "@packages/components/lib/ResponsiveTable"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { QueryConstructor } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy"
import { TransactionQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Transactions"

const { Step } = Steps

enum StepNames {
  FilterTransactions,
  CreateBatch,
  MakePayment,
}

export const TransactionBatchCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(StepNames.FilterTransactions)
  const [searchData, setSearchData] = useState<{ data: any, searchParams: any }>()
  const [revenuePercentage, setRevenuePercentage] = useState<number>()
  const [isProcessing, setIsProcessing] = useState(false)
  const [batchData, setBatchData] = useState<any>({ id: 234 })
  const totalTransactionAmount = 200
  const revenueAmount = revenuePercentage !== undefined ? 200 * (revenuePercentage / 100) : undefined
  const totalChequeAmount = revenueAmount !== undefined ? (totalTransactionAmount - revenueAmount) : undefined

  const handleStepChange = useCallback((current) => {
    setCurrentStep(current)
  }, [])

  const handleCreateBatch = useCallback(async () => {
    setIsProcessing(true)
    const resp = await TransactionBatchQueries.create({ data: searchData?.searchParams })
    setIsProcessing(false)
    if (resp.success) {
      setBatchData(resp.data)
      setCurrentStep(StepNames.MakePayment)
    }
  }, [searchData])

  const handleMakePayment = useCallback(async (values) => {
    setIsProcessing(true)
    const resp = await TransactionBatchQueries.makePayment({ data: values })
    setIsProcessing(false)
    if (resp.success) {
      setCurrentStep(StepNames.FilterTransactions)
      setSearchData(undefined)
      setRevenuePercentage(undefined)
      setBatchData(undefined)
    }
  }, [])

  return (
    <>
      <Card
        style={{ marginTop: "10px" }}
        title={
          <Row>
            <Col flex="auto">
              <SidebarMenuTargetHeading level={1} targetID="navigation">
                Create Transaction Batch
              </SidebarMenuTargetHeading>
            </Col>
            <Col flex="none">
              <HelpButton helpKey={'Create Transaction Batch'} />
            </Col>
          </Row>
        }
        bodyStyle={{ padding: "0" }}
      />
      {batchData ?
        <Alert
          className="my-10"
          type="success"
          message={"Success"}
          description={<span>Batch creation was successful (Batch reference: {renderLink(`/storefront-data/transaction-batch/${batchData.id}`, batchData.id)})</span>}
        />
        : null}
      <Row gutter={20} style={{ marginTop: "10px" }}>
        <Col md={4}>
          <Card>
            <Steps direction="vertical" size="small" current={currentStep} onChange={handleStepChange}>
              <Step title="Transactions" />
              <Step title="Create Batch" />
              <Step title="Make Payment" />
            </Steps>
          </Card>
        </Col>
        <Col md={20}>
          {currentStep === StepNames.FilterTransactions ?
            <Row>
              <Col md={24}>
                <SearchPage
                  title="Transactions"
                  meta={TransactionSearchMeta}
                  tableProps={{
                    ...getTransactionListTableColumns(),
                    searchFunc: QueryConstructor((data) => TransactionQueries.getList({ ...data, params: { ...data?.params, payment_transactions__status: "completed" } }), [TransactionQueries.getList])
                  }}
                  hideHeading
                  onChange={setSearchData}
                />
              </Col>
              <Col span={19} offset={5}>
                <Card bodyStyle={{ textAlign: "right" }}>
                  <Button type="primary" disabled={!searchData || !searchData.data.length} children={"Continue"} onClick={() => setCurrentStep(StepNames.CreateBatch)} />
                </Card>
              </Col>
            </Row>
            : null}
          {currentStep === StepNames.CreateBatch ?
            <Row>
              <Col md={24}>
                <MetaDrivenForm
                  title={"Calculate Revenue"}
                  meta={getTransactionBatchRevenueCalculateFormMeta(revenuePercentage === undefined)}
                  initialFormValue={{
                    total_transaction_amount: totalTransactionAmount !== undefined ? `$${getDecimalValue(totalTransactionAmount)}` : undefined,
                    revenue_amount: revenueAmount !== undefined ? `$${getDecimalValue(revenueAmount)}` : undefined,
                    total_cheque_amount: totalChequeAmount !== undefined ? `$${getDecimalValue(totalChequeAmount)}` : undefined,
                    revenue_percentage: revenuePercentage,
                  }}
                  onApplyChanges={(values) => setRevenuePercentage(values.revenue_percentage)}
                  applyButtonLabel="Calculate"
                  actionContainerStyle={{ justifyContent: "flex-start" }}
                  stopProducingQueryParams
                  isVertical />
              </Col>
              <Col span={24}>
                <Card bodyStyle={{ textAlign: "right" }}>
                  <Button type="primary" disabled={!searchData || !searchData.data.length || !revenuePercentage} loading={isProcessing} children={"Create Batch"} onClick={handleCreateBatch} />
                </Card>
              </Col>
            </Row>
            : null}
          {currentStep === StepNames.MakePayment ?
            <Row>
              <Col md={24}>
                <MetaDrivenForm
                  title={"Make Payment"}
                  meta={PaymentFormMeta}
                  onApplyChanges={handleMakePayment}
                  applyButtonLabel="Submit"
                  disableApplyButton={isProcessing || !batchData}
                  stopProducingQueryParams />
              </Col>
            </Row>
            : null}
        </Col>
      </Row>
    </>
  )
}