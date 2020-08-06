import React from 'react'

import styles from './icon-button.module.css'

interface Props {
  children: React.ReactNode
}
const IconButton: React.FC<Props> = ({children}: Props) => {
  return (
    <button className={styles.button}>
      <div className={styles.icon}>{children}</div>
    </button>
  )
}

export default IconButton
