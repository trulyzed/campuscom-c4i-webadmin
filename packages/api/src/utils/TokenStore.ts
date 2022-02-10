import { eventBus } from "@packages/utilities/lib/EventBus"
import { HANDLE_GLOBAL_API_ERROR } from "./HandleResponse"
import { IBaseUser } from "./Interfaces"

let prefix = process.env.PUBLIC_URL || ""
prefix = prefix.split("/").join("")
prefix = process.env.NODE_ENV !== "production" ? `${prefix}_${process.env.NODE_ENV?.toLocaleLowerCase()}` : prefix

const access_token = `${prefix}_access_token`
const username = `${prefix}_username`
const user = `${prefix}_user`
const school_name = `${prefix}_school_name`
const app_version = `${prefix}_app_version`
const history = `${prefix}_history`
const lastBuildHash = `${prefix}_lastBuildHash`

export function setLoginInfo(params: { token: string; userName: string }): void {
  localStorage.setItem(access_token, params.token)
  localStorage.setItem(username, params.userName)
}

export function setUser(currentUser: IBaseUser) {
  localStorage.setItem(user, JSON.stringify(currentUser))
}

export function getUser(): IBaseUser | null {
  const userString = localStorage.getItem(user)
  if (userString !== null) {
    const user: IBaseUser = JSON.parse(userString) as IBaseUser
    return user
  } else return null
}

export function setAboutInfo(params: { schoolName: string; version: string }) {
  localStorage.setItem(school_name, params.schoolName)
  localStorage.setItem(app_version, params.version)
}

export function getToken(): string | null {
  return localStorage.getItem(access_token)
}

export function getUsername(): string | null {
  return localStorage.getItem(username)
}

export function getAboutInfoFromStorage() {
  return { schoolName: localStorage.getItem(school_name), version: localStorage.getItem(app_version) }
}

export function setHistory(params: any[]) {
  localStorage.setItem(history, JSON.stringify(params))
}
export function removeHistory() {
  localStorage.removeItem(history)
}

export function getHistory(): any[] {
  let historyArray: any[] = []
  const historyString = localStorage.getItem(history)
  if (typeof historyString === "string") {
    historyArray = JSON.parse(historyString)
  }
  return historyArray
}

export const NEW_BUILD_AVAILABL = "NEW_BUILD_AVAILABL"
export function checkNewBuild(): void {
  const _lastBuildHash = localStorage.getItem(lastBuildHash)
  let newBuildHash = ""
  const scripts = document.getElementsByTagName("script")
  for (let index = 0; index < scripts.length; index++) {
    const script = scripts[index]
    if (script.src.includes("main")) {
      newBuildHash = script.src
      break
    }
  }
  if (newBuildHash && _lastBuildHash !== newBuildHash) {
    localStorage.setItem(lastBuildHash, newBuildHash)
    eventBus.publish(HANDLE_GLOBAL_API_ERROR, [
      {
        message: NEW_BUILD_AVAILABL,
        code: 426
      }
    ])
  }
}

export function cleanStorage(): void {
  localStorage.removeItem(access_token)
  localStorage.removeItem(username)
  localStorage.removeItem(user)
  localStorage.removeItem(history)
  localStorage.removeItem(school_name)
  localStorage.removeItem(app_version)
}
