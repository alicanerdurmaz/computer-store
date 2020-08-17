import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'

const CardList = () => {
  const { searchTerm, filterState } = useFilterContext()

  useEffect(() => {
    const filters = { ...searchTerm, ...filterState }
  }, [searchTerm, filterState])

  return (
    <div className={styles.container}>
      {Array.from({ length: 50 }).map((e, i) => {
        return <Card key={i}></Card>
      })}
    </div>
  )
}

export default CardList
