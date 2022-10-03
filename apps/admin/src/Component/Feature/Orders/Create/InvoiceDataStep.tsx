import { Button, Card, Col, Divider, Popover, Row } from "antd"
import Text from "antd/lib/typography/Text"
import { StepNames } from "./common"
import { renderAmount } from "@packages/components/lib/ResponsiveTable"
import { MetaDrivenForm } from "@packages/components/lib/Form/MetaDrivenForm"
import { IField, TEXT } from "@packages/components/lib/Form/common"
import { useCallback, useEffect, useState } from "react"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"

interface IInvoiceDataStepProps {
  storeData: Record<string, any>
  invoiceData?: Record<string, any>
  couponCode?: string
  setInvoiceData: (...args: any[]) => void
  setCouponCode: (...args: any[]) => void
  setCurrentStep: (step: StepNames) => void
  generateCartDetailsPayload: () => any[]
}

export const InvoiceDataStep = ({
  storeData,
  invoiceData,
  setInvoiceData,
  couponCode,
  setCouponCode,
  setCurrentStep,
  generateCartDetailsPayload,
}: IInvoiceDataStepProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const getPaymentSummary = useCallback(async () => {
    const payload = {
      cart_details: generateCartDetailsPayload(),
      store: storeData.store,
      coupon_codes: couponCode ? [couponCode] : [],
    }
    setIsProcessing(true)
    const resp = await EnrollmentQueries.getPaymentSummary({ data: payload })
    setIsProcessing(false)
    setInvoiceData(!resp.data?.message ? resp.data : undefined)
  }, [couponCode, storeData, setInvoiceData, generateCartDetailsPayload])

  useEffect(() => {
    getPaymentSummary()
  }, [couponCode, getPaymentSummary])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Invoice"} loading={isProcessing}>
      {invoiceData ?
        <Row>
          <Col xs={24}>
            <Row>
              {invoiceData.products.map((product: any) => (
                <Col xs={24} key={product.id}>
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
                  {product.related_products.map((relatedProduct: any) => (
                    <Row gutter={10} key={relatedProduct.id}>
                      <Col md={8}><Text>+ {relatedProduct.title}</Text></Col>
                      <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.item_price)} x {relatedProduct.quantity}</Col>
                      <Col md={8} style={{ textAlign: "right" }}>{renderAmount(relatedProduct.price)}</Col>
                    </Row>
                  ))}
                  <Divider />
                </Col>
              ))}
            </Row>
            <Row gutter={[0, 20]}>
              <Col xs={{ span: 24, order: 2 }} md={{ span: 10, order: 0 }} style={{ textAlign: "right" }}>
                <MetaDrivenForm
                  meta={meta}
                  onApplyChanges={(values) => setCouponCode(values.coupon)}
                  isWizard
                  applyButtonLabel="Apply"
                  showFullForm
                  isVertical
                  isModal
                  stopProducingQueryParams
                  initialFormValue={{ coupon: couponCode }}
                />
              </Col>
              <Col xs={24} md={14} style={{ textAlign: "right" }}>
                <div>Sub-total {renderAmount(invoiceData.subtotal)}</div>
                <div>Total Discount (-) {renderAmount(invoiceData.total_discount)}</div>
                <div style={{ marginTop: "10px" }}><Text strong>Total Payable {renderAmount(invoiceData.total_payable)}</Text></div>
              </Col>
            </Row>
          </Col>
          <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
            <Button style={{ marginTop: "20px", }} type="primary" children={"Continue"} onClick={() => setCurrentStep(StepNames.PaymentInformation)} />
          </Col>
        </Row>
        : null
      }
    </Card>
  )
}


const meta: IField[] = [
  {
    fieldName: "coupon",
    label: "Coupon",
    inputType: TEXT,
  },
]