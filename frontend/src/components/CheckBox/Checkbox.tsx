import React, { useState } from 'react'

import styles from './Checkbox.module.css'

interface Props {
  value: string
  count: number
}
const Checkbox: React.FC<Props> = ({ value, count }: Props) => {
  const [checked, setChecked] = useState(false)
  return (
    <label className={styles.label}>
      <input
        aria-checked={checked}
        className={styles.input}
        type="checkbox"
        name={value}
        checked={checked}
        onChange={e => setChecked(!checked)}
      />
      <div className={styles.info}>
        <span className={styles.text}>{value}</span>
        <span className={styles.count}>({count})</span>
      </div>
    </label>
  )
}

export default Checkbox
