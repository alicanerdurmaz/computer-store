import React, { useEffect, useState } from 'react'

import Card from './Card'
import styles from './CardList.module.css'

const CardList = () => {
  return (
    <div className={styles.container}>
      {Array.from({ length: 50 }).map((e, i) => {
        return <Card key={i}></Card>
      })}
    </div>
  )
}

export default CardList
