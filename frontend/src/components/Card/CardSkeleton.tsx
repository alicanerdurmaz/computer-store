import React from 'react'

import styles from './CardSkeleton.module.css'
import cx from 'classnames'

const CardSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={cx(styles.media, styles.shimmer)}></div>
      <div className={cx(styles.text, styles.shimmer)}></div>
      <div className={cx(styles.text, styles.shimmer)}></div>
      <div className={styles.text_container}>
        <div className={cx(styles.text, styles.shimmer)}></div>
        <div className={cx(styles.text, styles.shimmer)}></div>
      </div>
    </div>
  )
}

export default CardSkeleton
