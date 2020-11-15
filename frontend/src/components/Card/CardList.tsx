import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'
import { useQuery } from 'react-query'
import NotFoundIcon from '../Icons/NotFoundIcon'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import CardSkeleton from './CardSkeleton'

import { useUserContext } from 'src/context/UserContext/UserContext'

const CardList: React.FC = () => {
  const router = useRouter()

  const { userState, addOneToCart, removeOneFromCart } = useUserContext()

  const { isLoading, error, data, refetch, isFetching } = useQuery('productsData', () =>
    fetch(`http://localhost:3001/product${router.asPath}`).then(res => res.json()),
  )

  useEffect(() => {
    if (router.route !== '/') return
    refetch()
  }, [router.query])

  if (error) return <div>'An error has occurred: ' + error.message</div>
  if (data && !data.products?.length) return <NotFoundIcon text="Product not found" />

  const checkIsInCart = (id: string) => {
    if (userState) {
      if (userState.shoppingCart.includes(id)) return true
    } else {
      if (window.localStorage.getItem('cart')?.includes(id + ',')) return true
    }

    return false
  }
  return (
    <>
      <div className={styles.container} aria-label="product list">
        {isLoading || isFetching ? (
          Array.from({ length: 10 }).map((e, i) => {
            return <CardSkeleton key={i} />
          })
        ) : (
          <AnimatePresence>
            {data.products.map((e: any, i: number) => {
              return (
                <motion.div key={e._id} animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
                  <Card
                    id={e._id}
                    name={e.Name}
                    price={e.Price}
                    image={e.Images[0]}
                    imageIsLazy={i > 5 ? 'lazy' : 'eager'}
                    addOneToCart={addOneToCart}
                    removeOneFromCart={removeOneFromCart}
                    isInCart={checkIsInCart(e._id)}
                  ></Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        )}
      </div>
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
