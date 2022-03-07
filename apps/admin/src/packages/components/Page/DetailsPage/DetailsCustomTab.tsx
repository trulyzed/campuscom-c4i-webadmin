import React from "react"

export interface IDetailsCustomTabProp {
  component: React.FunctionComponent<any>
  props: { [key: string]: any }
}

export function DetailsCustomTab(props: IDetailsCustomTabProp) {
  return <>{props.component && <props.component {...props.props} />}</>
}
