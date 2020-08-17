import React from 'react'

import styles from './Chip.module.css'
interface Props {
  category: string
  value: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Chip = ({ category, value, onClick }: Props) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} aria-label="delete" onClick={onClick}>
        ❌
      </button>
      <div className={styles.text}>
        <div className={styles.category}>{category}</div>
        <div className={styles.value}>{value.replace(',', ' - ')}</div>
      </div>
    </div>
  )
}

export default Chip
