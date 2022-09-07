import { IUser } from "./Interfaces"

let prefix = process.env.PUBLIC_URL || ""
prefix = prefix.split("/").join("")
prefix = process.env.NODE_ENV !== "production" ? `${prefix}_${process.env.NODE_ENV?.toLocaleLowerCase()}` : prefix

const access_token = `${prefix}_access_token`
const user = `${prefix}_user`
const history = `${prefix}_history`

export function setLoginInfo(params: { token: string; user: IUser }): void {
  localStorage.setItem(access_token, params.token)
  localStorage.setItem(user, JSON.stringify(params.user))
}

export function setUser(currentUser: IUser) {
  localStorage.setItem(user, JSON.stringify(currentUser))
}

export function getUser(): IUser | null {
  const userString = localStorage.getItem(user)
  if (userString !== null) {
    const user: IUser = JSON.parse(userString) as IUser
    return user
  } else return null
}

export function getToken(): string | null {
  return localStorage.getItem(access_token)
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

export function cleanStorage(): void {
  localStorage.removeItem(access_token)
  localStorage.removeItem(user)
}
