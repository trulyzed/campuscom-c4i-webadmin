import { useCallback } from "react"

interface IUsePayloadGeneratorParams {
  storeData?: Record<string, any>
  purchaserData?: Record<string, any>
  productData: Record<string, any>[]
  studentData: Record<string, any>[]
  registrationData: Record<string, any>[]
  additionalRegistrationData?: Record<string, any>[]
  paymentData?: Record<string, any>
  couponCode?: string
  reservationId?: string
  enrollmentId?: string
}

export const usePayloadGenerator = ({
  storeData,
  purchaserData,
  productData,
  studentData,
  registrationData,
  additionalRegistrationData = [],
  paymentData,
  couponCode,
  reservationId,
  enrollmentId
}: IUsePayloadGeneratorParams) => {
  const generatePurchaserDetailsPayload = useCallback(() => {
    const profileQuestions = Object.keys(purchaserData || {}).reduce((a, c) => {
      if (c.includes("profile_question__")) a[c.split("profile_question__")[1]] = purchaserData?.[c]
      return a
    }, {} as Record<string, any>)

    return {
      first_name: purchaserData?.first_name,
      last_name: purchaserData?.last_name,
      primary_email: purchaserData?.email,
      ...purchaserData?.purchasing_for && {
        purchasing_for: {
          type: purchaserData?.purchasing_for,
          ref: purchaserData?.company
        }
      },
      extra_info: profileQuestions
    }
  }, [purchaserData])

  const generateCartDetailsPayload = useCallback(() => {
    return [
      ...productData.reduce((a, c) => {
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
      }, []) as Record<string, any>[],
      ...registrationData.map(i => ({
        product_id: i.product,
        quantity: i.students.length,
        is_related: false,
        related_to: "",
        student_email: "",
        is_reservation: false
      })),
      ...additionalRegistrationData.reduce((a, c) => {
        for (const i of c.students) {
          for (const key of Object.keys(i.related_products || {})) {
            if (!i.related_products[key]) continue
            a.push({
              product_id: key,
              quantity: i.related_products[key],
              is_related: true,
              related_to: c.product,
              student_email: i.primary_email,
              is_reservation: false
            })
          }
        }
        return a
      }, []) as Record<string, any>[],
    ]
  }, [productData, registrationData, additionalRegistrationData])

  const generateStudentDetailsPayload = useCallback(() => {
    return registrationData.reduce((a, c) => {
      for (const studentEmail of c.students) {
        const student = studentData.find(i => i.primary_email === studentEmail)
        if (!student) continue
        const profileQuestions = Object.keys(student || {}).reduce((a, c) => {
          if (c.includes("profile_question__")) a[c.split("profile_question__")[1]] = student?.[c]
          return a
        }, {} as Record<string, any>)
        a.push({
          product_id: c.product,
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.primary_email,
          extra_info: profileQuestions,
        })
      }
      return a
    }, [])
  }, [registrationData, studentData])

  const generateRegistrationDetailsPayload = useCallback(() => {
    return registrationData.reduce((a, c) => {
      for (const studentEmail of c.students) {
        const student = studentData.find(i => i.primary_email === studentEmail)
        if (!student) continue
        const registrationData = additionalRegistrationData.reduce((a, c2) => {
          if (c2.product === c.product) {
            const matchedStudent = c2.students.find((i: any) => i.primary_email === studentEmail)
            if (matchedStudent) {
              a = {
                ...a,
                ...matchedStudent.registration_question_values,
                related_products: matchedStudent.related_products,
              }
            }
          }
          return a
        }, {})
        a.push({
          product_id: c.product,
          student: student.primary_email,
          data: registrationData
        })
      }
      return a
    }, [])
  }, [registrationData, additionalRegistrationData, studentData])

  const generatePayload = useCallback(() => {
    return {
      store: storeData?.store,
      purchaser_info: generatePurchaserDetailsPayload(),
      cart_details: generateCartDetailsPayload(),
      student_details: generateStudentDetailsPayload(),
      registration_details: generateRegistrationDetailsPayload(),
      payment_ref: paymentData?.payment_ref,
      payment_note: paymentData?.payment_note,
      ...reservationId && { seat_reservation: reservationId },
      ...enrollmentId && { course_enrollment: enrollmentId },
    }
  }, [storeData, generatePurchaserDetailsPayload, generateCartDetailsPayload, generateStudentDetailsPayload, generateRegistrationDetailsPayload, paymentData, reservationId, enrollmentId])

  const generatePaymentSummaryPayload = useCallback(() => {
    return {
      cart_details: generateCartDetailsPayload(),
      store: storeData?.store,
      coupon_codes: couponCode ? [couponCode] : [],
      ...reservationId && { seat_reservation: reservationId },
      ...enrollmentId && { course_enrollment: enrollmentId },
    }
  }, [storeData, couponCode, generateCartDetailsPayload, reservationId, enrollmentId])

  return {
    generatePayload,
    generatePaymentSummaryPayload,
  }
}