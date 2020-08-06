import React from 'react'
import CartIcon from '../../Icons/CartIcon'

import styles from './cart-button.module.css'

interface Props {
  count: number
}
const CartButton = ({count = 0}: Props) => {
  return (
    <button className={styles.button}>
      <div className={styles.container}>
        <span className={styles.counter}>{count}</span>
        <CartIcon></CartIcon>
      </div>
    </button>
  )
}

export default CartButton
