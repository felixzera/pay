'use client'

import {
  Drawer,
  Form,
  FormSubmit,
  RenderFields,
  useEditDepth,
  useTranslation,
} from '@payloadcms/ui'
import { useHotkey } from '@payloadcms/ui/hooks'
import React, { useRef } from 'react'

import type { Props } from './types'

import './index.scss'

const baseClass = 'rich-text-link-edit-modal'

export const LinkDrawer: React.FC<Props> = ({
  drawerSlug,
  fieldMap,
  handleModalSubmit,
  initialState,
}) => {
  const { t } = useTranslation()

  return (
    <Drawer className={baseClass} slug={drawerSlug} title={t('fields:editLink')}>
      <Form initialState={initialState} onSubmit={handleModalSubmit}>
        <RenderFields fieldMap={fieldMap} forceRender readOnly={false} />
        <LinkSubmit />
      </Form>
    </Drawer>
  )
}

const LinkSubmit: React.FC = () => {
  const { t } = useTranslation()
  const ref = useRef<HTMLButtonElement>(null)
  const editDepth = useEditDepth()

  useHotkey({ cmdCtrlKey: true, editDepth, keyCodes: ['s'] }, (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (ref?.current) {
      ref.current.click()
    }
  })

  return <FormSubmit ref={ref}>{t('general:submit')}</FormSubmit>
}
