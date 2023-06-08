/* tslint:disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    pages: Page
    users: User
  }
  globals: {
    'main-menu': MainMenu
  }
}
export interface Page {
  id: string
  title: string
  slug?: string
  richText: Array<{
    [k: string]: unknown
  }>
  _status?: 'draft' | 'published'
  createdAt: string
  updatedAt: string
  password?: string
}
export interface User {
  id: string
  email?: string
  resetPasswordToken?: string
  resetPasswordExpiration?: string
  loginAttempts?: number
  lockUntil?: string
  createdAt: string
  updatedAt: string
  password?: string
}
export interface MainMenu {
  id: string
  navItems: Array<{
    link: {
      type?: 'reference' | 'custom'
      newTab?: boolean
      reference: {
        value: string | Page
        relationTo: 'pages'
      }
      url: string
      label: string
    }
    id?: string
  }>
}
