import React from 'react'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'
import styles from './Dropdown.module.css'

const Dropdown = () => {
  const { filterDispatch } = useFilterContext()
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    filterDispatch({
      type: 'toggle',
      payload: {
        category: 'sort',
        value: event.currentTarget.value,
      },
    })
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
