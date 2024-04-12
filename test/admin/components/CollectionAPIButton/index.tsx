import type { CustomComponent } from 'payload/config'

import React from 'react'

const baseClass = 'collection-api-button'

export const CollectionAPIButton: CustomComponent = () => {
  return (
    <div
      className={baseClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'calc(var(--base) / 4)',
      }}
    >
      <p className="nav__label" style={{ color: 'var(--theme-text)', margin: 0 }}>
        Collection API Button
      </p>
    </div>
  )
}
