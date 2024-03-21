import type { BuildFormStateArgs } from '@payloadcms/ui/forms/buildStateFromSchema'
import type { Field, PayloadRequest, SanitizedConfig } from 'payload/types'

import { buildStateFromSchema } from '@payloadcms/ui/forms/buildStateFromSchema'
import { reduceFieldsToValues } from '@payloadcms/ui/utilities/reduceFieldsToValues'
import httpStatus from 'http-status'

import type { FieldSchemaMap } from '../../utilities/buildFieldSchemaMap/types.js'

import { buildFieldSchemaMap } from '../../utilities/buildFieldSchemaMap/index.js'

let cached = global._payload_fieldSchemaMap

if (!cached) {
  // eslint-disable-next-line no-multi-assign
  cached = global._payload_fieldSchemaMap = null
}

export const getFieldSchemaMap = (config: SanitizedConfig): FieldSchemaMap => {
  if (cached && process.env.NODE_ENV !== 'development') {
    return cached
  }

  cached = buildFieldSchemaMap(config)

  return cached
}

export const buildFormState = async ({ req }: { req: PayloadRequest }) => {
  const reqData: BuildFormStateArgs = req.data as BuildFormStateArgs

  // Wait for 3 seconds
  //await new Promise((resolve) => setTimeout(resolve, 3000))

  const incomingUserSlug = req.user?.collection
  const adminUserSlug = req.payload.config.admin.user

  // If we have a user slug, test it against the functions
  if (incomingUserSlug) {
    const adminAccessFunction = req.payload.collections[incomingUserSlug].config.access?.admin

    // Run the admin access function from the config if it exists
    if (adminAccessFunction) {
      const canAccessAdmin = await adminAccessFunction(req)

      if (!canAccessAdmin) {
        return Response.json(null, {
          status: httpStatus.UNAUTHORIZED,
        })
      }
      // Match the user collection to the global admin config
    } else if (adminUserSlug !== incomingUserSlug) {
      return Response.json(null, {
        status: httpStatus.UNAUTHORIZED,
      })
    }
  } else {
    return Response.json(null, {
      status: httpStatus.UNAUTHORIZED,
    })
  }

  const fieldSchemaMap = getFieldSchemaMap(req.payload.config)

  const {
    collectionSlug,
    data: incomingData,
    docPreferences,
    formState,
    operation,
    schemaPath,
  } = reqData

  const schemaPathSegments = schemaPath.split('.')

  let fieldSchema: Field[]

  if (schemaPathSegments.length === 1) {
    if (req.payload.collections[schemaPath]) {
      fieldSchema = req.payload.collections[schemaPath].config.fields
    } else {
      fieldSchema = req.payload.config.globals.find((global) => global.slug === schemaPath)?.fields
    }
  } else if (fieldSchemaMap.has(schemaPath)) {
    fieldSchema = fieldSchemaMap.get(schemaPath)
  }

  if (!fieldSchema) {
    return Response.json(
      {
        message: 'Could not find field schema for given path',
      },
      {
        status: httpStatus.BAD_REQUEST,
      },
    )
  }

  const data = incomingData || reduceFieldsToValues(formState || {}, true)

  const id = collectionSlug ? reqData.id : undefined

  const result = await buildStateFromSchema({
    id,
    data,
    fieldSchema,
    operation,
    preferences: docPreferences,
    req,
  })

  return Response.json(result, {
    status: httpStatus.OK,
  })
}
