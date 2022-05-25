export function generateUUID(prefix?: string, suffix?: string): string {
  let dt = new Date().getTime()
  let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0
    dt = Math.floor(dt / 16)
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16)
  })
  uuid = prefix ? `${prefix}${uuid}` : uuid
  uuid = suffix ? `${uuid}${suffix}` : uuid
  return uuid
}
