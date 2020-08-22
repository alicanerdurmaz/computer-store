import React from 'react'
import styles from './Dropdown.module.css'
import { addToQuery } from 'src/utils/changeQuery'
import { useRouter } from 'next/router'

const Dropdown = () => {
  const router = useRouter()
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(addToQuery(router.query, 'sort', event.currentTarget.value), undefined, { shallow: true })
  }
  return (
    <label className={styles.title}>
      Sort by
      <select className={styles.select} onChange={e => handleChangeSelect(e)}>
        <option value="-Price" className={styles.option}>
          Highest Price
        </option>
        <option value="Price" className={styles.option}>
          Lowest Price
        </option>
      </select>
    </label>
  )
}

export default Dropdown
