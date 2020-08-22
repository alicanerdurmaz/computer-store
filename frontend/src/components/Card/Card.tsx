import React from 'react'
import Image from '../Image/Image'

import styles from './Card.module.css'
import Link from 'next/link'

interface Props {
  name: string
  price: string
  image: string
  imageIsLazy?: 'eager' | 'lazy'
  id: string
}
const Card = React.memo(function Card({ name, price, image, imageIsLazy, id }: Props) {
  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div className={styles.item} tabIndex={0}>
        <div className={styles.container}>
          <Image url={image} imageIsLazy={imageIsLazy}></Image>
          <h1 className={styles.name} aria-label="product name">
            {name}
          </h1>
          <div className={styles.footer}>
            <h1 className={styles.price}>${price}</h1>
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
    </Link>
  )
})

export default Card
