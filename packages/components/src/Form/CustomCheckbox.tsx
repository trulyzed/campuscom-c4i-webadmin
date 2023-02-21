import { useCallback, useMemo } from "react"
import { IField } from "~/Form/common"

interface ICustomCheckboxProps {
  fieldName: IField['fieldName']
  label: IField['label']
  value: boolean
  onChange: (value: boolean) => void
  required?: boolean
  disabled?: boolean
  showColon?: boolean
  normalLabel?: boolean
}

export const CustomCheckbox = ({
  fieldName,
  label,
  value,
  onChange,
  required,
  disabled,
  showColon = true,
  normalLabel
}: ICustomCheckboxProps) => {
  const wrapperClassNames = useMemo(() => [
    'ant-checkbox-wrapper',
    ...disabled ? ['ant-checkbox-wrapper-disabled'] : [],
    ...value ? ['ant-checkbox-wrapper-checked'] : [],
  ].join(' '), [disabled, value])

  const checkboxClassNames = useMemo(() => [
    'ant-checkbox',
    ...value ? ['ant-checkbox-checked'] : [],
    ...disabled ? ['ant-checkbox-disabled'] : [],
  ].join(' '), [value, disabled])

  const labelClassNames = useMemo(() => [
    ...required ? ['ant-form-item-required'] : [],
    ...showColon ? ['ant-form-item-no-colon'] : [],
  ].join(' '), [required, showColon])

  const handleChange = useCallback((value: boolean) => {
    if (disabled) return
    onChange(value)
  }, [disabled, onChange])

  return (
    <div className={wrapperClassNames}>
      <span className={checkboxClassNames}>
        <input
          className={'ant-checkbox-input'}
          type={"checkbox"}
          aria-label={typeof label === 'string' ? label : fieldName}
          onChange={(e) => handleChange(e.target.checked)}
          checked={value}
          disabled={disabled} />
        <span className="ant-checkbox-inner"></span>
      </span>
      <label htmlFor={fieldName}>
        {typeof label === 'string' ? (
          <span
            className="ant-form-item-label"
            style={{ padding: 0, paddingLeft: 10, ...normalLabel && { fontWeight: "normal" } }}
            onClick={() => handleChange(!value)}
            onKeyDown={() => handleChange(!value)}
            role={"presentation"}>
            <span className={labelClassNames} >{label}</span>
          </span>
        ) : label}
      </label>
    </div>
  )
}
