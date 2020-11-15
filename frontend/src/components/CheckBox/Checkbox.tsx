import React, { useEffect, useState } from 'react'
import styles from './Checkbox.module.css'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'

interface Props {
  value: string
  count: number
  category: string
  checked: boolean
}
const Checkbox: React.FC<Props> = ({ value, count, category, checked }: Props) => {
  const { filterDispatch } = useFilterContext()

  const onChangeHandler = () => {
    if (checked) {
      filterDispatch({ type: 'delete', payload: { category, value } })
    } else {
      filterDispatch({ type: 'add', payload: { category, value } })
    }
  }

  return (
    <label className={styles.label}>
      <input
        aria-checked={checked}
        className={styles.input}
        type="checkbox"
        name={value}
        checked={checked}
        onChange={onChangeHandler}
      />
      <div className={styles.info}>
        <span className={styles.text} title={value}>
          {value}
        </span>
        <span className={styles.count}>({count})</span>
      </div>
    </label>
  )
}

export default Checkbox
