import path from 'path'

import type { Media, Page, Post } from './payload-types'

import { handleMessage } from '../../packages/live-preview/src/handleMessage'
import { mergeData } from '../../packages/live-preview/src/mergeData'
import payload from '../../packages/payload/src'
import getFileByPath from '../../packages/payload/src/uploads/getFileByPath'
import { fieldSchemaToJSON } from '../../packages/payload/src/utilities/fieldSchemaToJSON'
import { initPayloadTest } from '../helpers/configHelpers'
import { RESTClient } from '../helpers/rest'
import { Pages } from './collections/Pages'
import { postsSlug } from './collections/Posts'
import configPromise from './config'
import { pagesSlug } from './shared'

require('isomorphic-fetch')

const schemaJSON = fieldSchemaToJSON(Pages.fields)

describe('Collections - Live Preview', () => {
  let client
  let serverURL

  let testPost: Post
  let media: Media

  beforeAll(async () => {
    const { serverURL: incomingServerURL } = await initPayloadTest({
      __dirname,
      init: { local: false },
    })

    serverURL = incomingServerURL
    const config = await configPromise
    client = new RESTClient(config, { serverURL, defaultSlug: pagesSlug })
    await client.login()

    testPost = await payload.create({
      collection: postsSlug,
      data: {
        slug: 'post-1',
        title: 'Test Post',
      },
    })

    // Create image
    const filePath = path.resolve(__dirname, './seed/image-1.jpg')
    const file = await getFileByPath(filePath)
    file.name = 'image-1.jpg'

    media = await payload.create({
      collection: 'media',
      data: {
        alt: 'Image 1',
      },
      file,
    })
  })

  it('handles `postMessage`', async () => {
    const handledMessage = await handleMessage({
      depth: 1,
      event: {
        data: JSON.stringify({
          data: {
            title: 'Test Page (Changed)',
          },
          fieldSchemaJSON: schemaJSON,
          type: 'payload-live-preview',
        }),
        origin: serverURL,
      } as MessageEvent,
      initialData: {
        title: 'Test Page',
      } as Page,
      serverURL,
    })

    expect(handledMessage.title).toEqual('Test Page (Changed)')
  })

  it('caches `fieldSchemaJSON`', async () => {
    const handledMessage = await handleMessage({
      depth: 1,
      event: {
        data: JSON.stringify({
          data: {
            title: 'Test Page (Changed)',
          },
          type: 'payload-live-preview',
        }),
        origin: serverURL,
      } as MessageEvent,
      initialData: {
        title: 'Test Page',
      } as Page,
      serverURL,
    })

    expect(handledMessage.title).toEqual('Test Page (Changed)')
  })

  it('merges data', async () => {
    const initialData: Partial<Page> = {
      id: '123',
      title: 'Test Page',
    }

    const mergedData = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        title: 'Test Page (Merged)',
      },
      initialData,
      serverURL,
    })

    expect(mergedData.id).toEqual(initialData.id)
  })

  it('— strings - merges data', async () => {
    const initialData: Partial<Page> = {
      title: 'Test Page',
    }

    const mergedData = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        title: 'Test Page (Changed)',
      },
      initialData,
      serverURL,
    })

    expect(mergedData.title).toEqual('Test Page (Changed)')
  })

  // TODO: this test is not working in Postgres
  // This is because of how relationships are handled in `mergeData`
  // This test passes in MongoDB, though
  it.skip('— uploads - adds and removes media', async () => {
    const initialData: Partial<Page> = {
      title: 'Test Page',
    }

    // Add upload
    const mergedData = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        hero: {
          type: 'highImpact',
          media: media.id,
        },
      },
      initialData,
      serverURL,
    })

    expect(mergedData.hero.media).toMatchObject(media)

    // Add upload
    const mergedDataWithoutUpload = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...mergedData,
        hero: {
          type: 'highImpact',
          media: null,
        },
      },
      initialData: mergedData,
      serverURL,
    })

    expect(mergedDataWithoutUpload.hero.media).toBeFalsy()
  })

  it('— relationships - populates all types', async () => {
    const initialData: Partial<Page> = {
      title: 'Test Page',
    }

    const merge1 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        relationshipMonoHasOne: testPost.id,
        relationshipMonoHasMany: [testPost.id],
        relationshipPolyHasMany: [{ value: testPost.id, relationTo: postsSlug }],
      },
      initialData,
      serverURL,
    })

    expect(merge1.relationshipMonoHasOne).toMatchObject(testPost)
    expect(merge1.relationshipMonoHasMany).toMatchObject([testPost])
    expect(merge1.relationshipPolyHasMany).toMatchObject([
      { value: testPost, relationTo: postsSlug },
    ])

    // Clear relationships
    const merge2 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...merge1,
        relationshipMonoHasOne: null,
        relationshipMonoHasMany: [],
        relationshipPolyHasMany: [],
      },
      initialData,
      serverURL,
    })

    expect(merge2.relationshipMonoHasOne).toBeFalsy()
    expect(merge2.relationshipMonoHasMany).toEqual([])
    expect(merge2.relationshipPolyHasMany).toEqual([])

    // Now populate the relationships again
    const merge3 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...merge2,
        relationshipMonoHasOne: testPost.id,
        relationshipMonoHasMany: [testPost.id],
        relationshipPolyHasMany: [{ value: testPost.id, relationTo: postsSlug }],
      },
      initialData,
      serverURL,
    })

    expect(merge3.relationshipMonoHasOne).toMatchObject(testPost)
    expect(merge3.relationshipMonoHasMany).toMatchObject([testPost])
    expect(merge3.relationshipPolyHasMany).toMatchObject([
      { value: testPost, relationTo: postsSlug },
    ])
  })

  it('— relationships - populates within arrays', async () => {
    const initialData: Partial<Page> = {
      title: 'Test Page',
    }

    const merge1 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        arrayOfRelationships: [
          {
            id: '123',
            relationshipWithinArray: testPost.id,
          },
        ],
      },
      initialData,
      serverURL,
    })

    expect(merge1.arrayOfRelationships).toHaveLength(1)
    expect(merge1.arrayOfRelationships).toMatchObject([
      {
        id: '123',
        relationshipWithinArray: testPost,
      },
    ])

    // Add a new block before the populated one, then check to see that the relationship is still populated
    const merge2 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...merge1,
        arrayOfRelationships: [
          {
            id: '456',
            relationshipWithinArray: undefined,
          },
          {
            id: '123',
            relationshipWithinArray: testPost.id,
          },
        ],
      },
      initialData,
      serverURL,
    })

    expect(merge2.arrayOfRelationships).toHaveLength(2)
    expect(merge2.arrayOfRelationships).toMatchObject([
      {
        id: '456',
      },
      {
        id: '123',
        relationshipWithinArray: testPost,
      },
    ])
  })

  it('— relationships - populates within blocks', async () => {
    const block1 = (shallow?: boolean): Extract<Page['layout'][0], { blockType: 'cta' }> => ({
      blockType: 'cta',
      id: '123',
      links: [
        {
          link: {
            label: 'Link 1',
            type: 'reference',
            reference: {
              relationTo: 'posts',
              value: shallow ? testPost?.id : testPost,
            },
          },
        },
      ],
    })

    const block2: Extract<Page['layout'][0], { blockType: 'content' }> = {
      blockType: 'content',
      id: '456',
      columns: [
        {
          id: '789',
          richText: [
            {
              type: 'paragraph',
              text: 'Column 1',
            },
          ],
        },
      ],
    }

    const initialData: Partial<Page> = {
      title: 'Test Page',
      layout: [block1(), block2],
    }

    // Add a new block before the populated one
    // Then check to see that the relationship is still populated
    const merge2 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        layout: [block2, block1(true)],
      },
      initialData,
      serverURL,
    })

    // Check that the relationship on the first has been removed
    // And that the relationship on the second has been populated
    expect(merge2.layout[0].links).toBeUndefined()
    expect(merge2.layout[1].links[0].link.reference.value).toMatchObject(testPost)
  })

  it('— blocks - adds, reorders, and removes blocks', async () => {
    const block1ID = '123'
    const block2ID = '456'

    const initialData: Partial<Page> = {
      title: 'Test Page',
      layout: [
        {
          blockType: 'cta',
          id: block1ID,
          richText: [
            {
              type: 'paragraph',
              text: 'Block 1 (Position 1)',
            },
          ],
        },
        {
          blockType: 'cta',
          id: block2ID,
          richText: [
            {
              type: 'paragraph',
              text: 'Block 2 (Position 2)',
            },
          ],
        },
      ],
    }

    // Reorder the blocks
    const merge1 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        layout: [
          {
            blockType: 'cta',
            id: block2ID,
            richText: [
              {
                type: 'paragraph',
                text: 'Block 2 (Position 1)',
              },
            ],
          },
          {
            blockType: 'cta',
            id: block1ID,
            richText: [
              {
                type: 'paragraph',
                text: 'Block 1 (Position 2)',
              },
            ],
          },
        ],
      },
      initialData,
      serverURL,
    })

    // Check that the blocks have been reordered
    expect(merge1.layout).toHaveLength(2)
    expect(merge1.layout[0].id).toEqual(block2ID)
    expect(merge1.layout[1].id).toEqual(block1ID)
    expect(merge1.layout[0].richText[0].text).toEqual('Block 2 (Position 1)')
    expect(merge1.layout[1].richText[0].text).toEqual('Block 1 (Position 2)')

    // Remove a block
    const merge2 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        layout: [
          {
            blockType: 'cta',
            id: block2ID,
            richText: [
              {
                type: 'paragraph',
                text: 'Block 2 (Position 1)',
              },
            ],
          },
        ],
      },
      initialData,
      serverURL,
    })

    // Check that the block has been removed
    expect(merge2.layout).toHaveLength(1)
    expect(merge2.layout[0].id).toEqual(block2ID)
    expect(merge2.layout[0].richText[0].text).toEqual('Block 2 (Position 1)')

    // Remove the last block to ensure that all blocks can be cleared
    const merge3 = await mergeData({
      depth: 1,
      fieldSchema: schemaJSON,
      incomingData: {
        ...initialData,
        layout: [],
      },
      initialData,
      serverURL,
    })

    // Check that the block has been removed
    expect(merge3.layout).toHaveLength(0)
  })
})
