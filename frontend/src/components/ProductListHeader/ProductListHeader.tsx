import React, { useEffect } from 'react'
import { useFilterContext } from '../../context/FilterContext/FilterContext'

import styles from './ProductListHeader.module.css'
import Chip from '../Chip/Chip'

const sliders = ['Price', 'Weight']

const ProductListHeader = () => {
  const { filterState, filterDispatch } = useFilterContext()

  const onClickHandler = (category: string, value: string, dispatchType: string) => {
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

  if (Object.keys(filterState).length < 1) {
    return null
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
