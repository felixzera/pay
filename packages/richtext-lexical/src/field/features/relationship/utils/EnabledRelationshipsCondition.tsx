import type { ClientUser } from 'payload/auth'
import type { ClientCollectionConfig } from 'payload/types'

import { useAuth } from '@payloadcms/ui/providers/Auth'
import { useConfig } from '@payloadcms/ui/providers/Config'
import * as React from 'react'

type options = {
  uploads: boolean
  user: ClientUser
}

type FilteredCollectionsT = (
  collections: ClientCollectionConfig[],
  options?: options,
) => ClientCollectionConfig[]
const filterRichTextCollections: FilteredCollectionsT = (collections, options) => {
  return collections.filter(({ admin: { enableRichTextRelationship, hidden }, upload }) => {
    if (hidden === true || (typeof hidden === 'function' && hidden({ user: options.user }))) {
      return false
    }
    if (options?.uploads) {
      return enableRichTextRelationship && Boolean(upload) === true
    }

    return upload ? false : enableRichTextRelationship
  })
}

export const EnabledRelationshipsCondition: React.FC<any> = (props) => {
  const { children, uploads = false, ...rest } = props
  const { collections } = useConfig()
  const { user } = useAuth()
  const [enabledCollectionSlugs] = React.useState(() =>
    filterRichTextCollections(collections, { uploads, user }).map(({ slug }) => slug),
  )

  if (!enabledCollectionSlugs.length) {
    return null
  }

  return React.cloneElement(children, { ...rest, enabledCollectionSlugs })
}
