import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from '../../src/components/Image/Image'
import styles from './product-page.module.css'
import Link from 'next/link'
import ErrorPage from 'next/error'
import { motion, AnimatePresence } from 'framer-motion'
import { stagger, fadeInUp } from 'src/components/Animations/Animations'
interface Props {
  product: any
}

const specFilter = ['Part', 'Type', 'Images', 'SellerName', 'Seller', 'Name', '_id']
const Product = ({ product }: Props) => {
  const { isFallback } = useRouter()

  if (!isFallback && !product?._id) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <div className={styles.container}>
      {isFallback ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <motion.div className={styles.summary_container} initial="initial" animate="animate">
            <motion.div
              style={{ overflow: 'hidden', background: 'white' }}
              className={styles.image_container}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
            >
              <motion.img
                key={'1'}
                animate={{ x: 0, opacity: 1 }}
                initial={{ x: 300, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0 }}
                className={styles.img}
                loading="lazy"
                src={product.Images[0]}
                alt="notebook image"
              ></motion.img>
            </motion.div>
            <motion.div variants={stagger} className={styles.info_container}>
              <Link href={`/?&Manufacturer=${product.Manufacturer}`}>
                <motion.div variants={fadeInUp}>
                  <a className={styles.link}>{product.Manufacturer}</a>
                </motion.div>
              </Link>
              <motion.h1 variants={fadeInUp} className={styles.name}>
                {product.Name}
              </motion.h1>
              <motion.div variants={fadeInUp} className={styles.seller}>
                <motion.span variants={fadeInUp}>Seller:&nbsp;</motion.span>
                <Link href={`/`}>
                  <a className={styles.link}>{product.SellerName}</a>
                </Link>
              </motion.div>
              <motion.div variants={fadeInUp} className={styles.price_button}>
                <h1 className={styles.price}>{product.Price}$</h1>
                <button
                  className={styles.button}
                  onClick={e => {
                    e.stopPropagation()
                    alert('clicked cart')
                  }}
                >
                  ADD TO CART
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeInUp} initial="initial" animate="animate" className={styles.specs_container}>
            <table>
              <tbody>
                {Object.keys(product).map((e: string) => {
                  if (specFilter.includes(e)) return null
                  else {
                    return (
                      <tr key={e}>
                        <td className={styles.category}>{e}</td>
                        <td className={styles.value}>{product[e]}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
            </table>
          </motion.div>
        </>
      )}
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/product/${params?.id}`)
  const product = await res.json()

  return { props: { product } }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/product/get-all-ids')
  const ids = await res.json()

  const paths = ids.map((id: string) => ({
    params: { id: id } || '',
  }))

  return { paths, fallback: false }
}

export default Product
