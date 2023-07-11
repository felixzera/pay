import type { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'shopPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Shop page',
    },
  ],
}
