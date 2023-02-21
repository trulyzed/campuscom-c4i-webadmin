import React, { forwardRef, ReactElement, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import { Button, Card, Col, Form, FormInstance, Row } from "antd"
import { DefaultOptionType } from "antd/lib/select"
import {
  IField,
  DATE_PICKERS,
  CUSTOM_FIELD,
  EDITOR,
} from "~/Form/common"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { debounce } from "@packages/utilities/lib/debounce"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { FormError } from "./FormError"
import { processFormMetaWithUserMetaConfig } from "./FormMetaShadowingProcessor"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { generateUUID } from "@packages/utilities/lib/UUID"
import { FormSettings } from "~/Form/FormSettings/FormSettings"
import { HelpButton } from "~/Help/HelpButton"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"
import { ContextAction } from "~/Actions/ContextAction"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"
import { FormExtraActions } from "./FormExtraActions"
import { FormFields } from "./FormFields"

export const HELPER_FIELD_PATTERN = "__##__"

export type MetaDrivenFormHandle = {
  submitRef: HTMLButtonElement | null
  closeRef: HTMLElement | null
  resetFields: FormInstance['resetFields']
  clear: () => void
}

export interface IMetaDrivenFormProps {
  meta: IField[]
  metaName?: string
  title?: React.ReactNode
  className?: string
  loading?: boolean
  isModal?: boolean
  blocks?: React.ReactNode[]
  helpKey?: string
  showFormSettings?: boolean
  onApplyChanges: (newValues: { [key: string]: any }, meta?: IFormValueMeta) => void
  onClear?: () => void
  dataQueryApi?: IQuery
  initialFormValue?: { [key: string]: any }
  defaultFormValue?: { [key: string]: any }
  currentPagination?: number
  showCloseButton?: boolean
  showClearbutton?: boolean
  applyButtonLabel?: string
  disableApplyButton?: boolean
  actionContainerStyle?: React.CSSProperties
  applyButtonAriaControl?: string
  clearButtonLabel?: string
  isVertical?: boolean
  showFullForm?: boolean
  setCurrentPagination?: (page: number) => void
  closeModal?: () => void
  stopProducingQueryParams?: boolean
  autoApplyChangeFromQueryParams?: boolean
  errorMessages?: Array<ISimplifiedApiErrorMessage>
  isAside?: boolean
  isWizard?: boolean
  resetOnSubmit?: boolean
  bordered?: boolean
  displayFieldValue?: Record<string, any>
  disableContainerLoader?: boolean
  noPadding?: boolean
  enableFormItemToggle?: boolean
  onFormValueMetaChange?: (meta: IFormValueMeta) => void
  extraActions?: ReactElement[]
  stopSettingDefaultFromQueryParams?: boolean
}

export interface IFormValueMeta {
  [key: string]: {
    value: any
    option?: DefaultOptionType | DefaultOptionType[]
  }
}

export const MetaDrivenForm = forwardRef<MetaDrivenFormHandle, IMetaDrivenFormProps>(({
  showCloseButton,
  showClearbutton = true,
  applyButtonLabel = "Apply",
  actionContainerStyle,
  clearButtonLabel = "Clear All",
  className,
  enableFormItemToggle,
  onFormValueMetaChange,
  stopSettingDefaultFromQueryParams,
  ...props
}: IMetaDrivenFormProps, ref) => {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])
  const [formValueMeta, setFormValueMeta] = useState<IFormValueMeta>({})
  const REFRESH_EVENT_NAME = generateUUID("REFRESH")
  const formId = generateUUID(props.metaName)
  const [dependencyValue, _setDependencyValue] = useState<{ [key: string]: any }>({})
  const [initialFormValue, setInitialFormValue] = useState()
  const [queryData, setQueryData] = useState()
  const [isFetchingQueryData, setIsFetchingQueryData] = useState(false)
  const submitRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLElement>(null)
  const queryStringAsObject = useMemo(() => {
    return querystringToObject()
    // eslint-disable-next-line
  }, [props.meta])

  useImperativeHandle(ref, () => (
    {
      submitRef: submitRef.current,
      closeRef: closeRef.current,
      resetFields: formInstance.resetFields,
      clear: clearParams
    }
  ))

  useEffect(() => {
    if (!props.dataQueryApi) return
    setIsFetchingQueryData(true)
    props.dataQueryApi().then(resp => {
      if (resp.success) setQueryData(resp.data)
      return resp
    }).finally(() => setIsFetchingQueryData(false))
    // eslint-disable-next-line
  }, [props.dataQueryApi])

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
          const matchedField = props.meta.find((x) => x.fieldName === key)
          if (matchedField?.excludeFromSubmission || key === "" || mergedParams[key] === undefined || mergedParams[key] === null || key.startsWith(HELPER_FIELD_PATTERN))
            delete mergedParams[key]
        }
        if (props.currentPagination) mergedParams["pagination"] = props.currentPagination
        props.onApplyChanges(mergedParams, formValueMeta)
        if (props.resetOnSubmit) formInstance.resetFields()

        if (!props.stopProducingQueryParams) {
          const _queryString = objectToQueryString(Object.keys(mergedParams).length > 0 ? mergedParams : null)
          window.history && window.history.pushState({}, "", _queryString)
        }
      })
      .catch((validationError) => {
        console.log("validationError ", validationError)
      })
  }

  const clearParams = (isInitial?: boolean) => {
    const dontReset = (fieldName: string) => {
      const meta = props.meta.find((x) => x.fieldName === fieldName)
      return meta && !!meta.disabled
    }
    const getDefaultValue = (key?: string, field?: IField) => {
      const matchedField = field || props.meta.find((x) => x.fieldName === key)
      return matchedField?.inputType === EDITOR ? (field?.defaultValue || "") : field?.defaultValue
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
      return x
    })
    setMeta(_meta)
    if (!isInitial) props.onClear?.()
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
        const defaultSource = !stopSettingDefaultFromQueryParams ? queryParams : {}
        x.defaultValue = defaultSource[x.fieldName] !== undefined ? defaultSource[x.fieldName] : x.defaultValue
        x.defaultValue2 = x.fieldName2 && (defaultSource[x.fieldName2] !== undefined) ? defaultSource[x.fieldName2] : x.defaultValue2
        if (x.extraProps && Array.isArray(x.extraProps.selectorKeys)) {
          x.extraProps.selectorKeys = x.extraProps.selectorKeys.map((y) => {
            y.defaultValue = defaultSource[y.fieldName]
            return y
          })
        }
        return x
      })
      if (onlyPaginationExist) setShowLess(true)
      else setShowLess(false)
      if (props.autoApplyChangeFromQueryParams) applyChanges(queryParams)
    } else if (props.closeModal) {
      setShowLess(false)
    }

    if (props.showFullForm) {
      setShowLess(false)
    }

    props.showFormSettings ? processFormMetaWithUserMetaConfig(_meta, props.metaName || "").then((response) => {
      setMeta(response)
    }) : setMeta(_meta)
  }

  const setDependencyValue = useCallback((values = {}) => {
    const valueKeys = Object.keys(values)
    _setDependencyValue(dependencyValue => {
      const adjustedDependecyValue = props.meta.reduce((a, field) => {
        const fieldValues = valueKeys.reduce((a2, c) => {
          if (field.dependencies?.includes(c)) a2[c] = values[c]
          return a2
        }, {} as Record<string, any>)

        if (Object.keys(fieldValues).length) {
          a[field.fieldName] = {
            ...a[field.fieldName],
            ...fieldValues
          }
        }
        // if (field.dependencies?.length) {
        //   const fieldsValue = formInstance.getFieldsValue(field.dependencies)
        //   Object.keys(fieldsValue).forEach(key => {
        //     if (fieldsValue[key] === undefined) delete fieldsValue[key]
        //   })
        //   if (Object.keys(fieldsValue).length) a[field.fieldName] = fieldsValue
        // }
        return a;
      }, { ...dependencyValue } as Record<string, any>)
      return adjustedDependecyValue
    })
  }, [props.meta])

  const setDependencyValueDebounced = debounce(setDependencyValue, 200)

  const handleValuesChange = useCallback((changedValues: any) => {
    setDependencyValueDebounced(changedValues)
  }, [setDependencyValueDebounced])

  const handleOptionDataChange = useCallback((fieldName: IField['fieldName'], options: any[]) => {
    const meta = props.meta.find(i => i.fieldName === fieldName)
    const value = {
      [fieldName]: {
        value: meta?.defaultValue,
        option: Array.isArray(meta?.defaultValue) ?
          meta?.defaultValue.map((i: any) => ({
            children: options.find(j => j.value === i)?.label,
            key: meta?.defaultValue,
            value: meta?.defaultValue,
          } as unknown as DefaultOptionType))
          : {
            children: options.find(i => i.value === meta?.defaultValue)?.label,
            key: meta?.defaultValue,
            value: meta?.defaultValue,
          } as unknown as DefaultOptionType
      }
    }
    setFormValueMeta(prevValue => ({
      ...prevValue,
      ...value
    }))
    onFormValueMetaChange?.(value)
  }, [props.meta, onFormValueMetaChange])

  useEffect(() => {
    if (props.loading || !initialFormValue) return
    setDependencyValue(initialFormValue)

    eventBus.subscribe(REFRESH_EVENT_NAME, processMeta)
    eventBus.publish(REFRESH_EVENT_NAME)
    return () => {
      clearParams(true)
      eventBus.unsubscribe(REFRESH_EVENT_NAME)
    }
    // }, [props.meta, props.metaName])
    // eslint-disable-next-line
  }, [initialFormValue, props.loading])

  useEffect(() => {
    const defaultValues = props.meta.reduce((a: any, c) => {
      if (c.defaultValue !== undefined) a[c.fieldName] = c.defaultValue
      return a
    }, {})
    setInitialFormValue({
      ...props.defaultFormValue,
      ...defaultValues,
      ...props.initialFormValue,
    })
  }, [props.initialFormValue, props.defaultFormValue, props.meta])

  return (
    <Card
      bordered={props.bordered}
      className={`${props.isAside ? 'is-aside' : ''}${className ? ` ${className}` : ""}`}
      title={
        (props.title || props.blocks?.length || (showClearbutton && props.isAside)) ?
          <Row>
            <Col md={{ span: 22, order: 0 }} xs={{ span: 24, order: 1 }}>
              <Row>
                <Col flex={"auto"}>
                  <SidebarMenuTargetHeading level={props.isModal ? 2 : 3} targetID="navigation">
                    {props.title}
                  </SidebarMenuTargetHeading>
                </Col>
                {showClearbutton && props.isAside && (
                  <Col md={24} xs={24}>
                    <Button size="small" onClick={() => clearParams()}>
                      {clearButtonLabel}
                    </Button>
                  </Col>
                )}
                {props.blocks &&
                  props.blocks.map((x, i) => (
                    <Col flex="none" key={i}>
                      {x}
                    </Col>
                  ))}
                <Col flex="none">
                  <HelpButton helpKey={props.helpKey} />
                </Col>
                {props.metaName && props.showFormSettings && (
                  <Col flex="none">
                    <FormSettings metaName={props.metaName} meta={meta} reload={processMeta} />
                  </Col>
                )}
              </Row>
            </Col>
            {showCloseButton && (
              <Col xs={{ span: 2, offset: 22, }} md={{ offset: 0 }} className={"text-right"}>
                <ContextAction ref={closeRef} tooltip="Close" type="close" iconColor="primary" onClick={props.closeModal} />
              </Col>
            )}
          </Row>
          : null
      }
      loading={!props.disableContainerLoader && props.loading}
      bodyStyle={{ padding: props.bordered ? "20px" : 0, paddingBottom: "0px", }}
      {...((props.isModal || props.closeModal) && {
        actions: [
          <Row justify="end" gutter={[8, 8]} style={{
            padding: "10px",
            ...actionContainerStyle
          }}>
            {!props.showFullForm && !props.closeModal && meta.length > 4 && (
              <Col>
                <Button
                  aria-label={showLess ? "Show More Fields" : "Show Less Fields"}
                  onClick={() => setShowLess(!showLess)}
                  type="primary"
                >
                  {showLess ? "Show More" : "Show Less"}
                </Button>
              </Col>
            )}
            {showClearbutton && (
              <Col>
                <Button size={props.isAside ? "small" : undefined} onClick={() => clearParams()}>
                  {clearButtonLabel}
                </Button>
              </Col>
            )}
            <FormExtraActions actions={props.extraActions || []} formInstance={formInstance} formValueMeta={formValueMeta} />
            {props.closeModal && (
              <Col>
                <Button
                  aria-label="Cancel"
                  onClick={() => {
                    formInstance.resetFields()
                    props.closeModal && props.closeModal()
                  }}
                  size={props.isAside ? "small" : undefined}
                >
                  Cancel
                </Button>
              </Col>
            )}
            <Col>
              <Button
                ref={submitRef}
                aria-controls={props.applyButtonAriaControl}
                type="primary"
                form={formId}
                aria-label={applyButtonLabel}
                onClick={() => applyChanges()}
                disabled={!!props.disableApplyButton}
                loading={props.loading}
                size={props.isAside ? "small" : undefined}
              >
                {applyButtonLabel}
              </Button>
            </Col>
          </Row>
        ]
      })}
    >

      <Form
        id={formId}
        layout={props.isVertical ? "vertical" : "horizontal"}
        initialValues={initialFormValue}
        form={formInstance}
        scrollToFirstError
        style={{
          ...(props.isModal && { maxHeight: "66vh", overflowY: "auto" }),
          background: "white",
          borderRadius: "4px",
          padding: props.noPadding ? undefined : props.isVertical ? "10px 25px" : "10px"
        }}
        onValuesChange={handleValuesChange}
      >
        <FormError errorMessages={props.errorMessages} />
        <FormFields
          meta={meta}
          isVertical={props.isVertical}
          formInstance={formInstance}
          clearTrigger={clearTrigger}
          showLess={showLess}
          dependencyValue={dependencyValue}
          updateMeta={setMeta}
          handleValuesChange={handleValuesChange}
          displayFieldValue={props.displayFieldValue}
          isFetchingQueryData={isFetchingQueryData}
          queryData={queryData}
          isModal={props.isModal}
          enableFormItemToggle={enableFormItemToggle}
          defaultFormItemToggleValue={stopSettingDefaultFromQueryParams ? undefined : queryStringAsObject}
          onSelectedItems={(fieldName, value, option) => setFormValueMeta(prevValue => ({
            ...prevValue,
            [fieldName]: { value, option }
          }))}
          onOptionDataChange={handleOptionDataChange}
        />
        {!(props.isModal || props.closeModal) && (
          <Row
            justify="end"
            gutter={[8, 8]}
            style={{
              padding: props.isAside ? "5px 0" : "10px",
              borderTop: props.bordered ? "1px solid #f0f2f5" : undefined,
              ...actionContainerStyle
            }}
          >
            <FormExtraActions actions={props.extraActions || []} formInstance={formInstance} formValueMeta={formValueMeta} />
            {!props.showFullForm && !props.closeModal && meta.length > 4 && (
              <Col>
                <Button
                  aria-label={showLess ? "Show More Fields" : "Show Less Fields"}
                  onClick={() => setShowLess(!showLess)}
                  type="primary"
                  size={props.isAside ? "small" : undefined}
                >
                  {showLess ? "Show More" : "Show Less"}
                </Button>
              </Col>
            )}
            {props.closeModal && (
              <Col>
                <Button
                  aria-label="Cancel"
                  onClick={() => {
                    formInstance.resetFields()
                    props.closeModal && props.closeModal()
                  }}
                  size={props.isAside ? "small" : undefined}
                >
                  Cancel
                </Button>
              </Col>
            )}
            <Col>
              <Button
                ref={submitRef}
                aria-controls={props.applyButtonAriaControl}
                type="primary"
                form={formId}
                aria-label={applyButtonLabel}
                onClick={() => applyChanges()}
                disabled={!!props.disableApplyButton}
                loading={props.loading}
                size={props.isAside ? "small" : undefined}
              >
                {applyButtonLabel}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  )
})
