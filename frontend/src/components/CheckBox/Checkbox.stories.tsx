import React from 'react'
import { withKnobs, number } from '@storybook/addon-knobs'
import Checkbox from './Checkbox'
import CheckboxList from './CheckboxList'

export default {
  component: Checkbox,
  title: 'Checkbox',
  decorators: [withKnobs],
}

export const Default = () => {
  return <Checkbox checked={true} category="Manufacturer" value="Asus" count={12} />
}

export const List = () => {
  return <CheckboxList title="Manufacturer" checkboxList={getData()}></CheckboxList>
}

function getData() {
  return {
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
  }
}
