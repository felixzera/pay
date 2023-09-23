import type { Sharp } from 'sharp'

import { fromBuffer } from 'file-type'
import mkdirp from 'mkdirp'
import path from 'path'
import sanitize from 'sanitize-filename'
import sharp from 'sharp'

import type { Collection } from '../collections/config/types'
import type { SanitizedConfig } from '../config/types'
import type { PayloadRequest } from '../express/types'
import type { FileData, FileToSave, ProbedImageSize } from './types'

import { FileUploadError, MissingFile } from '../errors'
import canResizeImage from './canResizeImage'
import getImageSize from './getImageSize'
import getSafeFileName from './getSafeFilename'
import resizeAndTransformImageSizes from './imageResizer'
import isImage from './isImage'

type Args<T> = {
  collection: Collection
  config: SanitizedConfig
  data: T
  overwriteExistingFiles?: boolean
  req: PayloadRequest
  throwOnMissingFile?: boolean
}

type Result<T> = Promise<{
  data: T
  files: FileToSave[]
}>

export const generateFileData = async <T>({
  collection: { config: collectionConfig },
  config,
  data,
  overwriteExistingFiles,
  req,
  throwOnMissingFile,
}: Args<T>): Result<T> => {
  if (!collectionConfig.upload) {
    return {
      data,
      files: [],
    }
  }

  const { file } = req.files || {}
  if (!file) {
    if (throwOnMissingFile) throw new MissingFile(req.t)

    return {
      data,
      files: [],
    }
  }

  const { disableLocalStorage, formatOptions, imageSizes, resizeOptions, staticDir, trimOptions } =
    collectionConfig.upload

  let staticPath = staticDir
  if (staticDir.indexOf('/') !== 0) {
    staticPath = path.resolve(config.paths.configDir, staticDir)
  }

  if (!disableLocalStorage) {
    mkdirp.sync(staticPath)
  }

  let newData = data
  const filesToSave: FileToSave[] = []
  const fileData: Partial<FileData> = {}
  const fileIsAnimated = file.mimetype === 'image/gif' || file.mimetype === 'image/webp'

  try {
    const fileSupportsResize = canResizeImage(file.mimetype)
    let fsSafeName: string
    let sharpFile: Sharp | undefined
    let dimensions: ProbedImageSize | undefined
    let fileBuffer
    let ext
    let mime: string

    const sharpOptions: sharp.SharpOptions = {}

    if (fileIsAnimated) sharpOptions.animated = true

    if (fileSupportsResize && (resizeOptions || formatOptions || trimOptions)) {
      if (file.tempFilePath) {
        sharpFile = sharp(file.tempFilePath, sharpOptions).rotate() // pass rotate() to auto-rotate based on EXIF data. https://github.com/payloadcms/payload/pull/3081
      } else {
        sharpFile = sharp(file.data, sharpOptions).rotate() // pass rotate() to auto-rotate based on EXIF data. https://github.com/payloadcms/payload/pull/3081
      }

      if (resizeOptions) {
        sharpFile = sharpFile.resize(resizeOptions)
      }
      if (formatOptions) {
        sharpFile = sharpFile.toFormat(formatOptions.format, formatOptions.options)
      }
      if (trimOptions) {
        sharpFile = sharpFile.trim(trimOptions)
      }
    }

    if (isImage(file.mimetype)) {
      dimensions = await getImageSize(file)
      fileData.width = dimensions.width
      fileData.height = dimensions.height
    }

    if (sharpFile) {
      const metadata = await sharpFile.metadata()
      fileBuffer = await sharpFile.toBuffer({ resolveWithObject: true })
      ;({ ext, mime } = await fromBuffer(fileBuffer.data)) // This is getting an incorrect gif height back.
      fileData.width = fileBuffer.info.width
      fileData.height = fileBuffer.info.height
      fileData.filesize = fileBuffer.info.size

      // Animated GIFs + WebP aggregate the height from every frame, so we need to use divide by number of pages
      if (metadata.pages) {
        fileData.height = fileBuffer.info.height / metadata.pages
        fileData.filesize = fileBuffer.data.length
      }
    } else {
      mime = file.mimetype
      fileData.filesize = file.size

      if (file.name.includes('.')) {
        ext = file.name.split('.').pop()
      } else {
        ext = ''
      }
    }

    // Adust SVG mime type. fromBuffer modifies it.
    if (mime === 'application/xml' && ext === 'svg') mime = 'image/svg+xml'
    fileData.mimeType = mime

    const baseFilename = sanitize(file.name.substring(0, file.name.lastIndexOf('.')) || file.name)
    fsSafeName = `${baseFilename}${ext ? `.${ext}` : ''}`

    if (!overwriteExistingFiles) {
      fsSafeName = await getSafeFileName({
        collectionSlug: collectionConfig.slug,
        desiredFilename: fsSafeName,
        req,
        staticPath,
      })
    }

    fileData.filename = fsSafeName

    // Original file
    filesToSave.push({
      buffer: fileBuffer?.data || file.data,
      path: `${staticPath}/${fsSafeName}`,
    })

    if (Array.isArray(imageSizes) && fileSupportsResize) {
      req.payloadUploadSizes = {}

      const { sizeData, sizesToSave } = await resizeAndTransformImageSizes({
        config: collectionConfig,
        dimensions,
        file,
        mimeType: fileData.mimeType,
        req,
        savedFilename: fsSafeName || file.name,
        staticPath,
      })

      fileData.sizes = sizeData
      filesToSave.push(...sizesToSave)
    }
  } catch (err) {
    console.error(err)
    throw new FileUploadError(req.t)
  }

  newData = {
    ...newData,
    ...fileData,
  }

  return {
    data: newData,
    files: filesToSave,
  }
}
