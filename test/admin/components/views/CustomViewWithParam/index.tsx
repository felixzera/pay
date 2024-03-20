import { Button } from '@payloadcms/ui/elements/Button'
import LinkImport from 'next/link.js'
import React from 'react'

import type { AdminViewProps } from '../../../../../packages/payload/types.js'

const Link = (LinkImport.default || LinkImport) as unknown as typeof LinkImport.default

import {
  customParamViewPath,
  customParamViewPathBase,
  customParamViewTitle,
} from '../../../shared.js'

export const CustomViewWithParam: React.FC<AdminViewProps> = ({ initPageResult, params }) => {
  const {
    req: {
      payload: {
        config: {
          routes: { admin: adminRoute },
        },
      },
    },
  } = initPageResult

  const paramValue = params?.segments?.[1]

  return (
    <div
      style={{
        marginTop: 'calc(var(--base) * 2)',
        paddingLeft: 'var(--gutter-h)',
        paddingRight: 'var(--gutter-h)',
      }}
    >
      <h1 id="custom-view-title">{customParamViewTitle}</h1>
      <p>This custom view is using a dynamic URL parameter `ID: {paramValue || 'None'}`</p>
      <p>
        This custom view is not `exact` true, so it matches on `{customParamViewPathBase}` we well
        as `{customParamViewPath}`
      </p>
      <div className="custom-view__controls">
        <Button Link={Link} buttonStyle="secondary" el="link" to={`${adminRoute}`}>
          Go to Dashboard
        </Button>
        &nbsp; &nbsp; &nbsp;
        <Button
          Link={Link}
          buttonStyle="secondary"
          el="link"
          to={`${adminRoute}/${customParamViewPathBase}${!paramValue ? '/123' : ''}`}
        >
          {`Go To ${paramValue ? 'Child' : 'Parent'} Param View`}
        </Button>
      </div>
    </div>
  )
}
