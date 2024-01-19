'use client'
import React from 'react'
import { useFormFields } from '../../../Form/context'

export const CheckboxWrapper: React.FC<{
  path: string
  children: React.ReactNode
  readOnly?: boolean
  baseClass?: string
}> = (props) => {
  const { path, children, readOnly, baseClass } = props

  const field = useFormFields(([fields]) => fields[path])

  const { value: checked } = field || {}

  return (
    <div
      className={[
        baseClass,
        checked && `${baseClass}--checked`,
        readOnly && `${baseClass}--read-only`,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
