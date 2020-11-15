import React, { useState } from 'react'

import styles from './CheckboxList.module.css'
import Checkbox from './Checkbox'
import { useFilterContext } from 'src/context/FilterContext/FilterContext'

interface Props {
  title: string
  checkboxList: { [key: string]: number }
}
const CheckboxList: React.FC<Props> = ({ title, checkboxList }: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { filterState } = useFilterContext()

  const checkIsChecked = (category: string, value: string) => {
    if (!filterState.hasOwnProperty(category)) {
      return false
    } else if (filterState[category].includes(value)) {
      return true
    } else {
      return false
    }
  }
  return (
    <div className={styles.checkboxListContainer}>
      <label className={styles.title}>{title}s</label>
      {Object.keys(checkboxList).length > 10 ? (
        <input
          value={searchTerm}
          className={styles.input}
          type="search"
          placeholder={`Search ${title}`}
          aria-label={`search in ${title}s`}
          onChange={e => setSearchTerm(e.currentTarget.value)}
        ></input>
      ) : (
        <div className={styles.space}></div>
      )}
      <div className={styles.list}>
        {Object.keys(checkboxList).map((e: string) => {
          if (e.toLowerCase().includes(searchTerm.toLowerCase())) {
            return (
              <Checkbox
                checked={checkIsChecked(title, e)}
                key={e}
                value={e}
                category={title}
                count={checkboxList[e]}
              ></Checkbox>
            )
          } else null
        })}
      </div>
    </div>
  )
}

export default CheckboxList
