import { Button, Card, Col, Form, Row } from "antd"
import React, { useEffect, useState } from "react"
import {
  IField,
  DATE_PICKER,
  DATE_PICKERS,
  DROPDOWN,
  MULTI_SELECT_DROPDOWN,
  NUMBER,
  TEXT,
  BOOLEAN,
  CUSTOM_FIELD,
  MULTI_SELECT_CHECKBOX,
  TEXTAREA,
  MULTI_RADIO,
  FILE,
  EDITOR
} from "~/packages/components/Form/common"
import { FormInput } from "~/packages/components/Form/FormInput"
import { FormDropDown } from "~/packages/components/Form/FormDropDown"
import { FormMultiSelectDropDown } from "~/packages/components/Form/FormMultiSelectDropDown"
import { FormDatePicker } from "~/packages/components/Form/FormDatePicker"
import { FormDatePickers } from "~/packages/components/Form/FormDatePickers"
import { FormCheckbox } from "~/packages/components/Form/FormCheckbox"
import { querystringToObject } from "~/packages/utils/QueryStringToObjectConverter"
import { objectToQueryString } from "~/packages/utils/ObjectToQueryStringConverter"
import { FormInstance } from "antd/lib/form"
import { FormMultipleCheckbox } from "~/packages/components/Form/FormMultipleCheckbox"
import { FormMultipleRadio } from "~/packages/components/Form/FormMultipleRadio"
import { ISimplifiedApiErrorMessage } from "~/packages/services/Api/utils/HandleResponse/ApiErrorProcessor"
import { FormError } from "~/packages/components/Form/FormError"
import { FormTextArea } from "~/packages/components/Form/FormTextArea"
import { FormInputNumber } from "~/packages/components/Form/FormInputNumber"
import { processFormMetaWithUserMetaConfig } from "~/packages/components/Form/FormMetaShadowingProcessor"
import { eventBus } from "~/packages/utils/EventBus"
import { generateUUID } from "~/packages/utils/UUID"
import { FormSettings } from "~/packages/components/Form/FormSettings/FormSettings"
import { HelpButton } from "~/packages/components/Help/HelpButton"
import { SidebarMenuTargetHeading } from "~/packages/components/SidebarNavigation/SidebarMenuTargetHeading"
import { FormFileUpload } from "./FormFileUpload"
import { FormEditorInput } from "./FormEditorInput"

