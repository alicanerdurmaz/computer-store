import React, { useEffect } from 'react'
import { useFilterContext } from '../../context/FilterContext/FilterContext'

import styles from './ProductListHeader.module.css'
import Chip from '../Chip/Chip'
import Button from '../Button/Button'

const sliders = ['Price', 'Weight']
const ProductListHeader = () => {
  const { filterState, filterDispatch } = useFilterContext()
  useEffect(() => {
    console.log(filterState)
  })

  const onClickHandler = (category: string, value: string, dispatchType: string) => {
    console.log(category, value, dispatchType)

    filterDispatch({
      type: dispatchType,
      payload: {
        category,
        value,
      },
    })
  }
  const deleteFilters = () => {
    filterDispatch({
      type: 'delete-all',
    })
  }

  return (
    <div className={styles.container}>
      {Object.keys(filterState).map((e: any) => {
        if (!filterState[e]) return null

        if (sliders.includes(e)) {
          return (
            <Chip
              key={filterState[e]}
              category={e}
              value={filterState[e]}
              onClick={() => onClickHandler(e, filterState[e], 'delete-string')}
            ></Chip>
          )
        } else {
          return filterState[e].map((v: any) => {
            console.log(v)
            return <Chip key={v} category={e} value={v} onClick={() => onClickHandler(e, v, 'delete')}></Chip>
          })
        }
      })}
      <button className={styles.button} aria-label="delete filters" onClick={deleteFilters}>
        Delete Filters
      </button>
    </div>
  )
}

export default ProductListHeader
