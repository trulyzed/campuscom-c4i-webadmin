import { useEffect } from "react"

interface IUseWatchDataChangeParams {
  storeData?: Record<string, any>
  registrationProductData: Record<string, any>[]
  studentData: Record<string, any>[]
  setPurchaserData: (...args: any[]) => void
  setProductData: (...args: any[]) => void
  setStudentData: (...args: any[]) => void
  setRegistrationData: (...args: any[]) => void
  setAdditionalRegistrationData: (...args: any[]) => void
  setInvoiceData: (...args: any[]) => void
  setPaymentData: (...args: any[]) => void
  reservationDetails?: Record<string, any>
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
  reservationDetails
}: IUseWatchDataChangeParams) => {
  useEffect(() => {
    setRegistrationData((prevValue: any[]) => prevValue.filter(i => registrationProductData.some(p => p.id === i.product)))
    setAdditionalRegistrationData((prevValue: any[]) => prevValue.filter(i => registrationProductData.some(p => p.id === i.product)))
  }, [registrationProductData, setRegistrationData, setAdditionalRegistrationData])

  useEffect(() => {
    setRegistrationData((prevValue: any[]) => prevValue.map(i => ({ ...i, students: i.students.filter((sID: string) => studentData.some(sd => sd.id === sID)) })))
    setAdditionalRegistrationData((prevValue: any[]) => prevValue.map(i => ({ ...i, students: i.students.filter((s: any) => studentData.some(sd => sd.id === s?.id)) })))
  }, [studentData, setRegistrationData, setAdditionalRegistrationData])

  useEffect(() => {
    if (!reservationDetails) {
      setPurchaserData(undefined)
      setProductData([])
    }
    setStudentData([])
    setRegistrationData([])
    setAdditionalRegistrationData([])
    setInvoiceData(undefined)
    setPaymentData(undefined)
  }, [storeData, reservationDetails, setPurchaserData, setProductData, setStudentData, setRegistrationData, setAdditionalRegistrationData, setInvoiceData, setPaymentData])

  // Set default registration data for seat registration
  useEffect(() => {
    if (!reservationDetails) return
    setRegistrationData([{
      product: reservationDetails.product.id,
      students: studentData.map(i => i.id)
    }])
  }, [reservationDetails, studentData, setRegistrationData])

  return null
}