export function MetaDrivenForm({
  showClearbutton = true,
  applyButtonLabel = "Search",
  clearButtonLabel = "Clear",
  ...props
}: {
  meta: IField[]
  metaName?: string
  title?: React.ReactNode
  loading?: boolean
  isModal?: boolean
  blocks?: React.ReactNode[]
  helpKey?: string
  onApplyChanges: (newValues: { [key: string]: any }) => void
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  currentPagination?: number
  showClearbutton?: boolean
  applyButtonLabel?: string
  clearButtonLabel?: string
  isHorizontal?: boolean
  showFullForm?: boolean
  setCurrentPagination?: (page: number) => void
  closeModal?: () => void
  stopProducingQueryParams?: boolean
  errorMessages?: Array<ISimplifiedApiErrorMessage>
}) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])
  const REFRESH_EVENT_NAME = generateUUID("REFRESH")
  const formId = generateUUID(props.metaName)

  const checkValidationOnCustomFormFields = (values: { [key: string]: any }): boolean => {
    let validationPassed = true
    const __meta = meta.map((x: IField) => {
      const rules: Array<{ [key: string]: any }> = x.rules as Array<{
        [key: string]: any
      }>
      const rulesExist = !!(rules && rules.length > 0)
      const certainInputType: boolean = x.inputType === CUSTOM_FIELD || x.inputType === DATE_PICKERS
      if (!rulesExist || !certainInputType) return x

      const rulesRequired = !!rules?.find((rule: any) => rule && rule.required)
      if (certainInputType && rulesExist && rulesRequired) {
        const validationForSelectorComponent =
          x.fieldName === "" &&
          x?.extraProps &&
          Array.isArray(x?.extraProps?.selectorKeys) &&
          x?.extraProps?.selectorKeys.length > 0 &&
          x?.extraProps?.selectorKeys.filter(
            (field: { [key: string]: any }) => !!values[field.fieldName] || !!values[field.fieldName2]
          ).length === 0

        const validationForOtherCustomComponent =
          x.fieldName !== "" && (values[x.fieldName] === undefined || values[x.fieldName] === null)

        const validationForDatePickersComponent =
          (!!x.fieldName &&
            !!(values[x.fieldName] === undefined || values[x.fieldName] === null || values[x.fieldName] === "")) ||
          (!!x.fieldName2 &&
            !!(values[x.fieldName2] === undefined || values[x.fieldName2] === null || values[x.fieldName2] === ""))

        if (validationForSelectorComponent) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else if (validationForOtherCustomComponent || validationForDatePickersComponent) {
          x.validateStatus = "error"
          x.help = rules?.filter((rule: any) => rule.required)[0]?.message
          validationPassed = false
        } else {
          x.validateStatus = ""
          x.help = ""
        }
      }
      return x
    })
    setMeta(__meta)
    return validationPassed
  }

  const applyChanges = (queryParams?: { [key: string]: any }) => {
    const isCustomFormFieldValuesValid: boolean = checkValidationOnCustomFormFields(formInstance.getFieldsValue())
    formInstance
      .validateFields()
      .then((validatedValues) => {
        if (!isCustomFormFieldValuesValid) return
        const params: { [key: string]: any } = queryParams || validatedValues
        const mergedParams: { [key: string]: any } = {
          ...params,
          ...props.defaultFormValue
        }
        for (const key in mergedParams) {
          if (key === "" || mergedParams[key] === undefined || mergedParams[key] === null)
            delete mergedParams[key]
        }
        if (props.currentPagination) mergedParams["pagination"] = props.currentPagination
        props.onApplyChanges(mergedParams)

        if (!props.stopProducingQueryParams) {
          const _queryString = objectToQueryString(Object.keys(mergedParams).length > 0 ? mergedParams : null)
          window.history && window.history.pushState({}, "", _queryString)
        }
      })
      .catch((validationError) => {
        console.log("validationError ", validationError)
      })
  }

  const clearParams = () => {
    const dontReset = (fieldName: string) => {
      const meta = props.meta.find((x) => x.fieldName === fieldName)
      return meta && !!meta.disabled
    }
    const getDefaultValue = (key?: string, field?: IField) => {
      const matchedField = field || props.meta.find((x) => x.fieldName === key)
      return matchedField?.inputType === EDITOR ? "" : undefined
    }
    Object.keys(formInstance.getFieldsValue()).forEach((key) => {
      if (dontReset(key)) return
      formInstance.setFieldsValue({ [key]: getDefaultValue(key) })
    })
    setClearTrigger(!clearTrigger)

    const _meta = props.meta.map((x) => {
      const defaultValue = getDefaultValue(undefined, x)
      if (dontReset(x.fieldName)) return x
      x.defaultValue = defaultValue
      x.defaultValue2 = defaultValue
      return x
    })
    setMeta(_meta)
  }

  const setPagination = (queryParams: { [key: string]: any }) => {
    props.setCurrentPagination && props.setCurrentPagination(Number(queryParams["pagination"]))
  }

  const processMeta = () => {
    let _meta: IField[] = props.meta
    const queryParams: { [key: string]: any } = {
      ...props.initialFormValue,
      ...(!props.stopProducingQueryParams && querystringToObject())
    }

    const paginationExist = queryParams && queryParams["pagination"]
    const onlyPaginationExist = paginationExist && Object.keys(queryParams).length === 1

    if (queryParams && Object.keys(queryParams).length > 0) {
      formInstance.setFieldsValue(queryParams)
      paginationExist && setPagination(queryParams)
      _meta = props.meta.map((x) => {
        x.defaultValue = queryParams[x.fieldName]
        x.defaultValue2 = x.fieldName2 ? queryParams[x.fieldName2] : undefined
        if (x.extraProps && Array.isArray(x.extraProps.selectorKeys)) {
          x.extraProps.selectorKeys = x.extraProps.selectorKeys.map((y) => {
            y.defaultValue = queryParams[y.fieldName]
            return y
          })
        }
        return x
      })
      if (onlyPaginationExist) setShowLess(true)
      else setShowLess(false)
      applyChanges(queryParams)
    } else if (props.closeModal) {
      setShowLess(false)
    }

    if (props.showFullForm) {
      setShowLess(false)
    }

    processFormMetaWithUserMetaConfig(_meta, props.metaName || "").then((response) => {
      setMeta(response)
    })
  }

  useEffect(() => {
    eventBus.subscribe(REFRESH_EVENT_NAME, processMeta)
    eventBus.publish(REFRESH_EVENT_NAME)
    return () => {
      clearParams()
      eventBus.unsubscribe(REFRESH_EVENT_NAME)
    }
    // }, [props.meta, props.metaName])
    // eslint-disable-next-line
  }, [])

  return (
    <Card
      title={
        <Row>
          <Col flex="auto">
            <SidebarMenuTargetHeading level={1} targetID="navigation">
              {props.title}
            </SidebarMenuTargetHeading>
          </Col>
          {props.blocks &&
            props.blocks.map((x, i) => (
              <Col flex="none" key={i}>
                {x}
              </Col>
            ))}
          <Col flex="none">
            <HelpButton helpKey={props.helpKey} />
          </Col>
          {props.metaName && (
            <Col flex="none">
              <FormSettings metaName={props.metaName} meta={meta} reload={processMeta} />
            </Col>
          )}
        </Row>
      }
      loading={props.loading}
    // actions={[
    //   <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
    //     {!props.showFullForm && !props.closeModal && meta.length > 4 && (
    //       <Col>
    //         <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
    //       </Col>
    //     )}
    //     {props.closeModal && (
    //       <Col>
    //         <Button
    //           type="ghost"
    //           aria-label="Cancel"
    //           danger
    //           onClick={() => {
    //             formInstance.resetFields()
    //             props.closeModal && props.closeModal()
    //           }}
    //         >
    //           Cancel
    //         </Button>
    //       </Col>
    //     )}
    //     {showClearbutton && (
    //       <Col>
    //         <Button danger type="primary" onClick={clearParams}>
    //           {clearButtonLabel}
    //         </Button>
    //       </Col>
    //     )}
    //     <Col>
    //       <Button type="primary" form={formId} aria-label="Apply Filter" onClick={() => applyChanges()}>
    //         {applyButtonLabel}
    //       </Button>
    //     </Col>
    //   </Row>
    // ]}
    >
      <Col
        className={`gutter-row`}
        style={{
          background: "$white",
          borderRadius: "4px",
          marginBottom: "1rem",
          padding: "1rem !important"
        }}
        xs={24}
        sm={24}
        md={24}
      >
        <Form
          id={formId}
          layout="horizontal"
          initialValues={props.initialFormValue}
          form={formInstance}
          scrollToFirstError
          {...(props.isModal && {
            style: {
              maxHeight: "66vh",
              overflowY: "scroll"
            }
          })}
        >
          <FormError errorMessages={props.errorMessages} />
          <SearchFormFields
            meta={meta}
            isHorizontal={props.isHorizontal}
            formInstance={formInstance}
            clearTrigger={clearTrigger}
            showLess={showLess}
          />
          <Row
            justify="end"
            gutter={[8, 8]}
            style={{
              paddingTop: "10px",
              borderTop: "3px solid #f0f2f5",
              marginBottom: "-30px"
            }}
          >
            {!props.showFullForm && !props.closeModal && meta.length > 4 && (
              <Col>
                <Button onClick={() => setShowLess(!showLess)}>{showLess ? "Show More" : "Show Less"}</Button>
              </Col>
            )}
            {props.closeModal && (
              <Col>
                <Button
                  type="ghost"
                  aria-label="Cancel"
                  danger
                  onClick={() => {
                    formInstance.resetFields()
                    props.closeModal && props.closeModal()
                  }}
                >
                  Cancel
                </Button>
              </Col>
            )}
            {showClearbutton && (
              <Col>
                <Button danger type="primary" onClick={clearParams}>
                  {clearButtonLabel}
                </Button>
              </Col>
            )}
            <Col>
              <Button type="primary" form={formId} aria-label="Apply Filter" onClick={() => applyChanges()}>
                {applyButtonLabel}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Card>
  )
}

