import type { LanguageTranslations } from '@payloadcms/translations'
import type { SanitizedConfig } from 'payload/types'

import { translations } from '@payloadcms/translations/client'
import { RootProvider, buildComponentMap } from '@payloadcms/ui'
import '@payloadcms/ui/scss/app.scss'
import { headers as getHeaders } from 'next/headers.js'
import { parseCookies } from 'payload/auth'
import { createClientConfig } from 'payload/config'
import { deepMerge } from 'payload/utilities'
import React from 'react'
import 'react-toastify/dist/ReactToastify.css'

import { getRequestLanguage } from '../../utilities/getRequestLanguage.js'
import { DefaultEditView } from '../../views/Edit/Default/index.js'
import { DefaultCell } from '../../views/List/Default/Cell/index.js'
import { DefaultListView } from '../../views/List/Default/index.js'

export const metadata = {
  description: 'Generated by Next.js',
  title: 'Next.js',
}

const rtlLanguages = ['ar', 'fa', 'ha', 'ku', 'ur', 'ps', 'dv', 'ks', 'khw', 'he', 'yi']

export const RootLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const config = await configPromise
  const clientConfig = await createClientConfig(config)

  const headers = getHeaders()
  const cookies = parseCookies(headers)

  const lang =
    getRequestLanguage({
      cookies,
      headers,
    }) ?? clientConfig.i18n.fallbackLanguage

  const dir = rtlLanguages.includes(lang) ? 'RTL' : 'LTR'

  const mergedTranslations = deepMerge(translations, clientConfig.i18n.translations)

  const languageOptions = Object.entries(translations || {}).map(([language, translations]) => ({
    label: translations.general.thisLanguage,
    value: language,
  }))

  // eslint-disable-next-line @typescript-eslint/require-await
  async function loadLanguageTranslations(lang: string): Promise<LanguageTranslations> {
    'use server'
    return mergedTranslations[lang]
  }

  const { componentMap, wrappedChildren } = buildComponentMap({
    DefaultCell,
    DefaultEditView,
    DefaultListView,
    children,
    config,
  })

  return (
    <html dir={dir} lang={lang}>
      <body>
        <RootProvider
          componentMap={componentMap}
          config={clientConfig}
          fallbackLang={clientConfig.i18n.fallbackLanguage}
          lang={lang}
          languageOptions={languageOptions}
          // eslint-disable-next-line react/jsx-no-bind
          loadLanguageTranslations={loadLanguageTranslations}
          translations={mergedTranslations[lang]}
        >
          {wrappedChildren}
        </RootProvider>
        <div id="portal" />
      </body>
    </html>
  )
}
