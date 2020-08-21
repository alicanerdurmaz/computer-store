import React from 'react'
import user from '@testing-library/user-event'
import { render, waitForElementToBeRemoved, screen } from 'test-utils'

import CardList from './CardList'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'

test('test list renders properly, ', async () => {
  const { debug, getByLabelText } = render(<CardList />)

  expect(getByLabelText(/loading/i)).toBeInTheDocument()

  await waitForElementToBeRemoved(() => getByLabelText(/loading/i))
})
