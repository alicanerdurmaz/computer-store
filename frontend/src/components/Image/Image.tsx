import React from 'react'

import styles from './Image.module.css'
interface Props {
  url: string
  imageIsLazy?: 'eager' | 'lazy'
}

const Image: React.FC<Props> = ({ url, imageIsLazy = 'eager' }: Props) => {
  return <img className={styles.img} loading={imageIsLazy} src={url} alt="notebook image"></img>
}

export default Image
