import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Checkbox from './Checkbox'
import CheckboxList from './CheckboxList'

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [withKnobs],
}

export const Default = () => (
  <Checkbox
    label="Asus"
    onChange={e => {
      console.log(e.currentTarget.name, e.currentTarget.checked)
    }}
  />
)

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

export const List = () => (
  <div
    style={{
      width: '200px',
    }}
  >
    <CheckboxList title="Brands">
      {Brands.slice(
        0,
        number(`list-length (${Brands.length})`, Brands.length),
      ).map(e => (
        <Checkbox
          key={e}
          label={e}
          onChange={e => {
            console.log(e.currentTarget.name, e.currentTarget.checked)
          }}
        />
      ))}
    </CheckboxList>
  </div>
)
