import React from 'react'

import styles from './Checkbox.module.css'

interface Props {
  value: string
  isChecked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Checkbox: React.FC<Props> = ({ value, onChange, isChecked }: Props) => {
  return (
    <label className={styles.label}>
      <input
        aria-checked={isChecked}
        className={styles.input}
        type="checkbox"
        name={value}
        checked={isChecked}
        onChange={onChange}
      />
      <span className={styles.text}>{value}</span>
    </label>
  )
}

export default Checkbox
