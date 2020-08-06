import React from 'react'

import styles from './icon.module.css'

interface Props {
  w?: string
  h?: string
}
const CartIcon = ({w = '24', h = '24'}: Props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      data-icon="shopping-cart"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 20"
      className={styles.icon}
      height={h}
      width={w}
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 3c0 .55.45 1 1 1h1l3.6 7.59-1.35 2.44C4.52 15.37 5.48 17 7 17h11c.55 0 1-.45 1-1s-.45-1-1-1H7l1.1-2h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.37-.66-.11-1.48-.87-1.48H5.21l-.67-1.43c-.16-.35-.52-.57-.9-.57H2c-.55 0-1 .45-1 1zm16 15c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  )
}

export default CartIcon
