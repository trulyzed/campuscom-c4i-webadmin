import { Button, Card, Col, Form, Grid, Row } from "antd"
import React, { useCallback, useEffect, useState } from "react"
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
  EDITOR,
  MULTI_SELECT_GROUP_CHECKBOX,
  HIERARCHICAL_MULTIPLE_CHECKBOX,
  DISPLAY_FIELD,
  PASSWORD,
  OTP,
} from "~/Form/common"
import { FormInput } from "~/Form/FormInput"
import { FormDropDown } from "~/Form/FormDropDown"
import { FormMultiSelectDropDown } from "~/Form/FormMultiSelectDropDown"
import { FormHierarchicalMultipleCheckbox } from "~/Form/FormHierarchicalMultipleCheckbox"
import { FormDatePicker } from "~/Form/FormDatePicker"
import { FormDatePickers } from "~/Form/FormDatePickers"
import { FormCheckbox } from "~/Form/FormCheckbox"
import { querystringToObject } from "@packages/utilities/lib/QueryStringToObjectConverter"
import { objectToQueryString } from "@packages/utilities/lib/ObjectToQueryStringConverter"
import { debounce } from "@packages/utilities/lib/debounce"
import { FormInstance } from "antd/lib/form"
import { FormMultipleCheckbox } from "~/Form/FormMultipleCheckbox"
import { FormMultipleRadio } from "~/Form/FormMultipleRadio"
import { ISimplifiedApiErrorMessage } from "@packages/services/lib/Api/utils/HandleResponse/ApiErrorProcessor"
import { FormError } from "~/Form/FormError"
import { FormTextArea } from "~/Form/FormTextArea"
import { FormPasswordInput } from "~/Form/FormPasswordInput"
import { FormInputNumber } from "~/Form/FormInputNumber"
import { processFormMetaWithUserMetaConfig } from "~/Form/FormMetaShadowingProcessor"
import { eventBus } from "@packages/utilities/lib/EventBus"
import { generateUUID } from "@packages/utilities/lib/UUID"
import { FormSettings } from "~/Form/FormSettings/FormSettings"
import { HelpButton } from "~/Help/HelpButton"
import { SidebarMenuTargetHeading } from "~/SidebarNavigation/SidebarMenuTargetHeading"
import { FormFileUpload } from "./FormFileUpload"
import { FormEditorInput } from "./FormEditorInput"
import { FormGroupedMultipleCheckbox } from "./FormGroupedMultipleCheckbox"
import { FormHiddenInput } from "./FormHiddenInput"
import { FormDisplayField } from "./FormDisplayField"
import { ContextAction } from "~/Actions/ContextAction"
import { FormOTPInput } from "./FormOTPInput"
import { IQuery } from "@packages/services/lib/Api/Queries/AdminQueries/Proxy/types"

export const HELPER_FIELD_PATTERN = "__##__"

