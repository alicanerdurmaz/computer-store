import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useFilterContext } from '../../context/FilterContext/FilterContext'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner'
import NotFoundIcon from '../Icons/NotFoundIcon'

function getFiltersQuery(filterState: any, sortBy: any, searchTerm: string, page: number) {
  let filtersQuery = `?page=${page}`
  Object.keys(filterState).forEach((e: any) => {
    filtersQuery += '&' + e + '=' + filterState[e].toString()
  })

  if (searchTerm.length > 3) filtersQuery += `&search=${searchTerm}`
  if (sortBy) filtersQuery += `&sort=${sortBy}`

  return filtersQuery
}

const CardList: React.FC = () => {
  const { searchTerm, filterState, sortBy } = useFilterContext()
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState(getFiltersQuery(filterState, sortBy, searchTerm, page))

  const { isLoading, error, data, refetch, isFetching } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${filters}`).then(res => res.json()),
  )

  useEffect(() => {
    setFilters(getFiltersQuery(filterState, sortBy, searchTerm, page))
  }, [searchTerm, filterState, sortBy, page])

  useEffect(() => {
    refetch()
    window.history.pushState(undefined, 'Computer Store', filters)
  }, [filters])

  if (error) return <div>'An error has occurred: ' + error.message</div>
  if (data && !data.products.length) return <NotFoundIcon text="Product not found" />

  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.container} aria-label="product list">
          {data.products.map((e: any, i: number) => {
            return (
              <Card
                key={e._id}
                name={e.Name}
                price={e.Price}
                image={e.Images[0]}
                imageIsLazy={i > 5 ? 'lazy' : 'eager'}
              ></Card>
            )
          })}
        </div>
      )}
      <div className={styles.pagination_container}>
        {Array.from({ length: data?.numberOfPages }).map((e, i) => {
          const pageNumber = i + 1
          return (
            <button
              className={page === pageNumber ? styles.button_selected : styles.button_not_selected}
              aria-label="page number"
              key={pageNumber}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
                setPage(pageNumber)
              }}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
    </>
  )
}

export default CardList
