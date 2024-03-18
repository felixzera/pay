/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User
    posts: Post
    unrestricted: Unrestricted
    restricted: Restricted
    'read-only-collection': ReadOnlyCollection
    'user-restricted': UserRestricted
    'restricted-versions': RestrictedVersion
    'sibling-data': SiblingDatum
    'rely-on-request-headers': RelyOnRequestHeader
    'doc-level-access': DocLevelAccess
    'hidden-fields': HiddenField
    'hidden-access': HiddenAccess
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {}
}
export interface User {
  id: string
  roles?: ('admin' | 'user')[] | null
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password: string | null
}
export interface Post {
  id: string
  restrictedField?: string | null
  group?: {
    restrictedGroupText?: string | null
  }
  restrictedRowText?: string | null
  restrictedCollapsibleText?: string | null
  updatedAt: string
  createdAt: string
}
export interface Unrestricted {
  id: string
  name?: string | null
  userRestrictedDocs?: (string | UserRestricted)[] | null
  updatedAt: string
  createdAt: string
}
export interface UserRestricted {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
export interface Restricted {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
export interface ReadOnlyCollection {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
export interface RestrictedVersion {
  id: string
  name?: string | null
  hidden?: boolean | null
  updatedAt: string
  createdAt: string
}
export interface SiblingDatum {
  id: string
  array?:
    | {
        allowPublicReadability?: boolean | null
        text?: string | null
        id?: string | null
      }[]
    | null
  updatedAt: string
  createdAt: string
}
export interface RelyOnRequestHeader {
  id: string
  name?: string | null
  updatedAt: string
  createdAt: string
}
export interface DocLevelAccess {
  id: string
  approvedForRemoval?: boolean | null
  approvedTitle?: string | null
  lockTitle?: boolean | null
  updatedAt: string
  createdAt: string
}
export interface HiddenField {
  id: string
  title?: string | null
  partiallyHiddenGroup?: {
    name?: string | null
    value?: string | null
  }
  partiallyHiddenArray?:
    | {
        name?: string | null
        value?: string | null
        id?: string | null
      }[]
    | null
  hidden?: boolean | null
  updatedAt: string
  createdAt: string
}
export interface HiddenAccess {
  id: string
  title: string
  hidden?: boolean | null
  updatedAt: string
  createdAt: string
}
export interface PayloadPreference {
  id: string
  user: {
    relationTo: 'users'
    value: string | User
  }
  key?: string | null
  value?:
    | {
        [k: string]: unknown
      }
    | unknown[]
    | string
    | number
    | boolean
    | null
  updatedAt: string
  createdAt: string
}
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}
