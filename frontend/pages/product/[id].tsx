import React, { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Image from '../../src/components/Image/Image'
import styles from './product-page.module.css'
import Link from 'next/link'
import Button from 'src/components/Button/Button'
interface Props {
  product: any
}

const specFilter = ['Part', 'Type', 'Images', 'SellerName', 'Seller', 'Name', '_id']
const Product = ({ product }: Props) => {
  const { isFallback } = useRouter()

  return (
    <div className={styles.container}>
      <div className={styles.summary_container}>
        <div className={styles.image_container}>
          <Image url={product.Images[0]}></Image>
        </div>
        <div className={styles.info_container}>
          <Link href={`/?&Manufacturer=${product.Manufacturer}`}>
            <a className={styles.link}>{product.Manufacturer}</a>
          </Link>
          <h1 className={styles.name}>{product.Name}</h1>
          <div className={styles.seller}>
            <span>Seller:&nbsp;</span>
            <Link href={`/`}>
              <a className={styles.link}>{product.SellerName}</a>
            </Link>
          </div>
          <div className={styles.price_button}>
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
          </div>
        </div>
      </div>
      <div className={styles.specs_container}>
        <table>
          <tbody>
            {Object.keys(product).map((e: string) => {
              if (specFilter.includes(e)) return null
              else {
                return (
                  <tr>
                    <td className={styles.category}>{e}</td>
                    <td className={styles.value}>{product[e]}</td>
                  </tr>
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('http://localhost:3001/product/get-all-ids')
  const ids = await res.json()

  const paths = ids.map((id: string) => ({
    params: { id: id },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/product/${params?.id}`)
  const product = await res.json()

  return { props: { product }, revalidate: 1 }
}

export default Product
