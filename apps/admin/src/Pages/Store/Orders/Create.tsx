import { Card, Col, notification, Row } from "antd"
import { SidebarMenuTargetHeading } from "@packages/components/lib/SidebarNavigation/SidebarMenuTargetHeading"
import { HelpButton } from "@packages/components/lib/Help/HelpButton"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Alert } from "@packages/components/lib/Alert/Alert"
import { Steppers } from "~/Component/Feature/Orders/Create/Steppers"
import { StudentDataStep } from "~/Component/Feature/Orders/Create/StudentDataStep"
import { PurchaserDataStep } from "~/Component/Feature/Orders/Create/PurchaserDataStep"
import { ProductDataStep } from "~/Component/Feature/Orders/Create/ProductDataStep"
import { RegistrationDataStep } from "~/Component/Feature/Orders/Create/RegistrationDataStep"
import { AdditionalRegistrationDataStep } from "~/Component/Feature/Orders/Create/AdditionalRegistrationDataStep"
import { InvoiceDataStep } from "~/Component/Feature/Orders/Create/InvoiceDataStep"
import { PaymentDataStep } from "~/Component/Feature/Orders/Create/PaymentDataStep"
import { StepNames } from "~/Component/Feature/Orders/Create/common"
import { StoreDataStep } from "~/Component/Feature/Orders/Create/StoreDataStep"
import { parseQuestionsMeta } from "@packages/components/lib/Utils/parser"
import { OrderQueries } from "@packages/services/lib/Api/Queries/AdminQueries/Orders"

