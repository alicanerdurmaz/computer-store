import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'
import { ProductPreview } from 'src/context/UserContext/interfaces'
import TrashIcon from 'src/components/Icons/TrashIcon'
import { useUserContext } from 'src/context/UserContext/UserContext'
import { API_GetProducts } from 'src/utils/api'
import Modal from 'src/components/Modal'
import CheckIcon from 'src/components/Icons/CheckIcon'
import { useRouter } from 'next/router'

const index = () => {
  const router = useRouter()
  const [products, setProducts] = useState<ProductPreview[]>([])
  const { userState, removeOneFromCart, removeAllFromCart } = useUserContext()
  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    getProducts()
  }, [userState?.shoppingCart])

  const deleteHandler = async (id: string) => {
    await removeOneFromCart(id)
    getProducts()
  }
  async function getProducts() {
    let cartArray = null

    if (userState) {
      cartArray = userState.shoppingCart.toString()
    } else {
      cartArray = window.localStorage.getItem('cart')?.slice(0, -1)
    }

    if (!cartArray) {
      setProducts([])
      return 
    }

    const data = await API_GetProducts(cartArray as string)
    if (data) {
      setProducts(data)
    }else {
      setProducts([])
    }
  }


  const getTotalPaymentAndProductCount = useMemo(() => {
    let total = 0
    let count = 0
    products.forEach((product: ProductPreview) => {
      total += product.Price
      count++
    })
    return { total, count }
  }, [products])

  const placeOrder = async () => {
    if (userState) {
      await removeAllFromCart()
      setProducts([])
      setModalIsOpen(true)
    } else {
      router.push('/auth')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.summary}>
        <div className={styles.summary_title}>Order Summary</div>
        <div className={styles.summary_cart_length}>{getTotalPaymentAndProductCount.count} Items</div>
        <div className={styles.summary_cart_total_label}>Total Payment</div>
        <div className={styles.summary_cart_total}>{getTotalPaymentAndProductCount.total.toLocaleString()} $</div>
        <button className={styles.summary_submit_button} onClick={placeOrder}>
          place your order
        </button>
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
                    <div className={styles.price}>{e.Price.toLocaleString()}&nbsp;$</div>
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

      <Modal visible={modalIsOpen} onClose={() => router.push('/')}>
        <div className={styles.modal_content}>
          <div className={styles.modal_icon}>
            <CheckIcon iconHeight="64" iconWidth="64" />
          </div>
          <div className={styles.modal_message}>
            <p>Order is successful</p>
            <p>Thank you for choosing us</p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default index
