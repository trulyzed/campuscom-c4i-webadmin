import * as React from "react"

export function Error(props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>) {
  const { children, ...otherProps } = props
  return <p {...otherProps}>{children}</p>
}
