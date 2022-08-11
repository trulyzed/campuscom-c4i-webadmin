import { Alert as AntAlert, AlertProps, Typography } from "antd"

interface IAlertProps {
  className?: string
  type?: AlertProps['type']
  message: string
  description: string
  onClose: () => void
}

export const Alert = ({
  className,
  type,
  message,
  description,
  onClose
}: IAlertProps) => {
  const typographyType = type === "success" ? "success" : type === "error" ? "danger" : type === "warning" ? "warning" : undefined
  return (
    <AntAlert
      className={className}
      type={type}
      showIcon
      closable
      closeIcon={<span className="glyphicon glyphicon--primary glyphicon-remove" />}
      icon={type ? <span className={`glyphicon glyphicon--primary ${type === "success" ? "glyphicon-ok-sign" : type === "error" ? "glyphicon-exclamation-sign" : type === "info" ? "glyphicon-info-sign" : "glyphicon-alert-sign"}`} /> : undefined}
      message={<Typography.Title type={typographyType} level={3} style={{ margin: 0 }}>{message}</Typography.Title>}
      description={<Typography.Text type={typographyType}>{description}</Typography.Text>}
      onClose={onClose}
    />
  )
}