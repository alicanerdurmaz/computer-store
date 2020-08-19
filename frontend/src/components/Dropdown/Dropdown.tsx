import React from 'react'
import styles from './Dropdown.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'

const Dropdown = () => {
  const { setSortBy } = useFilterContext()

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.currentTarget.value)
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
