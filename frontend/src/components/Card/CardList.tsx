import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'

function getFiltersQuery(filterState: any, sortBy: any, searchTerm: string) {
  let filtersQuery = '?'
  Object.keys(filterState).forEach((e: any) => {
    filtersQuery += '&' + e + '=' + filterState[e].toString()
  })

  if (searchTerm.length > 3) filtersQuery += `&search=${searchTerm}`
  if (sortBy) filtersQuery += `&sort=${sortBy}`

  return filtersQuery
}

const CardList: React.FC = () => {
  const { searchTerm, filterState, sortBy } = useFilterContext()
  const [filters, setFilters] = useState(getFiltersQuery(filterState, sortBy, searchTerm))

  const { isLoading, error, data, refetch } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${filters}`).then(res => res.json()),
  )
  useEffect(() => {
    console.log(data)
  }, [data])
  useEffect(() => {
    setFilters(getFiltersQuery(filterState, sortBy, searchTerm))
  }, [searchTerm, filterState, sortBy])

  useEffect(() => {
    refetch()
  }, [filters])

  if (isLoading) return <div>'Loading...'</div>
  if (error) return <div>'An error has occurred: ' + error.message</div>

  return (
    <div className={styles.container}>
      {data.products.map((e: any) => {
        return <Card key={e._id} name={e.Name} price={e.Price} image={e.Images[0]}></Card>
      })}

      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}

export default CardList
