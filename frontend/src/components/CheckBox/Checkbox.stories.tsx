import React from 'react'

import Checkbox from './Checkbox'

export default {
  component: Checkbox,
  title: 'Checkbox',
}

export const Default = () => (
  <Checkbox
    label="Asus"
    onChange={e => {
      console.log(e.currentTarget.name, e.currentTarget.checked)
    }}
  />
)
