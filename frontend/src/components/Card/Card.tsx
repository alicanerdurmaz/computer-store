import React from 'react'
import Image from '../Image/Image'

import data from './data.json'
import styles from './Card.module.css'

const Card = () => {
  return (
    <div className={styles.item}>
      <div className={styles.container}>
        <Image url={data.Images[1]} className={styles.img}></Image>
        <h1 className={styles.name}> {data.Name}</h1>
        <h1 className={styles.price}>${data.Price}</h1>
      </div>
    </div>
  )
}

export default Card
