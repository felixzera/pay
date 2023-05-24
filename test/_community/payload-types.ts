/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    posts: Post;
    media: Media;
    users: User;
  };
  globals: {
    menu: Menu;
  };
}
export interface Post {
  id: string;
  text?: string;
  associatedMedia?: string | Media;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: string;
  updatedAt: string;
  createdAt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Menu {
  id: string;
  globalText?: string;
}