export function MetaDrivenForm({
  showCloseButton,
  showClearbutton = true,
  applyButtonLabel = "Apply",
  actionContainerStyle,
  clearButtonLabel = "Clear All",
  ...props
}: {
  meta: IField[]
  metaName?: string
  title?: React.ReactNode
  loading?: boolean
  isModal?: boolean
  blocks?: React.ReactNode[]
  helpKey?: string
  showFormSettings?: boolean
  onApplyChanges: (newValues: { [key: string]: any }) => void
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
}) {
  const [formInstance] = Form.useForm()
  const [showLess, setShowLess] = useState(true)
  const [clearTrigger, setClearTrigger] = useState(false)
  const [meta, setMeta] = useState<IField[]>([])
  const REFRESH_EVENT_NAME = generateUUID("REFRESH")
  const formId = generateUUID(props.metaName)
  const [dependencyValue, _setDependencyValue] = useState<{ [key: string]: any }>({})
  const [initialFormValue, setInitialFormValue] = useState()
  const [queryData, setQueryData] = useState()
  const [isFetchingQueryData, setIsFetchingQueryData] = useState(false)

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
        props.onApplyChanges(mergedParams)
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

  const clearParams = () => {
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
        x.defaultValue = queryParams[x.fieldName] !== undefined ? queryParams[x.fieldName] : x.defaultValue
        x.defaultValue2 = x.fieldName2 && (queryParams[x.fieldName2] !== undefined) ? queryParams[x.fieldName2] : x.defaultValue2
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

  useEffect(() => {
    if (props.loading || !initialFormValue) return
    setDependencyValue(initialFormValue)

    eventBus.subscribe(REFRESH_EVENT_NAME, processMeta)
    eventBus.publish(REFRESH_EVENT_NAME)
    return () => {
      clearParams()
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
      className={props.isAside ? 'is-aside' : ''}
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
                    <Button size="small" onClick={clearParams}>
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
                <ContextAction tooltip="Close" type="close" iconColor="primary" onClick={props.closeModal} />
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
                <Button onClick={clearParams}>
                  {clearButtonLabel}
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
                >
                  Cancel
                </Button>
              </Col>
            )}
            <Col>
              <Button
                aria-controls={props.applyButtonAriaControl}
                type="primary"
                form={formId}
                aria-label={applyButtonLabel}
                onClick={() => applyChanges()}
                disabled={!!props.disableApplyButton}
                loading={props.loading}
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
            {props.closeModal && (
              <Col>
                <Button
                  aria-label="Cancel"
                  onClick={() => {
                    formInstance.resetFields()
                    props.closeModal && props.closeModal()
                  }}
                >
                  Cancel
                </Button>
              </Col>
            )}
            <Col>
              <Button
                aria-controls={props.applyButtonAriaControl}
                type="primary"
                form={formId}
                aria-label={applyButtonLabel}
                onClick={() => applyChanges()}
                disabled={!!props.disableApplyButton}
                loading={props.loading}
              >
                {applyButtonLabel}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </Card>
  )
}

export const FormFields = (props: {
  meta: IField[]
  formInstance: FormInstance
  clearTrigger?: boolean
  showLess?: boolean
  isVertical?: boolean
  dependencyValue?: any
  updateMeta?: React.Dispatch<React.SetStateAction<IField[]>>
  handleValuesChange?: (...args: any) => void
  displayFieldValue?: Record<string, any>
  isFetchingQueryData?: boolean
  queryData?: any
}) => {
  const breakpoint = Grid.useBreakpoint()
  const [displayFieldValue, setDisplayFieldValue] = useState<Record<string, any>>()
  const labelColSpan = props.isVertical ? 24 : 8

  useEffect(() => {
    setDisplayFieldValue((props.queryData || props.displayFieldValue) ? { ...props.queryData, ...props.displayFieldValue } : undefined)
  }, [props.displayFieldValue, props.queryData])

  return (
    <Row gutter={16}>
      {props.meta
        .filter((field, index) => {
          if (props.showLess && index < 4) return true
          return !props.showLess
        })
        .map((field, i) => {
          let formField: any
          if (!field.hidden) {
            switch (field.inputType) {
              case TEXT:
                formField = (
                  <FormInput
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case NUMBER:
                formField = (
                  <FormInputNumber
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case TEXTAREA:
                formField = (
                  <FormTextArea
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case BOOLEAN:
                formField = (
                  <FormCheckbox
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 20}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case PASSWORD:
                formField = (
                  <FormPasswordInput
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case OTP:
                formField = (
                  <FormOTPInput
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                    otpLength={field.otpLength}
                  />
                )
                break
              case MULTI_SELECT_CHECKBOX:
                formField = (
                  <FormMultipleCheckbox
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case MULTI_SELECT_GROUP_CHECKBOX:
                formField = (
                  <FormGroupedMultipleCheckbox
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || 4}
                    wrapperColSpan={field.wrapperColSpan || 20}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case MULTI_RADIO:
                formField = (
                  <FormMultipleRadio
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case DROPDOWN:
                formField = (
                  <FormDropDown
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                    autoSelectDefault={field.autoSelectDefault}
                    onAutoSelectDefault={(value) => props.handleValuesChange?.({ [field.fieldName]: value })}
                  />
                )
                break
              case MULTI_SELECT_DROPDOWN:
                formField = (
                  <FormMultiSelectDropDown
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case HIERARCHICAL_MULTIPLE_CHECKBOX:
                formField = (
                  <FormHierarchicalMultipleCheckbox
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    fieldNames={{ title: field.displayKey, key: field.valueKey, children: field.childrenKey }}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
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
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
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
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
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
                    labelColSpan={field.labelColSpan || labelColSpan}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
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
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    updateMeta={props.updateMeta}
                  />
                )
                break
              case CUSTOM_FIELD:
                if (field.customFilterComponent) {
                  formField = (
                    <Form.Item colon={false} label={field.label} labelCol={{ span: field.labelColSpan || 4 }} wrapperCol={{ span: field.wrapperColSpan || 20 }} style={field.formItemStyle}>
                      <field.customFilterComponent
                        {...{
                          ...field,
                          key: i,
                          formInstance: props.formInstance,
                          clearTrigger: props.clearTrigger,
                          labelColSpan: field.labelColSpan || 8,
                          wrapperColSpan: field.wrapperColSpan || 24,
                          dependencyValue: props.dependencyValue[field.fieldName],
                          updateMeta: props.updateMeta,
                          loading: props.isFetchingQueryData
                        }}
                      />
                    </Form.Item>
                  )
                }
                break
              case DISPLAY_FIELD:
                formField = (
                  <FormDisplayField
                    {...field}
                    key={i}
                    formInstance={props.formInstance}
                    clearTrigger={props.clearTrigger}
                    labelColSpan={field.labelColSpan || 8}
                    wrapperColSpan={field.wrapperColSpan || 24}
                    dependencyValue={props.dependencyValue[field.fieldName]}
                    defaultValue={displayFieldValue?.[field.fieldName]}
                    loading={props.isFetchingQueryData}
                  />
                )
                break
              default:
                break
            }
          }

          const lg = field.colSpan || ((props.isVertical || (field.inputType === EDITOR) || (field.inputType === MULTI_SELECT_GROUP_CHECKBOX) || (field.inputType === CUSTOM_FIELD)) ? 24 : 12)
          const xs = 24

          return field.hidden ? (
            <FormHiddenInput
              {...field}
              key={i}
              formInstance={props.formInstance}
              dependencyValue={props.dependencyValue[field.fieldName]}
              updateMeta={props.updateMeta}
            />
          )
            : formField ? (
              <Col key={1000 + i} lg={lg} xs={xs} style={field.withApply ? { display: "flex" } : undefined}>
                {field.withApply ? (
                  <div style={{ display: "flex", flex: 1, ...breakpoint.md ? undefined : { alignItems: "flex-end" }, marginBottom: "24px" }}>
                    {formField}
                    {field.withApply ? <Button onClick={() => field.onApply?.({ value: props.formInstance.getFieldValue(field.fieldName), setDisplayFieldValue })} children={"Apply"} /> : null}
                  </div>
                ) : formField}
                {field.helperText ?
                  <div style={{ marginBottom: "10px" }}>
                    {typeof field.helperText === "string" ? <span>{field.helperText}</span> : field.helperText}
                  </div>
                  : null
                }
              </Col>
            ) : undefined
        })}
    </Row>
  )
}
