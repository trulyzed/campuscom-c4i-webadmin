import { useEffect, useState } from "react"
import { Button, Card, Col, Row, Typography } from "antd"
import { Steps } from "./Utils/types"
import { renderBoolean, ResponsiveTable } from "@packages/components/lib/ResponsiveTable"
import { ContactQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Contacts"

interface ISummaryDataStepProps {
  storeData: Record<string, any>
  productData: Record<string, any>[]
  studentData: Record<string, any>[]
  steps: Record<keyof typeof Steps, number>
  currentStep: number
  setCurrentStep: (step: Steps) => void
}

export const SummaryDataStep = ({
  storeData,
  productData,
  studentData,
  currentStep,
  setCurrentStep,
}: ISummaryDataStepProps) => {
  const [contactList, setContactList] = useState<Record<string, any>[]>([])
  const [studentDataWith, setStudentDataWith] = useState<Record<string, any>[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const getContactList = async () => {
      setIsProcessing(true)
      const resp = await ContactQueries.getList({ params: { profile_stores__store: storeData.store } })
      if (resp.success) setContactList(resp.data)
      setIsProcessing(false)
    }
    getContactList()
  }, [storeData, studentData])

  useEffect(() => {
    setStudentDataWith(studentData.map(i => ({
      ...i,
      is_new: !contactList.find(j => j.primary_email === i.primary_email)
    })))
  }, [contactList, studentData])

  return (
    <Card style={{ margin: "10px 0 0 10px" }} title={"Summary"}>
      <Row>
        <Col xs={24}>
          <ResponsiveTable
            tableTitle="Products"
            columns={[
              {
                title: 'Title',
                dataIndex: 'title',
                sorter: (a: any, b: any) => a.title - b.title
              },
              {
                title: 'Product Type',
                dataIndex: 'product_type',
                sorter: (a: any, b: any) => a.product_type - b.product_type
              },
            ]}
            dataSource={productData}
            rowKey={"id"}
            hideSettings
            hidePagination
          />
        </Col>
        <Col xs={24} className={"mt-20"}>
          <ResponsiveTable
            tableTitle="Students"
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                sorter: (a: any, b: any) => a.name - b.name
              },
              {
                title: 'Email',
                dataIndex: 'primary_email',
                sorter: (a: any, b: any) => a.primary_email - b.primary_email
              },
              {
                title: 'New Contact',
                dataIndex: 'is_new',
                render: renderBoolean,
                sorter: (a: any, b: any) => a.is_new - b.is_new
              },
            ]}
            loading={isProcessing}
            dataSource={studentDataWith}
            rowKey={"primary_email"}
            hideSettings
            hidePagination
          />
        </Col>
        <Col xs={24} className={"mt-20"}>
          <Typography.Text type="warning" italic>*All students will be enrolled to all the products</Typography.Text>
        </Col>
        <Col xs={24} md={{ span: 6, offset: 18 }} style={{ textAlign: "right" }}>
          <Button style={{ marginTop: "20px", }} type="primary" children={"Submit"} onClick={() => setCurrentStep(currentStep + 1)} />
        </Col>
      </Row>
    </Card>
  )
}