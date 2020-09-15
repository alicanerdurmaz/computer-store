import React from 'react'
import styles from './index.module.css'
import mockData from './mockData.json'

const index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.summary_title}>Order Summary</div>
        <div className={styles.summary_cart_length}>3 Items</div>
        <div className={styles.summary_cart_total_label}>Total Payment</div>
        <div className={styles.summary_cart_total}>3314.95 $</div>
        <button className={styles.summary_submit_button}>place your order</button>
      </div>
      <div className={styles.cart_list_section}>
        <ul className={styles.product_list}>
          {mockData.map(e => {
            return (
              <li className={styles.product_list_item} key={e._id}>
                <div className={styles.image}>
                  <img src={e.Images[0]} alt="computer"></img>
                </div>
                <div className={styles.name}>{e.Name}</div>
                <div className={styles.price}>{e.Price}&nbsp;$</div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default index
