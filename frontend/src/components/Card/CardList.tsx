import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

const CardList: React.FC = () => {
  const { searchTerm, filterState, sortBy } = useFilterContext()
  const [filters, setFilters] = useState('')

  const { isLoading, error, data } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${filters}`).then(res => res.json()),
  )

  useEffect(() => {
    const getFiltersQuery = () => {
      let filtersQuery = '?'
      Object.keys(filterState).forEach((e: any) => {
        filtersQuery += '&' + e + '=' + filterState[e].toString()
      })

      if (searchTerm.length > 3) filtersQuery += `&search=${searchTerm}`
      if (sortBy) filtersQuery += `&sort=${sortBy}`

      return filtersQuery
    }

    setFilters(getFiltersQuery())
  }, [searchTerm, filterState, sortBy])

  if (isLoading) return <div>'Loading...'</div>
  if (error) return <div>'An error has occurred: ' + error.message</div>

  return (
    <div className={styles.container}>
      {Array.from({ length: 50 }).map((e, i) => {
        return <Card key={i}></Card>
      })}

      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default CardList
