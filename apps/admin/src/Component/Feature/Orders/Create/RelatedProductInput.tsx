import { useCallback, useEffect, useState } from "react"
import { Card } from "antd"
import { useDependencyValue } from "@packages/components/lib/Hooks/useDependencyValue"
import { EnrollmentQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Enrollments"
import { IGeneratedField } from "@packages/components/lib/Form/common"
import { renderAmount, ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { FormInputNumber } from "@packages/components/lib/Form/FormInputNumber"
import { FormInput } from "@packages/components/lib/Form/FormInput"

export const RelatedProductInput = (props: IGeneratedField & { store: string }) => {
  const { store, dependencyValue } = props
  const { product } = dependencyValue || {}
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  useDependencyValue({ ...props })

  const getRelatedProducts = useCallback(async () => {
    if (!store || !product) return
    setIsProcessing(true)
    const resp = await EnrollmentQueries.getRelatedProductList({ data: { product_ids: [product], store: store } })
    setRelatedProducts(resp.success ? resp.data.products[0]?.related_products : [])
    setIsProcessing(false)
  }, [product, store])

  useEffect(() => {
    getRelatedProducts()
  }, [product, store, getRelatedProducts])

  return (
    <Card>
      <ResponsiveTable
        columns={[
          {
            title: "Title",
            dataIndex: "title",
            render: (text, record) => (
              <>
                <span>{text}</span>
                <FormInput
                  fieldName={`related_product_title__${record.id}`}
                  formInstance={props.formInstance}
                  label={""}
                  initialValue={record.title}
                  disabled
                  hidden
                />
              </>
            )
          },
          {
            title: "Price",
            dataIndex: "price",
            render: renderAmount
          },
          {
            title: "Quantity",
            dataIndex: "quantity",
            render: (_, record) => (
              <FormInputNumber
                fieldName={`related_product_quantity__${record.id}`}
                formInstance={props.formInstance}
                label={""}
                formItemStyle={{ margin: 0 }}
              />
            )
          }
        ]}
        dataSource={relatedProducts}
        loading={isProcessing}
        hidePagination
        disableSorting
        rowKey="id"
      />
    </Card>
  )
}