import React from 'react'
import Image from '../Image/Image'

import data from './product.json'
import styles from './Card.module.css'

const Card = () => {
  return (
    <div className={styles.item} tabIndex={0} onClick={() => alert('clicked product')}>
      <div className={styles.container}>
        <Image url={data.Images[0]} className={styles.img}></Image>
        <h1 className={styles.name}> {data.Name}</h1>
        <div className={styles.footer}>
          <h1 className={styles.price}>${data.Price}</h1>
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
}

export default Card
