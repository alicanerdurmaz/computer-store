import React from 'react'
import user from '@testing-library/user-event'
// @ts-ignore
import { render } from 'test-utils'

import Checkbox from './Checkbox'

test('checkbox renders properly, state works', () => {
  const testData = { value: 'test', count: 5, category: 'test' }
  const { getByLabelText, getByText } = render(
    <Checkbox value={testData.value} count={testData.count} category={testData.category} />,
  )

  const checkbox = getByLabelText(/test/i) as HTMLInputElement
  expect(checkbox.getAttribute('aria-checked')).toBe('false')

  expect(checkbox.name).toBe(testData.value)
  expect(getByText(/test/i)).toHaveTextContent(testData.value)
  expect(getByText(/5/i)).toHaveTextContent(testData.count.toString())

  user.click(checkbox)
  expect(checkbox.getAttribute('aria-checked')).toBe('true')
  user.click(checkbox)
  expect(checkbox.getAttribute('aria-checked')).toBe('false')
})
