export const setScrollPosition = (id: string, key?: string) => {
  sessionStorage.setItem(key ? key : window.location.href, id)
}

export const getScrollMemoryObject = (): string | null => {
  const scrollMemoryString = sessionStorage.getItem(window.location.href)
  return scrollMemoryString
}

export const getAndScrollToPosition = () => {
  const scrollMemoryID = getScrollMemoryObject()

  if (scrollMemoryID) {
    const el = document.getElementById(scrollMemoryID)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
      const tr = el.parentElement?.parentElement
      if (tr && tr?.nodeName === "TR") {
        tr.style.backgroundColor = "yellow"
        tr.style.transition = "all 0.5s ease-in"
        setTimeout(() => {
          tr.style.backgroundColor = ""
        }, 2 * 1000)
      }
      sessionStorage.removeItem(window.location.href)
    }
  }
}
