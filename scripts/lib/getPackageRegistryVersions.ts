import chalk from 'chalk'

import { getPackageDetails } from './getPackageDetails.js'

const packages = [
  'payload',
  'translations',
  'ui',
  'next',
  'graphql',
  'db-mongodb',
  'db-postgres',
  'richtext-slate',
  'richtext-lexical',

  'create-payload-app',

  // Plugins
  'plugin-cloud',
  'plugin-cloud-storage',
  'plugin-form-builder',
  'plugin-nested-docs',
  'plugin-redirects',
  'plugin-search',
  'plugin-seo',
  // 'plugin-stripe',
  // 'plugin-sentry',
]

export const getPackageRegistryVersions = async (): Promise<void> => {
  const packageDetails = await getPackageDetails(packages)

  await Promise.all(
    packageDetails.map(async (pkg) => {
      // Get published version from npm
      const json = await fetch(`https://registry.npmjs.org/${pkg.name}`).then((res) => res.json())
      const { latest, beta } = json['dist-tags']
      const msg = `${chalk.bold(pkg.name.padEnd(32))} latest: ${latest?.padEnd(16)} beta: ${beta?.padEnd(16)}`
      console.log(msg)
    }),
  )
}

if (import.meta.url === new URL(import.meta.url).href) {
  await getPackageRegistryVersions()
}
