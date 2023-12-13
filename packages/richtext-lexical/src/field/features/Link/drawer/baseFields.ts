import type { Config } from 'payload/config'
import type { Field } from 'payload/types'
import type { RadioField, TextField } from 'payload/types'

import { extractTranslations } from 'payload/utilities'

import { validateUrl } from '../../../lexical/utils/url'

const translations = extractTranslations([
  'fields:textToDisplay',
  'fields:linkType',
  'fields:chooseBetweenCustomTextOrDocument',
  'fields:customURL',
  'fields:internalLink',
  'fields:enterURL',
  'fields:chooseDocumentToLink',
  'fields:openInNewTab',
])

export const getBaseFields = (
  uuid: string,
  config: Config,
  enabledCollections: false | string[],
  disabledCollections: false | string[],
): Field[] => {
  let enabledRelations: string[]

  /**
   * Figure out which relations should be enabled (enabledRelations) based on a collection's admin.enableRichTextLink property,
   * or the Link Feature's enabledCollections and disabledCollections properties which override it.
   */
  if (enabledCollections) {
    enabledRelations = enabledCollections
  } else if (disabledCollections) {
    enabledRelations = config.collections
      .filter(({ slug }) => !disabledCollections.includes(slug))
      .map(({ slug }) => slug)
  } else {
    enabledRelations = config.collections
      .filter(({ admin: { enableRichTextLink } }) => enableRichTextLink)
      .map(({ slug }) => slug)
  }

  // Appending the uuid to the field group name ensures that the field group name is unique if two
  // Link drawers are open at the same time (e.g. you open a link drawer from a link drawer in some higher editor depth)
  const fieldGroupName = `linkDrawer_fields_${uuid}`

  const baseFields = [
    {
      name: 'text',
      label: translations['fields:textToDisplay'],
      required: true,
      type: 'text',
    },
    {
      name: fieldGroupName,
      admin: {
        style: {
          borderBottom: 0,
          borderTop: 0,
          margin: 0,
          padding: 0,
        },
      },
      fields: [
        {
          name: 'linkType',
          admin: {
            description: translations['fields:chooseBetweenCustomTextOrDocument'],
          },
          defaultValue: 'custom',
          label: translations['fields:linkType'],
          options: [
            {
              label: translations['fields:customURL'],
              value: 'custom',
            },
          ],
          required: true,
          type: 'radio',
        },
        {
          name: 'url',
          label: translations['fields:enterURL'],
          required: true,
          type: 'text',
          validate: (value: string) => {
            if (value && !validateUrl(value)) {
              return 'Invalid URL'
            }
          },
        },
      ] as Field[],
      label: '',
      type: 'group',
    },
  ]

  // Only display internal link-specific fields / options / conditions if there are enabled relations
  if (enabledRelations?.length) {
    ;(baseFields[1].fields[0] as RadioField).options.push({
      label: translations['fields:internalLink'],
      value: 'internal',
    })
    ;(baseFields[1].fields[1] as TextField).admin = {
      condition: (data) => {
        return data[fieldGroupName]?.linkType !== 'internal'
      },
    }

    baseFields[1].fields.push({
      name: 'doc',
      admin: {
        condition: (data) => {
          return data[fieldGroupName]?.linkType === 'internal'
        },
      },
      label: translations['fields:chooseDocumentToLink'],
      relationTo: enabledRelations,
      required: true,
      type: 'relationship',
    })
  }

  baseFields[1].fields.push({
    name: 'newTab',
    label: translations['fields:openInNewTab'],
    type: 'checkbox',
  })

  return baseFields as Field[]
}
