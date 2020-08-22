import React, { useState, useEffect } from 'react'

import styles from './Checkbox.module.css'
import { useRouter } from 'next/router'
import { addToQuery, deleteFromQuery } from '../../utils/changeQuery'

interface Props {
  value: string
  count: number
  category: string
}
const Checkbox: React.FC<Props> = ({ value, count, category }: Props) => {
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  const onChangeHandler = () => {
    if (checked) {
      router.push(deleteFromQuery(router.query, category, value), undefined, { shallow: true })
      setChecked(false)
    } else {
      router.push(addToQuery(router.query, category, value), undefined, { shallow: true })
      setChecked(true)
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
