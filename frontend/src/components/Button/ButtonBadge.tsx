import React from 'react'

import styles from './ButtonBadge.module.css'

interface Props {
  count: number
}
const ButtonBadge = ({ count }: Props) => {
  return (
    <div className={styles.container}>
      <span className={styles.counter}>{count}</span>
    </div>
  )
}

export default ButtonBadge
