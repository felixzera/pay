'use client'
import React from 'react'
import { useTranslation } from '../../../providers/Translation'

import type { Translation } from 'payload/src/translations-new/type'

import ReactSelect from '../../../elements/ReactSelect'
import Label from '../../../forms/Label'
import { ToggleTheme } from '../ToggleTheme'
import './index.scss'

const baseClass = 'payload-settings'

export const Settings: React.FC<{
  className?: string
}> = (props) => {
  const { className } = props

  const { i18n, t } = useTranslation()

  // TODO: wire i18n options up
  const languageOptions = Object.entries(i18n?.options?.resources || {}).map(
    ([language, resource]) => ({
      label: (resource as Translation).general.thisLanguage,
      value: language,
    }),
  )

  return (
    <div className={[baseClass, className].filter(Boolean).join(' ')}>
      <h3>{t('general:payloadSettings')}</h3>
      <div className={`${baseClass}__language`}>
        <Label htmlFor="language-select" label={t('general:language')} />
        <ReactSelect
          inputId="language-select"
          // TODO: wire this back up onChange={({ value }) => i18n.changeLanguage(value)}
          options={languageOptions}
          value={languageOptions.find((language) => language.value === i18n.language)}
        />
      </div>
      <ToggleTheme />
    </div>
  )
}
