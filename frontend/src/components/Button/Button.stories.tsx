import React from 'react'

import Button from './Button'

import UserIcon from '../Icons/UserIcon'
import CartIcon from '../Icons/CartIcon'
import ButtonBadge from './ButtonBadge'

export default {
  component: Button,
  title: 'Button',
}

export const User = () => (
  <Button text="User Full Name" icon={<UserIcon iconWidth="24" iconHeight="24"></UserIcon>}></Button>
)

export const Cart = () => (
  <Button
    bgColor="bg-secondary"
    icon={<CartIcon iconWidth="30" iconHeight="30" />}
    badge={<ButtonBadge count={5} />}
  ></Button>
)
