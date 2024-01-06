import React from 'react'
import { DefaultTemplate } from '@payloadcms/ui'
import { SanitizedConfig } from 'payload/types'

import '@payloadcms/ui/scss/app.scss'
import { initPage } from '../../utilities/initPage'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export const AdminLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const { user, permissions, i18n } = await initPage(configPromise)

  return (
    <DefaultTemplate config={configPromise} user={user} permissions={permissions} i18n={i18n}>
      {children}
    </DefaultTemplate>
  )
}
