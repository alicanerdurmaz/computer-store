import React from 'react'

import IconButton from './IconButton'
import UserIcon from '../Icons/UserIcon'

export default {
  component: IconButton,
  title: 'IconButton',
}

export const Default = () => (
  <IconButton>
    <UserIcon></UserIcon>
  </IconButton>
)
