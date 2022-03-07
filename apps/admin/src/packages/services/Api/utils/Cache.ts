import { IApiResponse } from "./Interfaces"

const CACHE_TTL = 60 * 1000
const cache: { [key: string]: IApiResponse } = {}

const getCachedDataKey = (Service: string, Action: string, Params: any) => JSON.stringify({ Service, Action, Params })

export const addToCache = (Service: string, Action: string, Params: any, Response: IApiResponse, Headers?: any): boolean => {
  if (Headers && Headers["NoCache"]) return false
  if (!Response.success || !!Response.error || !Response.data || Response.data === "") return false

  const key = getCachedDataKey(Service, Action, Params)
  cache[key] = {
    ...Response,
    cacheEntryTime: Date.now()
  }
  return true
}

export const getCachedData = (Service: string, Action: string, Params: any, Headers?: any): IApiResponse | undefined => {
  console.log("******************************************")
  console.log(cache)
  console.log("******************************************")
  const key = getCachedDataKey(Service, Action, Params)

  if (Headers && Headers["NoCache"]) {
    delete cache[key]
    return
  }

  if (cache[key] && cache[key].cacheEntryTime) {
    const validCache = Date.now() - (cache[key].cacheEntryTime || 0) < CACHE_TTL
    if (validCache) return cache[key]
    else delete cache[key]
  }
  return
}

setInterval(() => {
  const keys = Object.keys(cache)
  for (const key of keys) {
    const invalidCache = Date.now() - (cache[key].cacheEntryTime || 0) > CACHE_TTL
    if (invalidCache) delete cache[key]
  }
}, CACHE_TTL)