export const Create = () => {
  const [currentStep, setCurrentStep] = useState(StepNames.StoreInformation)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderDetails, setOrderDetails] = useState<Record<string, any>>()
  const [storeData, setStoreData] = useState<Record<string, any>>()
  const [productData, setProductData] = useState<Record<string, any>[]>([])
  const registrationProductData = useMemo(() => productData.filter(i => i.unit === "registration"), [productData])
  const [purchaserData, setPurchaserData] = useState<Record<string, any>>()
  const [studentData, setStudentData] = useState<Record<string, any>[]>([])
  const [registrationData, setRegistrationData] = useState<Record<string, any>[]>([])
  const [invoiceData, setInvoiceData] = useState<Record<string, any>>()
  const [couponCode, setCouponCode] = useState()
  const [orderRef, setOrderRef] = useState<string | undefined>()
  const hasValidStoreData = !!storeData
  const hasValidProductData = !!productData.length
  const hasValidPurchaserData = !!purchaserData
  const hasValidStudentData = studentData.length >= Math.max(...registrationProductData.map(i => i.quantity))
  const hasValidRegistrationData = registrationProductData.every(i => i.quantity === registrationData.find(j => j.product === i.id)?.students.length)

  useEffect(() => {
    setRegistrationData(registrationData => {
      return registrationData.reduce((a, c) => {
        if (registrationProductData.some(p => p.id === c.product)) {
          c.students = c.students.filter((id: any) => studentData.some(student => student.id === id))
          a.push(c)
        }
        return a
      }, []) as Record<string, any>[]
    })
  }, [registrationProductData, studentData])

  const handleStepChange = useCallback((current) => {
    setCurrentStep(current)
  }, [])

  const getOrderDetails = useCallback(async () => {
    if (!storeData?.store) {
      setOrderDetails(undefined)
      return
    }
    const productIds = productData.map(i => i.id)
    setIsProcessing(true)
    const resp = await OrderQueries.getCreatableOrderDetails({ data: { product_ids: productIds, store: storeData.store } })
    setIsProcessing(false)
    if (resp.success) setOrderDetails(resp.data)
    else setOrderDetails(undefined)
  }, [storeData, productData])

  useEffect(() => {
    getOrderDetails()
  }, [getOrderDetails])

  const generatePurchaserDetailsPayload = useCallback(() => {
    const profileQuestions = Object.keys(purchaserData || {}).reduce((a, c) => {
      if (c.includes("profile_question__")) a[c.split("profile_question__")[1]] = purchaserData?.[c]
      return a
    }, {} as Record<string, any>)

    return {
      first_name: purchaserData?.first_name,
      last_name: purchaserData?.last_name,
      primary_email: purchaserData?.email,
      purchasing_for: {
        type: purchaserData?.purchasing_for,
        ref: purchaserData?.company
      },
      extra_info: profileQuestions
    }
  }, [purchaserData])

  const generateCartDetailsPayload = useCallback(() => {
    return [...productData.reduce((a, c) => {
      for (const i of (c.related_products || [])) {
        a.push({
          product_id: i.id,
          quantity: i.quantity,
          is_related: true,
          related_to: c.id,
          student_email: "",
          is_reservation: false
        })
      }
      if (c.unit === "seat" || c.unit === "unit") {
        a.push({
          product_id: c.id,
          quantity: c.quantity,
          is_related: false,
          related_to: "",
          student_email: "",
          is_reservation: c.unit === "seat"
        })
      }
      return a
    }, []) as Record<string, any>[], ...registrationData.map(registration => ({
      product_id: registration.product,
      quantity: registration.students.length,
      is_related: false,
      related_to: "",
      student_email: "",
      is_reservation: false
    }))]
  }, [registrationData, productData])

  const generateStudentDetailsPayload = useCallback(() => {
    return registrationData.reduce((a, c) => {
      c.students.forEach((studentId: any) => {
        a.push({
          product_id: c.product,
          profile_id: studentId,
        })
      })
      return a
    }, [])
  }, [registrationData])

  const reset = useCallback(() => {
    setCurrentStep(StepNames.StoreInformation)
    setStoreData(undefined)
    setPurchaserData(undefined)
    setProductData([])
    setStudentData([])
    setRegistrationData([])
    setInvoiceData(undefined)
    setCouponCode(undefined)
  }, [])

  const handleSubmit = useCallback(async (values) => {
    const payload = {
      store: storeData?.store,
      purchaser_info: generatePurchaserDetailsPayload(),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      payment_ref: values.payment_ref,
      payment_note: values.payment_note,
    }
    setIsProcessing(true)
    const resp = await OrderQueries.create({ data: payload })
    setIsProcessing(false)
    if (resp.success && resp.data.order_ref) {
      setOrderRef(resp.data.order_ref)
      reset()
    } else {
      notification.error({ message: "Something went wrong!" })
    }
  }, [generatePurchaserDetailsPayload, generateCartDetailsPayload, generateStudentDetailsPayload, storeData, reset])

  return (
    <>
      {orderRef ?
        <Alert
          className="mb-20"
          type="success"
          message={"Success"}
          description={`Order creation was successful (Order ID: ${orderRef}).`}
          onClose={() => setOrderRef(undefined)}
        />
        : null}
      <Card
        title={
          <Row>
            <Col flex="auto">
              <SidebarMenuTargetHeading level={1} targetID="navigation">
                Create an Order
              </SidebarMenuTargetHeading>
            </Col>
            <Col flex="none">
              <HelpButton helpKey={'CreateOrder'} />
            </Col>
          </Row>
        }
        bodyStyle={{ padding: "0" }}
      />
      <Row>
        <Col md={6} lg={4} xs={24}>
          <Steppers
            currentStep={currentStep}
            onChange={handleStepChange}
            hasValidStoreData={hasValidStoreData}
            hasValidProductData={hasValidProductData}
            hasValidPurchaserData={hasValidPurchaserData}
            hasValidStudentData={hasValidStudentData}
            hasRegistrationProduct={!!registrationProductData.length}
            hasValidRegistrationData={hasValidRegistrationData}
          />
        </Col>
        <Col md={18} lg={20} xs={24}>
          {currentStep === StepNames.StoreInformation ?
            <StoreDataStep
              storeData={storeData}
              setStoreData={setStoreData}
              setCurrentStep={setCurrentStep}
            />
            : (currentStep === StepNames.ProductInformation && storeData) ?
              <ProductDataStep
                storeData={storeData}
                productData={productData}
                setProductData={setProductData}
                setCurrentStep={setCurrentStep}
                hasRegistrationProduct={!!registrationProductData.length}
              />
              : (currentStep === StepNames.PurchaserInformation && storeData) ?
                <PurchaserDataStep
                  storeData={storeData}
                  purchaserData={purchaserData}
                  profileQuestions={parseQuestionsMeta((orderDetails?.profile_questions || []).filter((i: any) => i.respondent_type === "purchaser"), "profile_question__")}
                  setPurchaserData={setPurchaserData}
                  setCurrentStep={setCurrentStep}
                />
                : (currentStep === StepNames.StudentInformation && storeData) ?
                  <StudentDataStep
                    storeData={storeData}
                    studentData={studentData}
                    setStudentData={setStudentData}
                    setCurrentStep={setCurrentStep}
                    isValid={hasValidStudentData}
                  />
                  : currentStep === StepNames.RegistrationInformation ?
                    <RegistrationDataStep
                      registrationProductData={registrationProductData}
                      studentData={studentData}
                      registrationData={registrationData}
                      setRegistrationData={setRegistrationData}
                      setCurrentStep={setCurrentStep}
                      isValid={hasValidRegistrationData}
                    />
                    : currentStep === StepNames.AdditionalRegistrationInformation ?
                      <AdditionalRegistrationDataStep
                        registrationProductData={registrationProductData}
                        studentData={studentData}
                        registrationData={registrationData}
                        registrationQuestions={((orderDetails?.products || []) as any[]).map(i => ({
                          product: i.id,
                          meta: parseQuestionsMeta((i.registration_questions || []))
                        }))}
                        setCurrentStep={setCurrentStep}
                      />
                      : (currentStep === StepNames.Invoice && storeData) ?
                        <InvoiceDataStep
                          storeData={storeData}
                          invoiceData={invoiceData}
                          couponCode={couponCode}
                          setInvoiceData={setInvoiceData}
                          setCouponCode={setCouponCode}
                          setCurrentStep={setCurrentStep}
                          generateCartDetailsPayload={generateCartDetailsPayload}
                        />
                        : currentStep === StepNames.PaymentInformation ?
                          <PaymentDataStep
                            onSubmit={handleSubmit}
                            loading={isProcessing}
                          />
                          : null}
        </Col>
      </Row>
    </>
  )
}



