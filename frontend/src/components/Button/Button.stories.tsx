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
  <Button icon={<UserIcon iconWidth="36" iconHeight="36"></UserIcon>}></Button>
)

export const Cart = () => (
  <Button
    bgColor="bg-secondary"
    icon={<CartIcon iconWidth="20" iconHeight="20" />}
    badge={<ButtonBadge count={5} />}
  ></Button>
)
