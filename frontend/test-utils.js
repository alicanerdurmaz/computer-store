import React from 'react'
import { render } from '@testing-library/react'
import { FilterProvider } from './src/context/FilterContext/FilterContext'

const AllTheProviders = ({ children }) => {
  return <FilterProvider>{children}</FilterProvider>
}

const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