// const dummyData = {
//   "products": [
//     {
//       "id": "e51b72c0-cfe2-4a73-a0d0-32759c5ba747",
//       "external_id": "46575",
//       "title": "Data Science",
//       "slug": "BINT-3215",
//       "image_uri": null,
//       "external_image_url": null,
//       "provider": {
//         "id": "61712c3c471759e39c56238b",
//         "code": "j1"
//       },
//       "product_type": "store_course_section",
//       "section": {
//         "start_date": null,
//         "end_date": null,
//         "execution_site": null,
//         "execution_mode": "self-paced",
//         "name": "58191",
//         "external_id": "",
//         "product_id": "e51b72c0-cfe2-4a73-a0d0-32759c5ba747",
//         "price": 10.0,
//         "instructor": ""
//       },
//       "sections": [
//         {
//           "start_date": null,
//           "end_date": null,
//           "execution_site": null,
//           "execution_mode": "self-paced",
//           "name": "58191",
//           "external_id": "",
//           "product_id": "99610883-506a-4a8d-98e5-86938d1c4c5f",
//           "price": 10.0,
//           "instructor": ""
//         }
//       ],
//       "price": 10.0,
//       "registration_questions": [
//         {
//           id: "d0b9c7a9-f144-4549-ac4f-0d14d27b8530",
//           label: "<p>What is your gender?</p>",
//           type: "select",
//           configuration: {
//             options: [
//               {
//                 label: "Male",
//                 value: "M"
//               }
//             ],
//             required: true
//           },
//         }
//       ],
//       "related_products": []
//     }
//   ],
//   "cart_id": "",
//   "store": {
//     "id": "1fbae74d-3c10-488c-ae17-70a081be1652",
//     "created_at": "2021-10-21T06:14:23.296297Z",
//     "updated_at": "2022-06-15T03:54:30.433381Z",
//     "active_status": true,
//     "name": "Jenzabar University",
//     "url_slug": "jenzabar-university",
//     "is_active": false,
//     "store_logo_uri": "https://static.dev.campus4i.com/uploads/0e084222-a4ac-4d2a-910f-5f79c6f5d5a8.png",
//     "gtm_id": null,
//     "template": "https://static.dev.campus4i.com/uploads/templates/jenzabar-university.20220615t035430.js",
//     "tax_enabled": false,
//     "primary_course_provider": null,
//     "configurations": [
//       {
//         "entity_name": "Email Receipt",
//         "entity_type": "email_receipt_config",
//         "config_value": {
//           "footer": "For any query please contact with auth code!",
//           "header": "Your order is placed, thank you",
//           "email_receipt": true
//         }
//       },
//       {
//         "entity_name": "Checkout Status Configuration",
//         "entity_type": "enrollment_config",
//         "config_value": {
//           "failure": {
//             "redirect_url": "https://store.dev.campus4i.com/jenzabar-university",
//             "redirect_text": "Back to store"
//           },
//           "success": {
//             "redirect_url": "https://store.dev.campus4i.com/jenzabar-university",
//             "redirect_text": "Back to store"
//           }
//         }
//       },
//       {
//         "entity_name": "Avatax",
//         "entity_type": "tax",
//         "config_value": {
//           "tax_code": "ST087651",
//           "account_id": "2001578376",
//           "license_key": "D01678E64CC08999",
//           "request_url": "https://sandbox-rest.avatax.com/api/v2/",
//           "company_code": "DEFAULT"
//         }
//       },
//       {
//         "entity_name": "Checkout Configuration",
//         "entity_type": "enrollment_config",
//         "config_value": {
//           "enable_profile_questions": true,
//           "enable_purchase_for_both": false,
//           "enable_purchase_for_myself": false,
//           "enable_purchase_for_company": false,
//           "enable_registration_questions": false,
//           "enable_multiple_products_checkout": false,
//           "enable_standalone_product_checkout": false,
//           "enable_registration_product_checkout": false,
//           "enable_purchase_for_friends_and_family": false,
//           "enable_enrollment_for_multiple_students": false
//         }
//       }
//     ]
//   },
//   "profile_questions": [
//     {
//       "id": "cc804e6f-5df8-4772-a22e-eeaaa2b05ac6",
//       "type": "select",
//       "label": "<p>Select your country</p>",
//       "display_order": 1,
//       "configuration": {
//         "required": false,
//         "help_text": "Type at least 3 characters of your country name",
//         "placeholder": "Type your country name",
//         "autocomplete": true,
//         "default_value": "Type your country name"
//       },
//       "respondent_type": "student"
//     },
//     {
//       "id": "b8fdeb57-56a8-42b6-b730-5886716a526d",
//       "type": "toggle",
//       "label": "<p>Afford This Course?</p>",
//       "display_order": 2,
//       "configuration": {
//         "required": true
//       },
//       "respondent_type": "student"
//     }
//   ],
//   "companies": [
//     {
//       "id": "9db88bc6-2527-4bc4-839d-51ecc68eca98",
//       "name": "Company A"
//     }
//   ],
//   "payment_questions": [
//     {
//       "id": "d3844b59-413a-4f01-b87a-79e2365b942d",
//       "type": "checkbox",
//       "label": "<p>I accept the <a href=\"https://campus.com/privacy\">terms and conditions</a> of this store.</p>",
//       "display_order": 1,
//       "configuration": {
//         "required": true
//       }
//     }
//   ]
// }