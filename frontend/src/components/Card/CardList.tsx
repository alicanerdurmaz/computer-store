import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner'
import NotFoundIcon from '../Icons/NotFoundIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'

const CardList: React.FC = () => {
  const router = useRouter()

  const { isLoading, error, data, refetch, isFetching } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${router.asPath}`).then(res => res.json()),
  )

  useEffect(() => {
    console.log(router.asPath)
    refetch()
  }, [router.query])

  if (error) return <div>'An error has occurred: ' + error.message</div>
  if (data && !data.products.length) return <NotFoundIcon text="Product not found" />

  return (
    <>
      {isLoading || isFetching ? (
        <Spinner />
      ) : (
        <AnimatePresence>
          <div className={styles.container} aria-label="product list">
            {data.products.map((e: any, i: number) => {
              return (
                <motion.div key={e._id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  <Card name={e.Name} price={e.Price} image={e.Images[0]} imageIsLazy={i > 5 ? 'lazy' : 'eager'}></Card>
                </motion.div>
              )
            })}
          </div>
        </AnimatePresence>
      )}
      <div className={styles.pagination_container}>
        {Array.from({ length: data?.numberOfPages }).map((e, i) => {
          const pageNumber = i + 1
          return (
            <button
              // className={page === pageNumber ? styles.button_selected : styles.button_not_selected}
              aria-label="page number"
              key={pageNumber}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
                // setPage(pageNumber)
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
