import React from 'react'

import IconButton from './IconButton'

import UserIcon from '../Icons/UserIcon'
import CartIcon from '../Icons/CartIcon'
import ButtonBadge from './ButtonBadge'
import Button from './Button'

export default {
  component: Button,
  title: 'Button',
}
export const Default = () => {
  return <Button>Login</Button>
}
export const User = () => (
  <IconButton text="UserFullName" icon={<UserIcon iconWidth="24" iconHeight="24"></UserIcon>}></IconButton>
)

export const Cart = () => (
  <IconButton
    bgColor="bg-secondary"
    icon={<CartIcon iconWidth="30" iconHeight="30" />}
    badge={<ButtonBadge count={5} />}
  ></IconButton>
)
