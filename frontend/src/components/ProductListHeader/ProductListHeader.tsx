import React, { useEffect } from 'react'

import styles from './ProductListHeader.module.css'
import Chip from '../Chip/Chip'
import { AnimatePresence, motion } from 'framer-motion'

const sliders = ['Price', 'Weight']
const ProductListHeader = () => {
  return (
    <AnimatePresence>
      {/* {Object.keys(filterState).length < 1 ? null : (
        <motion.div
          className={styles.container}
          exit={{ opacity: 0, x: 1250 }}
          transition={{ delay: 0, duration: 0.25 }}
        >
          {Object.keys(filterState).map((e: any) => {
            if (sliders.includes(e)) {
              return (
                <Chip
                  aria-label={`select ${filterState[e]}`}
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
        </motion.div>
      )} */}
    </AnimatePresence>
  )
}

export default ProductListHeader
