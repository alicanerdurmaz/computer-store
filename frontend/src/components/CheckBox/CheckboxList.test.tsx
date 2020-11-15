import React from 'react'
import user from '@testing-library/user-event'
import { render } from '@testing-library/react'

import CheckboxList from './CheckboxList'
import { FilterContextProvider } from 'src/context/FilterContext/FilterContext'

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(() => null),
  })),
}))

const Wrapper: React.FC = ({ children }) => {
  return <FilterContextProvider>{children}</FilterContextProvider>
}

test('checkbox list renders properly, ', () => {
  const data = listTestData()
  const { getAllByRole, getByText, getByRole, queryByPlaceholderText, rerender } = render(
    <Wrapper>
      <CheckboxList title={data.title} checkboxList={data.list} />
    </Wrapper>,
  )

  expect(getByText(data.title + 's')).toBeInTheDocument()
  expect(getAllByRole('checkbox').length).toEqual(Object.keys(data.list).length)
  expect(getByRole('searchbox')).toBeInTheDocument()

  rerender(
    <Wrapper>
      <CheckboxList title={data.title} checkboxList={{ Asus: 30 }} />
    </Wrapper>,
  )
  expect(queryByPlaceholderText(/search/i)).not.toBeInTheDocument()
})

test('checkbox list search, ', () => {
  const data = listTestData()
  const { getAllByRole, queryByPlaceholderText, queryAllByRole } = render(
    <Wrapper>
      <CheckboxList title={data.title} checkboxList={data.list} />
    </Wrapper>,
  )

  const input = queryByPlaceholderText(/search/i) as HTMLInputElement

  user.type(input, 'Asus')
  expect(getAllByRole('checkbox').length).toEqual(1)

  user.type(input, 'fffffffffffffff')
  expect(queryAllByRole('checkbox').length).toEqual(0)

  user.clear(input)
  expect(getAllByRole('checkbox').length).toEqual(Object.keys(data.list).length)
})

function listTestData() {
  return {
    title: 'Test',
    list: {
      Asus: 39,
      Acer: 39,
      Razer: 14,
      MSI: 41,
      HP: 18,
      Apple: 10,
      Gigabyte: 5,
      Lenovo: 30,
      Microsoft: 24,
      Dell: 9,
      Aorus: 3,
      Samsung: 6,
    },
  }
}
