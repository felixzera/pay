'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from '../../../providers/Translation'

import { getTranslation } from '@payloadcms/translations'
import useField from '../../useField'
import './index.scss'

export const NumberInput: React.FC<{
  path: string
  required?: boolean
  min?: number
  max?: number
  placeholder?: Record<string, string> | string
  readOnly?: boolean
  step?: number
  hasMany?: boolean
  name?: string
}> = (props) => {
  const {
    name,
    placeholder,
    readOnly,
    step,
    hasMany,
    max,
    min,
    path: pathFromProps,
    required,
  } = props

  const { i18n } = useTranslation()

  const path = pathFromProps || name

  // const memoizedValidate = useCallback(
  //   (value, options) => {
  //     return validate(value, { ...options, max, min, required })
  //   },
  //   [validate, min, max, required],
  // )

  const { errorMessage, setValue, showError, value } = useField<number | number[]>({
    // condition,
    path,
    // validate: memoizedValidate,
  })

  const handleChange = useCallback(
    (e) => {
      const val = parseFloat(e.target.value)

      if (Number.isNaN(val)) {
        setValue('')
      } else {
        setValue(val)
      }
    },
    [setValue],
  )

  const [valueToRender, setValueToRender] = useState<
    { id: string; label: string; value: { value: number } }[]
  >([]) // Only for hasMany

  const handleHasManyChange = useCallback(
    (selectedOption) => {
      if (!readOnly) {
        let newValue
        if (!selectedOption) {
          newValue = []
        } else if (Array.isArray(selectedOption)) {
          newValue = selectedOption.map((option) => Number(option.value?.value || option.value))
        } else {
          newValue = [Number(selectedOption.value?.value || selectedOption.value)]
        }

        setValue(newValue)
      }
    },
    [readOnly, setValue],
  )

  // useEffect update valueToRender:
  useEffect(() => {
    if (hasMany && Array.isArray(value)) {
      setValueToRender(
        value.map((val, index) => {
          return {
            id: `${val}${index}`, // append index to avoid duplicate keys but allow duplicate numbers
            label: `${val}`,
            value: {
              toString: () => `${val}${index}`,
              value: (val as any)?.value || val,
            }, // You're probably wondering, why the hell is this done that way? Well, React-select automatically uses "label-value" as a key, so we will get that react duplicate key warning if we just pass in the value as multiple values can be the same. So we need to append the index to the toString() of the value to avoid that warning, as it uses that as the key.
          }
        }),
      )
    }
  }, [value, hasMany])

  return (
    <input
      disabled={readOnly}
      id={`field-${path.replace(/\./g, '__')}`}
      name={path}
      onChange={handleChange}
      onWheel={(e) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        e.target.blur()
      }}
      placeholder={getTranslation(placeholder, i18n)}
      step={step}
      type="number"
      value={typeof value === 'number' ? value : ''}
    />
  )
}
