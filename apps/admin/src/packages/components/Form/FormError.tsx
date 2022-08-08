import React, { useEffect } from "react"
import { Alert, Typography } from "antd"
import { ISimplifiedApiErrorMessage } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"

interface IFormError {
  errorMessages?: Array<ISimplifiedApiErrorMessage>
  genericInstructions?: JSX.Element
}
export function FormError(props: IFormError) {
  useEffect(() => {
    document.getElementById("errorMessages")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    })
  }, [props.errorMessages])
  return (
    <>
      {props.genericInstructions}
      {Array.isArray(props.errorMessages) && props.errorMessages.length > 0 && (
        <Alert
          className="mb-20"
          type="error"
          showIcon
          closable
          closeIcon={<span className="glyphicon glyphicon--primary glyphicon-remove" />}
          icon={<span className="glyphicon glyphicon--primary glyphicon-exclamation-sign" />}
          message={<Typography.Title type="danger" level={3}>Error</Typography.Title>}
          description={<ul>
            {props.errorMessages?.map((error, index) => {
              return (
                <li key={index + 1000}>
                  <Typography.Text type="danger">{error.message}</Typography.Text>
                </li>
              )
            })}
          </ul>} />
      )}
    </>
  )
}
