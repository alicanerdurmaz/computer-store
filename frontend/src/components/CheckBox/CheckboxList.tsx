import React from 'react'

import styles from './CheckboxList.module.css'

interface Props {
  children: React.ReactNode
  title: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const CheckboxList: React.FC<Props> = ({
  value,
  onChange,
  children,
  title,
}: Props) => {
  return (
    <div className={styles.checkboxListContainer}>
      <label className={styles.title}>{title}s</label>
      <input
        value={value}
        className={styles.input}
        type="search"
        placeholder={`Search ${title}`}
        aria-label={`search in ${title}s`}
        onChange={onChange}
      ></input>
      <div className={styles.list}>{children}</div>
    </div>
  )
}

export default CheckboxList
