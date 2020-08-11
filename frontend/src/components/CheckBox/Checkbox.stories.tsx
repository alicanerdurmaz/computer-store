import React, { useState } from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Checkbox from './Checkbox'
import CheckboxList from './CheckboxList'

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [withKnobs],
}

export const Default = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox
      value="Asus"
      isChecked={checked}
      onChange={e => {
        setChecked(!checked)
      }}
    />
  )
}

const Brands = [
  'Samsung',
  'Aorus',
  'Asus',
  'Acer',
  'Razer',
  'MSI',
  'HP',
  'Apple',
  'Gigabyte',
  'Lenovo',
  'Microsoft',
  'Dell',
  'Samsung',
  'Aorus',
  'Asus',
  'Acer',
  'Razer',
  'MSI',
  'HP',
  'Apple',
  'Gigabyte',
  'Lenovo',
  'Microsoft',
  'Dell',
]

const initCheckList = (): Record<string, boolean> => {
  let newMap: Record<string, boolean> = {}
  Brands.forEach(e => {
    newMap[e] = false
  })
  return newMap
}

export const List = () => {
  const [checkList, setCheckList] = useState(initCheckList())
  const [searchTerm, setSearchTerm] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckList({ ...checkList, [event.target.name]: event.target.checked })
  }

  return (
    <div
      style={{
        width: '200px',
      }}
    >
      <CheckboxList value={searchTerm} title="Brand" onChange={e => setSearchTerm(e.currentTarget.value)}>
        {Brands.slice(0, number(`list-length (${Brands.length})`, Brands.length))
          .filter(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((e, i) => (
            <Checkbox
              key={i}
              value={e}
              isChecked={checkList.e}
              onChange={e => {
                handleChange(e)
              }}
            />
          ))}
      </CheckboxList>
    </div>
  )
}
