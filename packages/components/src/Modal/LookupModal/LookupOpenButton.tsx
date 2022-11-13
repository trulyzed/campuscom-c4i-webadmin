import { ButtonProps } from "antd";
import { useCallback, useState } from "react";
import { ContextAction } from "~/Actions/ContextAction";
import { ILookupModal, LookupModal } from "./LookupModal";

interface ILookupOpenButtonProps extends Omit<ILookupModal, "onClose"> {
  tooltip: string
  formTitle?: string
  buttonType?: ButtonProps["type"]
}

export const LookupOpenButton = ({
  tooltip,
  title,
  modalTitle,
  tableTitle,
  formTitle,
  searchFunc,
  isArray,
  columns,
  meta,
  metaName,
  defaultFormValue,
  initialFormValue,
  zIndex,
  helpKey,
  errorMessages,
  apiCallInProgress,
  onSubmit,
  buttonType,
}: ILookupOpenButtonProps) => {
  const [show, setShow] = useState(false)

  const handleSubmit = useCallback((items?: any[] | undefined) => {
    onSubmit(items)
    setShow(false)
  }, [onSubmit])

  return (
    <>
      <ContextAction
        tooltip={tooltip}
        buttonType={buttonType}
        text={title}
        onClick={() => setShow(true)}
      />
      {show ?
        <LookupModal
          title={title}
          modalTitle={modalTitle}
          formTitle={formTitle}
          tableTitle={tableTitle}
          searchFunc={searchFunc}
          isArray={isArray}
          columns={columns}
          meta={meta}
          metaName={metaName}
          defaultFormValue={defaultFormValue}
          initialFormValue={initialFormValue}
          zIndex={zIndex}
          helpKey={helpKey}
          errorMessages={errorMessages}
          apiCallInProgress={apiCallInProgress}
          onClose={() => setShow(false)}
          onSubmit={handleSubmit}
        /> : null}
    </>

  )
}