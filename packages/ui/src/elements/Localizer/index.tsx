import { getTranslation } from '@payloadcms/translations'
import { useRouter } from 'next/navigation.js'
import React from 'react'

import { useConfig } from '../../providers/Config/index.js'
import { useLocale } from '../../providers/Locale/index.js'
import { useSearchParams } from '../../providers/SearchParams/index.js'
import { useTranslation } from '../../providers/Translation/index.js'
import * as PopupList from '../Popup/PopupButtonList/index.js'
import Popup from '../Popup/index.js'
import { LocalizerLabel } from './LocalizerLabel/index.js'
import './index.scss'

const baseClass = 'localizer'

const Localizer: React.FC<{
  className?: string
}> = (props) => {
  const { className } = props
  const config = useConfig()
  const { localization } = config

  const { i18n } = useTranslation()
  const locale = useLocale()
  const { stringifyParams } = useSearchParams()
  const router = useRouter()

  if (localization) {
    const { locales } = localization

    return (
      <div className={[baseClass, className].filter(Boolean).join(' ')}>
        <Popup
          button={<LocalizerLabel />}
          horizontalAlign="right"
          render={({ close }) => (
            <PopupList.ButtonGroup>
              {locales.map((localeOption) => {
                const localeOptionLabel = getTranslation(localeOption.label, i18n)

                return (
                  <PopupList.Button
                    active={locale.code === localeOption.code}
                    key={localeOption.code}
                    onClick={() => {
                      router.replace(
                        stringifyParams({
                          params: {
                            locale: localeOption.code,
                          },
                        }),
                      )
                      console.log('changing locale')
                      router.refresh()
                      close()
                    }}
                  >
                    {localeOptionLabel}
                    {localeOptionLabel !== localeOption.code && ` (${localeOption.code})`}
                  </PopupList.Button>
                )
              })}
            </PopupList.ButtonGroup>
          )}
          showScrollbar
          size="large"
        />
      </div>
    )
  }

  return null
}

export default Localizer
