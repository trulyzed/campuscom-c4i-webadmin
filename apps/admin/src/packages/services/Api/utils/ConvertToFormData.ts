export function convertToFormData(data: Record<string, unknown>): FormData {
  const formData = new FormData()
  for (const eachKey of Object.keys(data)) {
    formData.append(eachKey, data[eachKey] as string | Blob)
  }

  return formData
}
