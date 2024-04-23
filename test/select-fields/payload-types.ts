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
    categories: Category
    posts: Post
    'payload-preferences': PayloadPreference
    'payload-migrations': PayloadMigration
  }
  globals: {}
  locale: null
  user: User & {
    collection: 'users'
  }
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string
  updatedAt: string
  createdAt: string
  email: string
  resetPasswordToken?: string | null
  resetPasswordExpiration?: string | null
  salt?: string | null
  hash?: string | null
  loginAttempts?: number | null
  lockUntil?: string | null
  password?: string | null
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "categories".
 */
export interface Category {
  id: string
  title?: string | null
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "posts".
 */
export interface Post {
  id: string
  title?: string | null
  array?:
    | {
        title?: string | null
        id?: string | null
      }[]
    | null
  group?: {
    title?: string | null
  }
  groupMultiple?: {
    titleFirst?: string | null
    titleSecond?: string | null
  }
  arrayMultiple?:
    | {
        titleFirst?: string | null
        titleSecond?: string | null
        id?: string | null
      }[]
    | null
  groupArray?: {
    title?: string | null
    array?:
      | {
          title?: string | null
          id?: string | null
        }[]
      | null
  }
  blocks?:
    | {
        title?: string | null
        secondTitle?: string | null
        id?: string | null
        blockName?: string | null
        blockType: 'section'
      }[]
    | null
  category?: (string | null) | Category
  updatedAt: string
  createdAt: string
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
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
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string
  name?: string | null
  batch?: number | null
  updatedAt: string
  createdAt: string
}

declare module 'payload' {
  export interface GeneratedTypes extends Config {}
}
