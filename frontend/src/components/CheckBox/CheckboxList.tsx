import React from 'react'

import styles from './CheckboxList.module.css'

interface Props {
  children: React.ReactNode
  title: string
}
const CheckboxList: React.FC<Props> = ({ children, title }: Props) => {
  return (
    <div className={styles.checkboxListContainer}>
      <h6 className={styles.title}>{title}</h6>
      <div className={styles.list}>{children}</div>
    </div>
  )
}

export default CheckboxList
