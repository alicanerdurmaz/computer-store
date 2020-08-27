import React from 'react'

import styles from './Header.module.css'

import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import IconButton from '../Button/IconButton'
import UserIcon from '../Icons/UserIcon'
import CartIcon from '../Icons/CartIcon'
import ButtonBadge from '../Button/ButtonBadge'
import Link from 'next/link'

interface Props {}
const Header: React.FC<Props> = ({}: Props) => {
  return (
    <div className={styles.header}>
      <Logo className={styles.logo}></Logo>

      <SearchBar className={styles.search}></SearchBar>

      <div className={styles.btn_group}>
        <Link href="/auth">
          <a>
            <IconButton
              text="Alican&nbsp;Erdurmaz"
              icon={<UserIcon iconWidth="24" iconHeight="24"></UserIcon>}
            ></IconButton>
          </a>
        </Link>
        <IconButton
          bgColor="bg-secondary"
          icon={<CartIcon iconWidth="30" iconHeight="30" />}
          badge={<ButtonBadge count={0} />}
        ></IconButton>
      </div>
    </div>
  )
}

export default Header
