import { buildConfigWithDefaults } from '../buildConfigWithDefaults'
import Categories from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { seed } from './seed'
import { mobileBreakpoint } from './shared'
import { formatLivePreviewURL } from './utilities/formatLivePreviewURL'

export default buildConfigWithDefaults({
  admin: {
    livePreview: {
      // You can define any of these properties on a per collection or global basis
      // The Live Preview config cascades from the top down, properties are inherited from here
      url: formatLivePreviewURL,
      breakpoints: [mobileBreakpoint],
      collections: ['pages', 'posts'],
      globals: ['header', 'footer'],
    },
  },
  cors: ['http://localhost:3001'],
  csrf: ['http://localhost:3001'],
  collections: [Users, Pages, Posts, Tenants, Categories, Media],
  globals: [Header, Footer],
  onInit: seed,
})
