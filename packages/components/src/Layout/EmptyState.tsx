import { Card } from "antd"

interface IEmptyStateProps {
  message?: string
  size?: "small" | "default"
  wrapInCard?: boolean
}

export const EmptyState = ({ message = "No Data", size = "default", wrapInCard }: IEmptyStateProps) => {
  const content = (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "#696969", ...size === "default" && { margin: "20px 0" } }}>
      <span style={{ fontSize: size === "small" ? "18px" : "40px", lineHeight: size === "small" ? "22px" : "55px" }} className="glyphicon glyphicon-inbox" />
      <p style={{ margin: 0 }}>{message}</p>
    </div>
  )
  return (
    wrapInCard ? <Card>{content}</Card> : content
  )
}