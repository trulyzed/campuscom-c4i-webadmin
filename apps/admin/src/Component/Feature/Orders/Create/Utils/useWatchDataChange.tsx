import { useEffect } from "react"

interface IUseWatchDataChangeParams {
  storeData?: Record<string, any>
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  setPurchaserData: (...args: any[]) => void
  setProductData: (...args: any[]) => void
  setStudentData: (...args: any[]) => void
  setRegistrationData: (...args: any[]) => void
  setAdditionalRegistrationData?: (...args: any[]) => void
  setInvoiceData?: (...args: any[]) => void
  setPaymentData?: (...args: any[]) => void
  reservationDetails?: Record<string, any>
  singleProduct?: boolean
}

export const useWatchDataChange = ({
  storeData,
  registrationProductData,
  studentData,
  setPurchaserData,
  setProductData,
  setStudentData,
  setRegistrationData,
  setAdditionalRegistrationData,
  setInvoiceData,
  setPaymentData,
  reservationDetails,
  singleProduct
}: IUseWatchDataChangeParams) => {
  useEffect(() => {
    setRegistrationData((prevValue: any[]) => prevValue.filter(i => registrationProductData.some(p => p.id === i.product)))
    setAdditionalRegistrationData?.((prevValue: any[]) => prevValue.filter(i => registrationProductData.some(p => p.id === i.product)))
  }, [registrationProductData, setRegistrationData, setAdditionalRegistrationData])

  useEffect(() => {
    setRegistrationData((prevValue: any[]) => prevValue.map(i => ({ ...i, students: i.students.filter((studentEmail: string) => studentData.some(sd => sd.primary_email === studentEmail)) })))
    setAdditionalRegistrationData?.((prevValue: any[]) => prevValue.map(i => ({ ...i, students: i.students.filter((s: any) => studentData.some(sd => sd.primary_email === s?.primary_email)) })))
  }, [studentData, setRegistrationData, setAdditionalRegistrationData])

  // Watch store data changes
  useEffect(() => {
    if (!reservationDetails) {
      setPurchaserData(undefined)
      setProductData([])
    }
    setStudentData([])
    setRegistrationData([])
    setAdditionalRegistrationData?.([])
    setInvoiceData?.(undefined)
    setPaymentData?.(undefined)
  }, [storeData, reservationDetails, setPurchaserData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData])

  // Watch product data changes in case of single product
  useEffect(() => {
    if (!singleProduct) return
    setStudentData([])
    setRegistrationData([])
    setAdditionalRegistrationData?.([])
    setInvoiceData?.(undefined)
    setPaymentData?.(undefined)
  }, [singleProduct, registrationProductData, setPurchaserData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData])

  // Set default registration data for seat registration
  useEffect(() => {
    if (!reservationDetails) return
    setRegistrationData([{
      product: reservationDetails.product.id,
      students: studentData.map(i => i.primary_email)
    }])
  }, [reservationDetails, studentData, setRegistrationData])

  return null
}