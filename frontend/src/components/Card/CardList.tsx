import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useQuery } from 'react-query'
import Spinner from '../Spinner/Spinner'
import NotFoundIcon from '../Icons/NotFoundIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { addToQuery } from 'src/utils/changeQuery'

const CardList: React.FC = () => {
  const router = useRouter()

  const { isLoading, error, data, refetch, isFetching } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${router.asPath}`).then(res => res.json()),
  )

  useEffect(() => {
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
                  <Card
                    id={e._id}
                    name={e.Name}
                    price={e.Price}
                    image={e.Images[0]}
                    imageIsLazy={i > 5 ? 'lazy' : 'eager'}
                  ></Card>
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
              className={styles.button_not_selected}
              aria-label="page number"
              key={pageNumber}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
                router.push(addToQuery(router.query, 'page', pageNumber.toString()), undefined, { shallow: true })
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
