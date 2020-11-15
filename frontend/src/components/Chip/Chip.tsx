import React from 'react'

import styles from './Chip.module.css'

interface Props {
  category: string
  value: string
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  leftIcon?: any
}
const Chip = ({ category, value, onClick, leftIcon }: Props) => {
  return (
    <div className={styles.container}>
      {leftIcon && (
        <div className={styles.button} aria-label="delete" onClick={onClick}>
          {leftIcon}
        </div>
      )}

      <div className={styles.text}>
        <div className={styles.category}>{category}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  )
}

export default Chip
