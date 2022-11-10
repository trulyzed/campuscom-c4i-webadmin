import { Button, Card, Col, Divider, Popover, Row } from "antd"
import Text from "antd/lib/typography/Text"
import { Steps } from "./Utils/types"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { useCallback, useEffect, useState } from "react"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

interface ISummaryDataStepProps {
  invoiceData?: Record<string, any>
  couponCode?: string
  setInvoiceData: (...args: any[]) => void
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
  generatePaymentSummaryPayload: () => Record<string, any>
}

export const SummaryDataStep = ({
  invoiceData,
  setInvoiceData,
  couponCode,
  currentStep,
  setCurrentStep,
  generatePaymentSummaryPayload,
}: ISummaryDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const getCreatableOrderPaymentSummary = useCallback(async () => {
    setIsProcessing(true)
    const resp = await OrderQueries.getCreatableOrderPaymentSummary({ data: generatePaymentSummaryPayload() })
    setIsProcessing(false)
    setInvoiceData(!resp.data?.message ? resp.data : undefined)
  }, [setInvoiceData, generatePaymentSummaryPayload])

  useEffect(() => {
    getCreatableOrderPaymentSummary()
  }, [couponCode, getCreatableOrderPaymentSummary])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Summary"} loading={isProcessing}>
      {invoiceData ?
        <Row>
          <Col xs={24}>
            <Row>
              {invoiceData.products.map((product: any, idx: number) => (
                <Col xs={24} key={`${product.id}__${idx}`}>
                  <Row gutter={10}>
                    <Col xs={24} md={8}><Text strong>{product.title}</Text></Col>
                    <Col xs={24} md={8} style={{ textAlign: "right" }}>{renderAmount(product.item_price)} x {product.quantity}</Col>
                    <Col xs={24} md={8} style={{ textAlign: "right" }}>
                      <div>
                        {renderAmount(product.total_amount)}
                        {product.total_discount ?
                          <Popover title={<Text strong>Total Discount {renderAmount(product.total_discount)}</Text>} trigger={"hover"} content={product.discounts.map((d: any) => <p key={d.code}><Text code>{d.code}</Text> {renderAmount(d.amount)}</p>)}>
                            <span className="glyphicon glyphicon-info-sign ml-2 cursor-pointer" />
                          </Popover> : null
                        }
                      </div>
                      <div>{product.total_discount ? <Text type="danger" delete>{renderAmount(product.price)}</Text> : null}</div>
                    </Col>
                  </Row>
                  {product.related_products.map((relatedProduct: any, idx2: number) => (
                    <Row gutter={10} key={`${relatedProduct.id}__${idx2}`}>
                      <Col md={8}><Text>+ {relatedProduct.title}</Text></Col>
                      <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.item_price)} x {relatedProduct.quantity}</Col>
                      <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.price)}</Col>
                    </Row>
                  ))}
                  <Divider />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
            <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(currentStep + 1)} />
          </Col>
        </Row>
        : null
      }
    </Card>
  )
}