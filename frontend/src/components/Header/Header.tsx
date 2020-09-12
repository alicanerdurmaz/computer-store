import React, { useState } from 'react'

import styles from './Header.module.css'

import Logo from '../Logo/Logo'
import SearchBar from '../SearchBar/SearchBar'
import IconButton from '../Button/IconButton'
import UserIcon from '../Icons/UserIcon'
import CartIcon from '../Icons/CartIcon'
import ButtonBadge from '../Button/ButtonBadge'
import Link from 'next/link'
import { useUserContext } from 'src/context/UserContext'
import Button from '../Button/Button'
import { useRouter } from 'next/router'

interface Props {}
const Header: React.FC<Props> = ({}: Props) => {
  const router = useRouter()
  const { userState, dispatchUserState, setAccessToken } = useUserContext()

  const logout = () => {
    dispatchUserState({
      type: 'delete',
      payload: null,
    })
    setAccessToken(null)
  }
  return (
    <div className={styles.header}>
      <Logo className={styles.logo}></Logo>

      <SearchBar className={styles.search}></SearchBar>

      <div className={styles.btn_group}>
        {userState ? (
          <div className={styles.btn_user}>
            <IconButton text={userState.name} icon={<UserIcon iconWidth="24" iconHeight="24"></UserIcon>}></IconButton>
            <div onClick={logout} className={styles.btn_logout}>
              Do you wanna Log Out ?
            </div>
          </div>
        ) : (
          <Link href="/auth">
            <a>
              <Button className={styles.btn_login}>
                Log In <span style={{ color: 'var(--c-primary' }}>or</span> Sign Up
              </Button>
            </a>
          </Link>
        )}
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
