'use client'
import React from 'react'

import type { Props } from './types.js'

import { useIntersect } from '../../hooks/useIntersect.js'
import { useTranslation } from '../../providers/Translation/index.js'
import { RenderField } from './RenderField.js'
import './index.scss'

const baseClass = 'render-fields'

export { Props }

export const RenderFields: React.FC<Props> = (props) => {
  const { className, fieldMap, forceRender, margins, path, permissions, schemaPath } = props

  const { i18n } = useTranslation()
  const [hasRendered, setHasRendered] = React.useState(Boolean(forceRender))
  const [intersectionRef, entry] = useIntersect(
    {
      rootMargin: '1000px',
    },
    forceRender,
  )
  const isIntersecting = Boolean(entry?.isIntersecting)
  const isAboveViewport = entry?.boundingClientRect?.top < 0
  const shouldRender = forceRender || isIntersecting || isAboveViewport

  React.useEffect(() => {
    if (shouldRender && !hasRendered) {
      setHasRendered(true)
    }
  }, [shouldRender, hasRendered])

  if (!fieldMap || (Array.isArray(fieldMap) && fieldMap.length === 0)) {
    return null
  }

  if (!i18n) {
    console.error('Need to implement i18n when calling RenderFields') // eslint-disable-line no-console
  }

  if (fieldMap) {
    return (
      <div
        className={[
          baseClass,
          className,
          margins && `${baseClass}--margins-${margins}`,
          margins === false && `${baseClass}--margins-none`,
        ]
          .filter(Boolean)
          .join(' ')}
        ref={intersectionRef}
      >
        {hasRendered &&
          fieldMap?.map((f, fieldIndex) => {
            const {
              type,
              CustomField,
              disabled,
              fieldComponentProps,
              fieldComponentProps: { readOnly },
              isHidden,
            } = f

            const name = 'name' in f ? f.name : undefined

            return (
              <RenderField
                CustomField={CustomField}
                disabled={disabled}
                fieldComponentProps={fieldComponentProps}
                indexPath={
                  'indexPath' in props ? `${props?.indexPath}.${fieldIndex}` : `${fieldIndex}`
                }
                isHidden={isHidden}
                key={fieldIndex}
                name={name}
                path={path}
                permissions={permissions?.[name]}
                readOnly={readOnly}
                schemaPath={schemaPath}
                siblingPermissions={permissions}
                type={type}
              />
            )
          })}
      </div>
    )
  }

  return null
}
