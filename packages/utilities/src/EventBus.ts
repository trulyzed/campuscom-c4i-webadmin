export const REFRESH_PAGE = "REFRESH_PAGE"
export const REFRESH_MODAl = "REFRESH_MODAl"

type fn = (param?: any) => void
class PageEventBus {
  eventListeners: { [key: string | symbol]: fn } = {}

  subscribe(listenerName: string | symbol, fn: fn) {
    if (!this.eventListeners[listenerName]) {
      this.eventListeners[listenerName] = fn
    }
  }

  unsubscribe(listenerName: string | symbol) {
    if (this.eventListeners[listenerName]) {
      delete this.eventListeners[listenerName]
    }
  }

  publish(listenerName: string | symbol, params?: any) {
    if (this.eventListeners[listenerName]) {
      this.eventListeners[listenerName](params)
    }
  }

  publishSimilarEvents(listenerNamePattern: RegExp) {
    const keys = Object.keys(this.eventListeners)
    keys.forEach((key) => {
      if (listenerNamePattern.test(key) && typeof this.eventListeners[key] === "function") {
        this.eventListeners[key]()
      }
    })
  }
}

export const eventBus = new PageEventBus()

export const triggerEvents = (eventNames: string | symbol | symbol[] | string[] | Array<string | symbol>) => {
  if (Array.isArray(eventNames)) {
    eventNames.forEach((i) => {
      eventBus.publish(i)
    })
  } else if (typeof eventNames === "string") eventBus.publish(eventNames, {})
}
