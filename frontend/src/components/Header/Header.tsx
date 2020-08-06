import React from 'react'

import cx from 'classnames'
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
      <Logo className={styles.logo}></Logo>

      <SearchBar className={styles.search}></SearchBar>

      <div className={styles.btn_group}>
        <Button
          text="Alican&nbsp;Erdurmaz"
          icon={<UserIcon iconWidth="24" iconHeight="24"></UserIcon>}
        ></Button>
        <Button
          bgColor="bg-secondary"
          icon={<CartIcon iconWidth="30" iconHeight="30" />}
          badge={<ButtonBadge count={0} />}
        ></Button>
      </div>
    </div>
  )
}

export default Header
