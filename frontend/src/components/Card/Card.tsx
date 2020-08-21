import React from 'react'
import Image from '../Image/Image'

import styles from './Card.module.css'

interface Props {
  name: string
  price: string
  image: string
  imageIsLazy?: 'eager' | 'lazy'
}
const Card = React.memo(function Card({ name, price, image, imageIsLazy }: Props) {
  return (
    <div className={styles.item} tabIndex={0} onClick={() => alert('clicked product')}>
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
  )
})

export default Card
