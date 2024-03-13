import type { CollectionConfig } from 'payload/types'

import type { PluginConfig } from '../types'

/**
 * Helper function to determine if the breadcrumbs should be populated
 *
 * @param pluginConfig - The plugin configuration
 * @param data - The data to be saved
 * @param collection - The collection configuration
 * @param originalDoc - The original document
 */
const shouldPopulateBreadcrumbs = (
  pluginConfig: PluginConfig,
  data: unknown,
  collection: CollectionConfig,
  originalDoc?: unknown,
) => {
  // the originalDoc is not present, so we should populate the breadcrumbs
  if (!originalDoc) return true

  const collectionKey = collection?.admin?.useAsTitle || 'id'

  // if the collection key is different, we should populate the breadcrumbs
  if (data?.[collectionKey] !== originalDoc?.[collectionKey]) return true

  const urlKey = pluginConfig?.urlFieldSlug

  // if the urlKey is set via PluginConfig.urlFieldSlug and the data is different,
  // we should populate the breadcrumbs
  if (urlKey && data?.[urlKey] !== originalDoc?.[urlKey]) return true

  return false
}

export default shouldPopulateBreadcrumbs
