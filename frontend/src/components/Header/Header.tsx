import React from 'react'

import styles from './Header.module.css'
import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import Button from '../Button/Button'
import UserIcon from '../Icons/UserIcon'
import CartIcon from '../Icons/CartIcon'
import ButtonBadge from '../Button/ButtonBadge'

interface Props {}
const Header: React.FC<Props> = ({}: Props) => {
  return (
    <div className={styles.header}>
      <Logo></Logo>

      <SearchBar></SearchBar>

      <Button
        icon={<UserIcon iconWidth="36" iconHeight="36"></UserIcon>}
      ></Button>

      <Button
        bgColor="bg-secondary"
        icon={<CartIcon iconWidth="20" iconHeight="20" />}
        badge={<ButtonBadge count={5} />}
      ></Button>
    </div>
  )
}

export default Header
