import React from 'react'

import styles from './Checkbox.module.css'

interface Props {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Checkbox: React.FC<Props> = ({ label, onChange }: Props) => {
  return (
    <label className={styles.label}>
      <input
        className={styles.input}
        type="checkbox"
        name={label}
        onChange={onChange}
      />
      <span className={styles.text}>{label}</span>
    </label>
  )
}

export default Checkbox
