import React from 'react'
import { addDecorator } from '@storybook/react'

import Router from 'next/router'
import { RouterContext } from 'next/dist/next-server/lib/router-context'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

import '../styles/app.css'
import './storybook.css'

addDecorator(Story => {
  Router.router = {
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
    push: () => {},
    prefetch: () => new Promise((resolve, reject) => {}),
  }
  return (
    <RouterContext.Provider value={Router.router}>
      <div style={{ width: 'max-content', padding: '1rem' }}>
        <Story />
      </div>
    </RouterContext.Provider>
  )
})