const SearchFormFields = (props: {
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess: boolean
  isHorizontal?: boolean
}) => {
  return (
    <Row gutter={16}>
      {props.meta
        .filter((field) => !field.hidden)
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((field, i) => {
          let formField: any
          switch (field.inputType) {
            case TEXT:
              formField = (
                <FormInput
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case NUMBER:
              formField = (
                <FormInputNumber
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case TEXTAREA:
              formField = (
                <FormTextArea
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case BOOLEAN:
              formField = (
                <FormCheckbox
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case MULTI_SELECT_CHECKBOX:
              formField = (
                <FormMultipleCheckbox
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case MULTI_RADIO:
              formField = (
                <FormMultipleRadio
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case DROPDOWN:
              formField = (
                <FormDropDown
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case MULTI_SELECT_DROPDOWN:
              formField = (
                <FormMultiSelectDropDown
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case DATE_PICKER:
              formField = (
                <FormDatePicker
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case DATE_PICKERS:
              formField = (
                <FormDatePickers
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case FILE:
              formField = (
                <FormFileUpload
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={field.labelColSpan || 8}
                  wrapperColSpan={field.wrapperColSpan || 24}
                />
              )
              break
            case EDITOR:
              formField = (
                <FormEditorInput
                  {...field}
                  key={i}
                  formInstance={props.formInstance}
                  clearTrigger={props.clearTrigger}
                  labelColSpan={field.labelColSpan || 4}
                  wrapperColSpan={field.wrapperColSpan || 20}
                />
              )
              break
            case CUSTOM_FIELD:
              if (field.customFilterComponent) {
                formField = (
                  <field.customFilterComponent
                    {...{
                      ...field,
                      key: i,
                      formInstance: props.formInstance,
                      clearTrigger: props.clearTrigger
                    }}
                    labelColSpan={field.labelColSpan || 8}
                    wrapperColSpan={field.wrapperColSpan || 24}
                  />
                )
              }
              break
            default:
              break
          }

          const lg = (props.isHorizontal || (field.inputType === EDITOR)) ? 24 : 12
          const xs = 24
          return (
            <Col key={1000 + i} lg={lg} xs={xs}>
              {formField}
            </Col>
          )
        })}
    </Row>
  )
}
