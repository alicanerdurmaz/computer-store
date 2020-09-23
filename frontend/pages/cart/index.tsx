import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { ProductPreview } from 'src/context/UserContext/interfaces'
import TrashIcon from 'src/components/Icons/TrashIcon'
import { useUserContext } from 'src/context/UserContext/UserContext'
import { API_GetProducts } from 'src/utils/api'

const index = () => {
  const [products, setProducts] = useState<ProductPreview[]>([])
  const { userState, removeOneFromCart } = useUserContext()

  useEffect(() => {
    getProducts()
  }, [userState?.shoppingCart])

  const deleteHandler = async (id: string) => {
    removeOneFromCart(id)
  }

  async function getProducts() {
    let cartArray = null

    if (userState) {
      cartArray = userState.shoppingCart.toString()
    } else {
      cartArray = window.localStorage.getItem('cart')?.slice(0, -1)
    }

    const data = await API_GetProducts(cartArray as string)

    if (data) {
      setProducts(data)
    }
  }

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
          {products?.map(e => {
            return (
              <li className={styles.product_list_item} key={e._id}>
                <Link href="/product/[id]" as={`/product/${e._id}`}>
                  <a>
                    <div className={styles.image}>
                      <img src={e.Images[0]} alt="computer"></img>
                    </div>
                    <div className={styles.name}>{e.Name}</div>
                    <div className={styles.price}>{e.Price}&nbsp;$</div>
                  </a>
                </Link>
                <div className={styles.trash_icon} onClick={() => deleteHandler(e._id)}>
                  <TrashIcon />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default index
