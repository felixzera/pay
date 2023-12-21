import React from 'react'
import { RootProvider } from '@payloadcms/ui/providers'
import { SanitizedConfig } from 'payload/types'
import { createClientConfig } from '../../createClientConfig'

import '@payloadcms/ui/scss/app.scss'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export const RootLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const clientConfig = await createClientConfig(configPromise)

  return (
    <html lang="en" dir="LTR">
      <body>
        <RootProvider config={clientConfig}>{children}</RootProvider>
      </body>
    </html>
  )
}
