import React, { useState } from 'react'
import Link from 'next/link'
import Image from '../Image/Image'
import styles from './Card.module.css'
import cx from 'classnames'
interface Props {
  isInCart: boolean
  name: string
  price: string
  image: string
  imageIsLazy?: 'eager' | 'lazy'
  id: string
  addOneToCart: (obj: string) => Promise<void>
  removeOneFromCart: (obj: string) => Promise<void>
}
const Card = React.memo(function Card({
  isInCart,
  removeOneFromCart,
  addOneToCart,
  name,
  price,
  image,
  imageIsLazy,
  id,
}: Props) {
  const [isLoading, setIsLoading] = useState(false)

  const removeHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true)
    e.stopPropagation()
    await removeOneFromCart(id)
    setIsLoading(false)
  }
  const addHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true)
    e.stopPropagation()
    await addOneToCart(id)
    setIsLoading(false)
  }
  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div className={styles.item} tabIndex={0}>
        <div className={styles.container}>
          <Image url={image} imageIsLazy={imageIsLazy}></Image>
          <h1 className={styles.name} aria-label="product name">
            {name}
          </h1>
          <div className={styles.footer}>
            <h1 className={styles.price}>${price.toLocaleString()}</h1>

            {isInCart ? (
              <button
                disabled={isLoading}
                className={cx(styles.button, styles.color_pink)}
                onClick={e => removeHandler(e)}
              >
                Remove from cart
              </button>
            ) : (
              <button disabled={isLoading} className={styles.button} onClick={e => addHandler(e)}>
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
})

export default Card
