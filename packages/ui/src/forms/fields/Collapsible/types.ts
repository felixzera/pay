import type { FieldPermissions } from 'payload/auth'
import type { FieldTypes } from 'payload/config'

import type { FormFieldBase } from '../shared'

export type Props = FormFieldBase & {
  fieldTypes: FieldTypes
  indexPath: string
  permissions: FieldPermissions
}
