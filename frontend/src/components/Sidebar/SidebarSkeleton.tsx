import React from 'react'
import styles from './SidebarSkeleton.module.css'

const SidebarSkeleton = () => {
  return (
    <div className={styles.container}>
      <section className={styles.slider}>
        <div>
          <div className={styles.line}>shimmer</div>
          <div className={styles.line}>shimmer</div>
        </div>
        <div>
          <div className={styles.line}>shimmer</div>
          <div className={styles.line}>shimmer</div>
        </div>
      </section>
      <section className={styles.checkbox}>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
      </section>
      <section className={styles.checkbox}>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
      </section>
      <section className={styles.checkbox}>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
        <div className={styles.line}>shimmer</div>
      </section>
    </div>
  )
}

export default SidebarSkeleton
