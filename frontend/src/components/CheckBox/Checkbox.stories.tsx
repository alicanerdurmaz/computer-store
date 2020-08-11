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
  return <Checkbox value="Asus" count={12} />
}

export const List = () => {
  return (
    <div
      style={{
        width: '200px',
      }}
    >
      <CheckboxList title="Brand" checkboxList={getData()}></CheckboxList>
    </div>
  )
}

function getData() {
  return [
    {
      name: 'Asus',
      count: 39,
    },
    {
      name: 'Acer',
      count: 39,
    },
    {
      name: 'Razer',
      count: 14,
    },
    {
      name: 'MSI',
      count: 41,
    },
    {
      name: 'HP',
      count: 38,
    },
    {
      name: 'Apple',
      count: 12,
    },
    {
      name: 'Gigabyte',
      count: 24,
    },
  ]
}
